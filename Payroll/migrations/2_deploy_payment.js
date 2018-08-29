const Payroll = artifacts.require('./Payroll.sol');

module.exports = (deployer) => {
  deployer.deploy(Payroll)
};
