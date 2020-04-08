import React, { Component } from 'react'
import Layout from '../../../components/Layout'
import web3 from '../../../ethereum/web3'
import { Form ,Button ,Input ,Message} from "semantic-ui-react"
import { Link,Router } from "../../../routes";
import createCampaign from '../../../ethereum/campaign'

class RequestNew extends Component {


    static async getInitialProps(props)
    {
        const {address}=props.query;
        return{address};
    }


    state={
        description:'',
        value:'',
        recepient:'',
        loading:false,
        errorMessage:''
    }
    handleChange=(e)=>{
    
        this.setState({
          [e.target.name]:e.target.value
        });
        // console.log(this.state.minimumContribution);
      };

      handleSubmit=async (e)=>{
        e.preventDefault();
        this.setState({loading:true ,errorMessage:''});
        const campaign= await createCampaign(this.props.address)
        const {description , value,recepient}=this.state
        try {
          const accounts=await web3.eth.getAccounts();
          await campaign.methods.
          createRequest(description ,web3.utils.toWei(value,'ether') , recepient)
          .send({from:accounts[0]})

          Router.pushRoute(`/campaigns/${this.props.address}/requests`);

        } catch (error) {
          this.setState({errorMessage:error.message}) ;
          console.log(error);
        }
        this.setState({loading:false});
        };
        
      
    render() {
        return (
            <Layout>
                <h3>Create a Request</h3>
            <Form error={!!this.state.errorMessage} onSubmit={(e)=>this.handleSubmit(e)} >
            <Form.Field>
            <label>Description</label>
            <Input
              name='description' 
              value={this.state.description}
              onChange={(e)=>this.handleChange(e)}
            />
          </Form.Field>
          <Form.Field>
            <label>Amount in Ether</label>
            <Input
              name='value' 
              value={this.state.value}
              onChange={(e)=>this.handleChange(e)}
            />
          </Form.Field>
          <Form.Field>
            <label>Recepient</label>
            <Input
              name='recepient' 
              value={this.state.recepient}
              onChange={(e)=>this.handleChange(e)}
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
            </Layout>
        
        )
    }
}

export default  RequestNew;