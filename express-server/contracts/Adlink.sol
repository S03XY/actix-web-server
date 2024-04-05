// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AdlinkToken is ERC20, Ownable {
    constructor(
        string memory name,
        string memory symbol
    ) ERC20(name, symbol) Ownable(msg.sender) {}

    function mint(address receiver, uint amount) external onlyOwner {
        _mint(receiver, amount);
    }

    function burn(address receiver, uint amount) external onlyOwner {
        _burn(receiver, amount);
    }
}
