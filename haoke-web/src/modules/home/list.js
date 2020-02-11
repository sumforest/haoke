import React from 'react';
import { withRouter } from 'react-router';
import { Icon,Item } from 'semantic-ui-react';
import config from '../../common.js';
import axios from 'axios';

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
    axios.post('/homes/list',{
      home_type: query.type
    }).then(ret=>{
      this.setState({
        listData: ret.data,
        loadFlag: true
      })
    })
  }
  render() {
    let list = null;
    if(this.state.loadFlag) {
      list = this.state.listData.map(item=>{
        return (
          <Item key={item.id}>
            <Item.Image src={config.imgBaseUrl+'public/home.png'}/>
            <Item.Content>
              <Item.Header>{item.home_name}</Item.Header>
              <Item.Meta>
                <span className='cinema'>{item.home_desc}</span>
              </Item.Meta>
              <Item.Description>
                {item.home_tags}
              </Item.Description>
              <Item.Description>{item.home_price}</Item.Description>
            </Item.Content>
          </Item>
        )
      });
    }
    return ( 
      <div className = 'house-list' >
        <div className = "house-list-title">
          <Icon onClick={this.goBack} name = 'angle left' size = 'large'/>{this.state.typeName} 
        </div> 
        <div className = "house-list-content">
          <Item.Group divided unstackable>
            {list}
          </Item.Group>
        </div>
      </div>
    );
  }
}
export default withRouter(HouseList);
