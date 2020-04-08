import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json'

const instance =new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x4c196F3Eb8e8686f80C401D1ab45aeE2eBB7fcEE'
);


export default instance;