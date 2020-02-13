import React from 'react';
import {withRouter} from 'react-router';
import {Icon, Item} from 'semantic-ui-react';
import config from '../../common.js';
import axios from 'axios';
import ApolloClient from 'apollo-boost';
import {gql} from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://127.0.0.1:18080/graphql'
});

const QUERY_LIST = gql`
    query HouseResourcesList($page: Int, $pageSize: Int) {
        HouseResourcesList(page: $page, pageSize: $pageSize) {
            list {
                id
                title
                coveredArea
                floor
                orientation
                pic
                rent
            }
        }
    }
`;

class HouseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            typeName: '',
            type: null,
            loadFlag: false
        };
    }

    goBack = () => {
        console.log(this.props.history)
        this.props.history.goBack();
    }
    componentDidMount = () => {
        const {query} = this.props.location.state;
        this.setState({
            typeName: query.name,
            type: query.type
        })
        // axios.post('/homes/list', {
        //     home_type: query.type
        // }).then(ret => {
        //     this.setState({
        //         listData: ret.data,
        //         loadFlag: true
        //     })
        // })

        client.query({
            query: QUERY_LIST, variables: {
                "page": 1,
                "pageSize": 3
            }
        }).then(result => {
            this.setState({
                listData: result.data.HouseResourcesList.list,
                loadFlag: true
            })
        })
    };

    render() {
        let list = null;
        if (this.state.loadFlag) {
            list = this.state.listData.map(item => {
                return (
                    <Item key={item.id}>
                        <Item.Image src={item.pic.split(',')[0]}/>
                        <Item.Content>
                            <Item.Header>{item.title}</Item.Header>
                            <Item.Meta>
                                <span className='cinema'>{item.coveredArea}㎡/{item.orientation}/{item.floor}</span>
                            </Item.Meta>
                            <Item.Description>
                                上海
                            </Item.Description>
                            <Item.Description>{item.rent}</Item.Description>
                        </Item.Content>
                    </Item>
                )
            });
        }
        return (
            <div className='house-list'>
                <div className="house-list-title">
                    <Icon onClick={this.goBack} name='angle left' size='large'/>{this.state.typeName}
                </div>
                <div className="house-list-content">
                    <Item.Group divided unstackable>
                        {list}
                    </Item.Group>
                </div>
            </div>
        );
    }
}

export default withRouter(HouseList);
