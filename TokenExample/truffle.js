const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // match any network
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          'spot shop alcohol vintage print credit north frame tuition execute youth wasp',
          'https://rinkeby.infura.io/2KgE38uh5rYNDiH8nwzY'
        );
      },
      network_id: 4
    }
  }
};
