import React, { Component } from 'react'
import Layout from '../../components/Layout'
import createCampaign from '../../ethereum/campaign';
import { CardGroup ,GridColumn,Grid ,Button} from 'semantic-ui-react';
import web3 from '../../ethereum/web3'
import ContributeForm from '../../components/ContributeForm'
import { Link } from "../../routes";

 class CampaignShow extends Component {

    static async getInitialProps(props)
    {
        const campaign =await createCampaign(props.query.address);
        const summary= await campaign.methods.getSummary().call();
        // console.log(summary);
        return{
            address:props.query.address,
            minimumContribution:summary[0],
            balance:summary[1],
            requestsCount:summary[2],
            approversCount:summary[3],
            manager:summary['4']
        };
    }
    renderCards()
    {
        
        const {
            minimumContribution,manager,balance,approversCount,requestsCount
        }=this.props;
        // console.log(approversCount);
        const items=[
            {
                header:manager,
                meta:'Address of manager',
                description:'The manager created this campaign and can create request to withdraw money',
                style:{overflowWrap:'break-word'}
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description:
                  'You must contribute at least this much wei to become an approver'
              },
              {
                header: requestsCount,
                meta: 'Number of Requests',
                description:
                  'A request tries to withdraw money from the contract. Requests must be approved by approvers'
              },
              {
                header: approversCount,
                meta: 'Number of Approvers',
                description:
                  'Number of people who have already donated to this campaign'
              },
              {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description:
                  'The balance is how much money this campaign has left to spend.'
              }
        ]
        return <CardGroup items={items} />
    }



    render() {
        return (
           <Layout>
                <div>
                <h1>Campaign show</h1>
                <Grid>
                    <Grid.Row>
                    <Grid.Column width={10}>
                    {this.renderCards()}
                    
                    </Grid.Column>
                    <Grid.Column width={6}>
                    <ContributeForm address={this.props.address} />
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                    <Link route={`/campaigns/${this.props.address}/requests`}>
                        <a>
                            <Button primary>
                                View Requests
                            </Button>
                        </a>
                    </Link>
                    </Grid.Row>
                </Grid>
                
                
                </div>
           </Layout>
        )
    }
}
export default CampaignShow;