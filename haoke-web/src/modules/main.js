import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './main.css';
import HomePane from './home/home.js';
import FindPane from './find/find.js';
import ChatPane from './chat/chat.js';
import MyPane from './my/my.js';
import List from './home/list.js';


class Home extends Component {
  render() {
    const root = '/home';
    const Menu = ({ className, to, current }) => {
      let icon = '';
      let mname = '';
      if(className === 'home') {
        icon = 'all';
        mname = '主页';
      } else if(className === 'find') {
        icon = 'search';
        mname = '资讯';
      } else if(className === 'chat') {
        icon = 'atm';
        mname = '微聊'
      } else if(className === 'my') {
        icon = 'account';
        mname = '我的';
      }
      return (
        <Route path={to} 
          exact={current}
          children={({ match }) => (
            <Link to={to}>
            <div className={`${className} placeholder`}>
              <i className={`iconfont icon-${icon} ${match ? "active" : ""}`}></i>
              <div className={match ? "active" : ""}>{mname}</div>
            </div>
            </Link>
          )}/>
      )
    }
    return (
        <div>
          <div className='main-content'>
            <Route exact path={`${root}`} component={HomePane} />
            <Route path={`${root}/find`} component={FindPane} />
            <Route path={`${root}/chat`} component={ChatPane} />
            <Route path={`${root}/my`} component={MyPane} />
            <Route path={`${root}/list`} component={List} />
          </div>
          <div className="flex-container">
            <Grid centered padded >
              <Grid.Row columns={4} divided >
                <Grid.Column>
                  <Menu to={`${root}`} current={true} className='home'/>
                </Grid.Column>
                <Grid.Column>
                  <Menu to={`${root}/find`} className='find'/>
                </Grid.Column>
                <Grid.Column>
                  <Menu to={`${root}/chat`} className='chat'/>
                </Grid.Column>
                <Grid.Column>
                  <Menu to={`${root}/my`} className='my'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
    )
  }
}

export default Home;
