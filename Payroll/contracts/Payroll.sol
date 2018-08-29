pragma solidity ^0.4.24;

contract Payroll {

    address public owner;
    mapping (address => uint256) public paymentReceipts;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function processPayment(address recipient, uint256 payment) public onlyOwner {
        paymentReceipts[recipient] = payment;
    }
}
