// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Relayer is Ownable {
    enum AdapterStatus {
        ACCEPTED,
        PENDING,
        REJECTED
    }

    struct AdapterReq {
        AdapterStatus status;
        address requester;
        uint256 stakeAmount;
        bool hasStaked;
    }

    address[] public adapterAddresses;

    event ENewAdapterReq(address indexed requester, address indexed adapter);
    event EAdapterStatusChanged(
        address indexed adapter,
        AdapterStatus indexed status
    );
    event EStakeAmount(
        address indexed adapter,
        address indexed staker,
        uint256 indexed stakeAmount
    );
    event ERelay(uint256 indexed chainId, address indexed target, bytes data);

    event EUnstakeAmount(
        address indexed adapter,
        address indexed staker,
        uint256 indexed stakeAmount
    );
    mapping(address => AdapterReq) public adapterList;

    modifier AdapterShouldExits(address adapterAddress) {
        require(
            adapterList[adapterAddress].requester != address(0),
            "Invalid adapter request"
        );

        _;
    }

    modifier ValidAdapter(address adapterAddress) {
        require(adapterAddress != address(0), "Not a valid address");

        uint256 size;

        assembly {
            size := extcodesize(adapterAddress)
        }
        require(size > 0, "Not a valid contract");

        _;
    }

    constructor() Ownable(msg.sender) {}

    function applyForVerification(
        address adapterAddress
    ) external ValidAdapter(adapterAddress) {
        adapterAddresses.push(adapterAddress);

        AdapterReq memory adapterReq = adapterList[adapterAddress];

        if (adapterReq.requester != address(0)) {
            if (adapterReq.status == AdapterStatus.ACCEPTED) {
                revert("adapter status is accepted");
            } else if (adapterReq.status == AdapterStatus.REJECTED) {
                revert("adapter status is rejected");
            }
            revert("adapter status is pending");
        }

        adapterList[adapterAddress] = AdapterReq(
            AdapterStatus.PENDING,
            msg.sender,
            0,
            false
        );

        emit ENewAdapterReq(msg.sender, adapterAddress);
    }

    function updateAdapterRequest(
        AdapterStatus status,
        uint256 stakeAmount,
        address adapter
    ) external onlyOwner ValidAdapter(adapter) AdapterShouldExits(adapter) {
        AdapterReq storage existingAdapterReq = adapterList[adapter];
        existingAdapterReq.status = status;
        existingAdapterReq.stakeAmount = stakeAmount;
        emit EAdapterStatusChanged(adapter, status);
    }

    function stakePosition(
        address adapter
    ) external payable AdapterShouldExits(adapter) {
        AdapterReq storage existingAdapterRequest = adapterList[adapter];

        require(
            existingAdapterRequest.status == AdapterStatus.ACCEPTED,
            "Adapter not accepted"
        );

        require(
            msg.value == existingAdapterRequest.stakeAmount,
            "Invalid stake amount"
        );

        require(
            msg.sender == existingAdapterRequest.requester,
            "Invalid caller"
        );

        existingAdapterRequest.hasStaked = true;
    }

    function unstakePosition(
        address adapter
    ) external AdapterShouldExits(adapter) {
        AdapterReq memory existingAdapterRequest = adapterList[adapter];

        require(existingAdapterRequest.hasStaked == true, "unstake ineligible");
        require(
            existingAdapterRequest.status != AdapterStatus.ACCEPTED,
            "unstake ineligible"
        );
        require(
            msg.sender == existingAdapterRequest.requester,
            "Invalid caller"
        );

        existingAdapterRequest.hasStaked = false;
        payable(msg.sender).transfer(existingAdapterRequest.stakeAmount);
    }

    function relayData(
        address target,
        bytes memory data,
        uint256 chainId
    ) external AdapterShouldExits(msg.sender) ValidAdapter(msg.sender) {
        AdapterReq memory existingAdapterRequest = adapterList[msg.sender];

        require(
            existingAdapterRequest.status == AdapterStatus.ACCEPTED,
            "unaccepted adapter"
        );
        emit ERelay(chainId, target, data);
    }

    receive() external payable {}

    fallback() external {}
}
