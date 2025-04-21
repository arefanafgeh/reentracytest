var Victim = artifacts.require("./Victim.sol");
var Attacker = artifacts.require("./Attacker.sol");

module.exports =  (deployer => {
  deployer.then(async () => {
    const contractOneInstance = await deployer.deploy(Victim);
      await deployer.deploy(Attacker,contractOneInstance.address);
  });
});