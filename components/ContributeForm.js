import React, { Component } from 'react'
import { Form,Input,Message ,Button } from "semantic-ui-react";
import createCampaign from '../ethereum/campaign'
import web3 from '../ethereum/web3'
import { Router } from "../routes";

class ContributeForm extends Component {
    state={
        value:'',
        errorMessage:'',
        loading:false
    }
    handleChange=(e)=>{
    
        this.setState({
          [e.target.name]:e.target.value
        });
        console.log(this.state.value);
      };

      handleSubmit=async (e)=>{
        e.preventDefault();
        const campaign =await createCampaign(this.props.address);
        this.setState({loading:true ,errorMessage:''});
        try {
            const accounts=await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from:accounts[0],
                value:web3.utils.toWei(this.state.value,'ether')
            });
            Router.replaceRoute(`/campaigns/${this.props.address}`)
        } catch (error) {
            console.log(error);
            this.setState({errorMessage:error.message});
            
        }
        this.setState({loading:false,value:''})
        };

    render() {
        return (
            <div>
                <Form onSubmit={(e)=>this.handleSubmit(e)} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label >Amount to contribute</label>
                        <Input 
                        name='value'
                        label='ether'
                        labelPosition='right'
                        value={this.state.minimumContribution}
                        onChange={(e)=>this.handleChange(e)}
                        />

                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading}>
                        Contribute!
                    </Button>
                </Form>
                
            </div>
        )
    }
}
export default  ContributeForm;