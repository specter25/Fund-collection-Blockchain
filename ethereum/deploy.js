const HDWalletProvider=require('truffle-hdwallet-provider');
const Web3=require('web3');
const compiledFactory=require('./build/CampaignFactory.json');
const compiledCampaign=require('./build/Campaign.json');

const provider= new HDWalletProvider(
    'rare method kind next above cream pilot resource return service chalk brown',
    'https://rinkeby.infura.io/v3/d1f3eba196e04bc4b5e2faa4a4301ae5'
);
const web3=new Web3(provider);

const deploy=async ()=>{
try {
    
const  accounts=await web3.eth.getAccounts();

console.log('attempting to deploy from',accounts[0]);

const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
.deploy({ data: '0x' + compiledFactory.bytecode, arguments: ['Hi there!'] })
.send({ from: accounts[0], gas: '1000000' });

console.log('contract deployed to',result.options.address);
} catch (error) {
    console.log(error);
}
}
deploy();