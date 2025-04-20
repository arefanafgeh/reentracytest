// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Victim {
    mapping(address=>uint256) balances;

    function deposit() external payable{
        balances[msg.sender]+=msg.value;
    }

    function withdraw() public {
        uint256 bal = balances[msg.sender];
        require(bal>0,"Not enough balance");

        (bool sent , ) = msg.sender.call{value:bal}("");

        balances[msg.sender] = 0;
    }

    function getvalutbalance() public view returns (uint256){
        return address(this).balance;
    }
}