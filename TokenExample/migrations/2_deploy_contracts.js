var Token = artifacts.require("./DappToken.sol");

module.exports = function (deployer) {
    deployer.deploy(Token);
};
