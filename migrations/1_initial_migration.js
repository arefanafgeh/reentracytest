var Victim = artifacts.require("./Victim.sol");
var Attacker = artifacts.require("./Attacker.sol");

module.exports =  (deployer => {
  deployer.then(async () => {
      // await deployer.deploy(Victim);
      await deployer.deploy(Attacker,"0x724D97E05F19fb0e5bd90f94D43ACaacF2120ff4");
  });
});