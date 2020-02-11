import React from 'react';
// import Carousel from 'nuka-carousel';
import ImageGallery from 'react-image-gallery';
import { withRouter } from 'react-router';
import { Input,Grid,Icon,Item,Button,Dimmer,Loader} from 'semantic-ui-react'
import './home.css';
import "react-image-gallery/styles/css/image-gallery.css";
import axios from 'axios';
import config from '../../common.js';
import MapHouse from './maphouse.js';
import Calculator from './calc.js';
import SearchBar from './searchbar.js';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swipeData: [],
      swipeLoading: false,
      menuData: [],
      menuLoading: false,
      infoData: [],
      infoLoading: false,
      faqData: [],
      faqLoading: false,
      globalLoading: true,
      mapShowFlag: false,
      calcShowFlag: false,
      searchBarFlag: false
    };
  }
  componentDidMount = () => {
    // axios.post('/homes/swipe').then((data)=>{
    //   this.setState({
    //     swipeData: data.data.list,
    //     swipeLoading: true
    //   })
    // });
    // axios.post('/homes/menu').then((data)=>{
    //   this.setState({
    //     menuData: data.data.list,
    //     menuLoading: true,
    //     globalLoading: false
    //   })
    // });
    let swipe = new Promise((resolve, reject) => {
      axios.post('/homes/swipe').then((data)=>{
        resolve(data.data.list);
      });
    })
    let menu = new Promise((resolve, reject) => {
      axios.post('/homes/menu').then((data)=>{
        resolve(data.data.list);
      });
    })
    let info = new Promise((resolve, reject) => {
      axios.post('/homes/info').then((data)=>{
        resolve(data.data.list);
      });
    })
    let faq = new Promise((resolve, reject) => {
      axios.post('/homes/faq').then((data)=>{
        resolve(data.data.list);
      });
    })
    let house = new Promise((resolve, reject) => {
      axios.post('/homes/house').then((data)=>{
        resolve(data.data.list);
      });
    })
    Promise.all([swipe, menu, info, faq, house]).then((result)=>{
      this.setState({
        swipeData: result[0],
        menuData: result[1],
        infoData: result[2],
        faqData: result[3],
        houseData: result[4],
        menuLoading: true,
        swipeLoading: true,
        infoLoading: true,
        faqLoading: true,
        houseLoading: true,
        globalLoading: false
      })
      // this.setState({
      //   globalLoading: false
      // });
    })
  }
  hideMap = () => {
    this.setState({mapShowFlag:false});
  }
  hideCalc = () => {
    this.setState({calcShowFlag:false});
  }
  hideSearchBar = () => {
    this.setState({searchBarFlag:false});
  }
  handleMenu = (name) => {
    switch(name){
      case '地图找房':
        this.setState({mapShowFlag:true});
        break;
      case '计算器':
        this.setState({calcShowFlag:true});
        break;
      case '二手房':
        this.props.history.push('/home/list',{query:{name:name,type:1}});
        break;
      case '新房':
        this.props.history.push('/home/list',{query:{name:name,type:2}});
        break;
      case '租房':
        this.props.history.push('/home/list',{query:{name:name,type:3}});
        break;
      case '海外':
        this.props.history.push('/home/list',{query:{name:name,type:4}});
        break;
      case '问答':
        this.props.history.push('/home/find',{query:{flag:true}});
        break;
      default:
        break;
    }
  }
  searchHandle = () => {
    this.setState({
      searchBarFlag: true
    })
  }
  render() {
    // 轮播图渲染
    const swipeLoading = this.state.swipeLoading;
    const swipeData = this.state.swipeData;
    let swipe = null;
    if(swipeLoading) {
      swipe = <ImageGallery 
                preventDefaultTouchmoveEvent={true} 
                autoPlay={true} 
                disableSwipe={false} 
                showThumbnails={false} 
                items={swipeData} />
    }
    // 菜单渲染
    const menuLoading = this.state.menuLoading;
    const menuData = this.state.menuData;
    let menu = null;
    if(menuLoading) {
      let list = menuData.map(item => {
        return (
          <Grid.Column onClick={this.handleMenu.bind(this,item.menu_name)} key={item.id}>
            <div className='home-menu-item'>
              <Icon name='home' size='big' />
            </div>
            <div>{item.menu_name}</div>
          </Grid.Column>
        )
      })
      menu = (
        <Grid padded divided >
          <Grid.Row columns={4}>
            {list}
          </Grid.Row>
        </Grid>
      )
    }
    // 渲染资讯
    let infos = null;
    if(this.state.infoLoading) {
      infos = this.state.infoData.map(item=>{
        return (
          <Item.Header key={item.id}>
            <span>限购 ●</span>
            <span>{item.info_title}</span>
          </Item.Header>
        );
      })
    }
    // 渲染问答
    let faq = null;
    if(this.state.faqLoading) {
      faq = this.state.faqData.map(item=>{
        return (
          <li key={item.question_id}>
            <div>
              <Icon name='question circle outline' />
              <span>{item.question_name}</span>
            </div>
            <div>
              {item.question_tag.split(',').map((tag,index)=>{return <Button key={index} basic color='green' size='mini'>{tag}</Button>})}
              <div>{item.atime} ● <Icon name='comment alternate outline' /> {item.qnum}</div>
            </div>
          </li>
        );
      })
    }
    // 渲染房屋
    let newHouse = [];
    let oldHouse = [];
    let hireHouse = [];
    if(this.state.houseLoading) {
      this.state.houseData.forEach(item=>{
        let listInfo = (
          <Item key={item.id}>
            <Item.Image src={config.imgBaseUrl+'public/home.png'}/>
            <Item.Content>
              <Item.Header>{item.home_name}</Item.Header>
              <Item.Meta>
                <span className='cinema'>{item.home_desc}</span>
              </Item.Meta>
              <Item.Description>
                {item.home_tags.split(',').map((tag,index)=>{return <Button key={index} basic color='green' size='mini'>{tag}</Button>})}
              </Item.Description>
              <Item.Description>{item.home_price}</Item.Description>
            </Item.Content>
          </Item>
        );
        if(item.home_type === 1) {
          newHouse.push(listInfo);
        }else if(item.home_type === 2) {
          oldHouse.push(listInfo);
        }else if(item.home_type === 3) {
          hireHouse.push(listInfo)
        }
      })
    }
    return (
      <div className='home-container'>
        {this.state.mapShowFlag?<MapHouse hideMap={this.hideMap}/>:null}
        {this.state.calcShowFlag?<Calculator hideCalc={this.hideCalc}/>:null}
        {this.state.searchBarFlag?<SearchBar hideSearchBar={this.hideSearchBar}/>:null}
        <Dimmer inverted active={this.state.globalLoading} page>
          <Loader>Loading</Loader>
        </Dimmer>
        <div className="home-topbar">
          <Input onBlur={this.hideSearchBar} onFocus={this.searchHandle} fluid icon={{ name: 'search', circular: true, link: true }} placeholder='搜房源...' />
        </div>
        <div className="home-content">
          {swipe}
          {menu}
          <div className='home-msg'>
            <Item.Group unstackable>
              <Item className='home-msg-img' >
                <Item.Image size='tiny' src={config.imgBaseUrl+'public/zixun.png'} />
                <Item.Content verticalAlign='top'>
                  {infos}
                  <div className="home-msg-more">
                    <Icon name='angle right' size='big' />
                  </div>
                </Item.Content>
              </Item>
            </Item.Group>
          </div>
          <div className='home-ask'>
            <div className='home-ask-title'>好客问答</div>
            <ul>
              {faq}
            </ul>
          </div>
          <div>
            <div className='home-hire-title'>最新开盘</div>
            <Item.Group divided unstackable>
              {newHouse}
            </Item.Group>
          </div>
          <div>
            <div className='home-hire-title'>二手精选</div>
            <Item.Group divided unstackable>
              {oldHouse}
            </Item.Group>
          </div>
          <div>
            <div className='home-hire-title'>组一个家</div>
            <Item.Group divided unstackable>
              {hireHouse}
            </Item.Group>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Home);
