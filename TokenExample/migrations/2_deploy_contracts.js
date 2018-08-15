var Token = artifacts.require("./DappToken.sol");

module.exports = function (deployer) {
    deployer.deploy(Token, 'SCT', 'SmartChartToken', 18, 1000000, 1);
};
