import React from 'react';
import { Tab } from 'semantic-ui-react';
import './find.css';
import LoadMore from './loadmore.js';

// 推荐信息
class RecoMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        url: '/infos/list',
        data: {
          type: 1
        }
      }
    };
  }
  render() {
    return (
      <LoadMore params={this.state.params}/>
    )
  }
}
// 头条信息
class TopMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        url: '/infos/list',
        data: {
          type: 2
        }
      }
    };
  }
  render() {
    return (
      <LoadMore params={this.state.params}/>
    )
  }
}

class AskAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        url: '/infos/list',
        data: {
          type: 3
        }
      }
    };
  }
  render() {
    return (
      <LoadMore params={this.state.params}/>
    )
  }
}

class Find extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: 'nihao'
    };
  }
  render() {
    const panes = [
      { menuItem: '资讯', render: () => <Tab.Pane>
        <RecoMessage/>
      </Tab.Pane> },
      { menuItem: '头条', render: () => <Tab.Pane>
        <TopMessage/>
      </Tab.Pane> },
      { menuItem: '问答', render: () => <Tab.Pane>
        <AskAnswer/>
      </Tab.Pane> },
    ]
    return(
      <div className='find-container'>
        <div className="find-topbar">资讯</div>
        <div className="find-content">
          <Tab panes={panes} />
        </div>
      </div>
    );
  }
}

export default Find
