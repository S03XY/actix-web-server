// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AdlinkAdapter is Ownable {
    address public relayer;
    address public AdlinkTokenAddr;

    constructor() Ownable(msg.sender) {}

    function changeRelayer(address newRelayer) external onlyOwner {
        require(newRelayer.code.length > 0, "relayer must a contract");
        relayer = newRelayer;
    }

    function changeAdlinkToken(address newAdlinkTokenAddr) external onlyOwner {
        AdlinkTokenAddr = newAdlinkTokenAddr;
    }

    function relayTokens(
        uint256 chainId,
        address target,
        address receiver,
        uint tokenAmount
    ) external {
        address owner = owner();

        bytes memory ownerTransferData = abi.encodeWithSelector(
            bytes4(keccak256("transferFrom(address,address,uint256)")),
            msg.sender,
            owner,
            tokenAmount
        );

        (bool suc, ) = AdlinkTokenAddr.call(ownerTransferData);

        require(suc == true, "deposit failed");

        bytes memory receiverTransferData = abi.encodeWithSelector(
            bytes4(keccak256("transfer(address,uint256)")),
            receiver,
            tokenAmount
        );

        bytes4 funcSign = bytes4(keccak256("relayData(address,bytes,uint256)"));
        bytes memory sendData = abi.encodeWithSelector(
            funcSign,
            target,
            receiverTransferData,
            chainId
        );

        (bool sucess, ) = relayer.call(sendData);
        require(sucess == true, "relayer called failed");
    }
}
