// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Adapter is Ownable {
    address public relayer;

    constructor(address rel) Ownable(msg.sender) {
        relayer = rel;
    }

    function changeRelayer(address newRelayer) external onlyOwner {
        require(newRelayer.code.length > 0, "relayer must a contract");
        relayer = newRelayer;
    }

    function invokeRelayer(
        uint256 chainId,
        address target,
        bytes memory data
    ) external {
        bytes4 funcSign = bytes4(keccak256("relayData(address,bytes,uint256)"));
        bytes memory sendData = abi.encodeWithSelector(
            funcSign,
            target,
            data,
            chainId
        );

        (bool sucess, ) = relayer.call(sendData);
        require(sucess == true, "relayer called failed");
    }
}
