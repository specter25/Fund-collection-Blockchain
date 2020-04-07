pragma solidity ^0.4.17;

contract CampaignFactory{
    address[] public deployedCampaigns;
    function createCampaign(uint minimum)public
    {
        address newCampaign=new Campaign(minimum ,msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    function getDeployedCampaigns()public view returns(address[])
    {
        return deployedCampaigns;
    }
}



contract Campaign{
    
    struct Request{
        string description;
        uint value;
        address recepient;
        bool complete;
        uint approvalCount;
        mapping(address=>bool) vote;
    }
    
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    modifier restricted()
    {
        require(msg.sender== manager);
        _;
    }
    
    constructor(uint minimum ,address creator)public
    {
        manager=creator;
        minimumContribution=minimum ;
    }
    function contribute()public payable
    {
        require(msg.value>minimumContribution);
        
        approvers[msg.sender]=true;
        approversCount++;
    }
    function createRequest
    (string _description , uint _value , address _recepient) 
    public restricted
    {
        Request memory newRequest=Request({
            description:_description,
            value:_value,
            recepient:_recepient,
            complete:false,
            approvalCount:0
        });
        requests.push(newRequest);
    }
    function approveRequest(uint index)public 
    {
        require(approvers[msg.sender]== true);
        require(!requests[index].vote[msg.sender]);
        
        requests[index].vote[msg.sender]=true;
        requests[index].approvalCount ++ ;
    }
    function finalizeRequest(uint index)public payable restricted
    {
        Request storage request= requests[index];
        require(!request.complete);
        require(request.approvalCount > (approversCount/2));
        request.recepient.transfer(request.value);
        request.complete=true;
    }
}