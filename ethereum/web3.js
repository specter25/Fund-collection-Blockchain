import Web3 from 'web3';

let web3;
if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined')
{
    //in the browser and metamask running

    web3 =new Web3(window.web3.currentProvider);
}
else
{
    //on server or metamask not running
    const provider =new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/d1f3eba196e04bc4b5e2faa4a4301ae5'
    );
    web3=new Web3(provider);
}


export default web3; 