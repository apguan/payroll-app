pragma solidity ^0.4.24;

contract Payroll {

    address public owner;
    mapping (address => uint256) public paymentReceipts;

    constructor() {
        owner = msg.sender;
    }

    function processPayment(address recipient, uint256 payment) public {
        paymentReceipts[recipient] = payment;
    }
}
