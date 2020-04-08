import React, { Component } from 'react'
import Layout from "../../components/Layout";
import { Form ,Button ,Input ,Message} from "semantic-ui-react";
import factory from "../../ethereum/Factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

class CampaignNew extends Component {
  state={
    minimumContribution:'',
    errorMessage:'',
    loading:false
  }
  handleChange=(e)=>{
    
    this.setState({
      [e.target.name]:e.target.value
    });
    // console.log(this.state.minimumContribution);
  };
  handleSubmit=async (e)=>{
  e.preventDefault();
  this.setState({loading:true ,errorMessage:''})
  try {
    const accounts=await web3.eth.getAccounts();

    await factory.methods.createCampaign(this.state.minimumContribution).send(
      {
        from:accounts[0],
      }
    );

      Router.pushRoute('/');

  } catch (error) {
    this.setState({errorMessage:error.message}) ;
    // console.log(this.state.errorMessage);
  }
  this.setState({loading:false});
  };
  

    render() {
        return (
            <Layout>
            <div>
                <h1>new Campaign</h1>
                <Form error={!!this.state.errorMessage} onSubmit={(e)=>this.handleSubmit(e)} >
             <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              name='minimumContribution' 
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={(e)=>this.handleChange(e)}
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
            </div>
            </Layout>
        )
    }
}


export default CampaignNew;