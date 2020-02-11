import React from 'react';
import ChatWindow from './chat-window.js';
import axios from 'axios';
import './chat.css';
import config from '../../common.js';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: 'nihao',
      isShow: false,
      isLoading: false,
      list: [],
      chatInfo: null,
      client: null
    };
  }
  toChat = (e,p) => {
    this.setState({
      isShow:true,
      chatInfo: {
        to_user: p.item.to_user,
        from_user: p.item.from_user,
        username: p.item.username,
        avatar: p.item.avatar
      }
    });
  }
  // sendMsg = (msg) => {
  //   let pdata = {
  //     from_user: this.state.chatInfo.from_user,
  //     to_user: this.state.chatInfo.to_user,
  //     avatar: this.state.chatInfo.avatar,
  //     chat_msg: msg
  //   }
  //   this.state.client.emitEvent(IMEvent.MSG_TEXT_SEND,JSON.stringify(pdata));
  // }
  hideChat = () => {
    this.setState({isShow:false});
  }
  componentDidMount = () => {
    axios.post('/chats/list').then((data)=>{
      this.setState({
        list: data.data.list,
        isLoading: true
      })
    })
  }
  render() {
    const isLoading = this.state.isLoading;
    let list = null;
    if (isLoading) {
      list = this.state.list.map(item => {
        return (
          <li key={item.id} onClick={(e) => this.toChat(e,{item})}>
            <div className="avarter">
              <img src={config.imgBaseUrl + item.avatar} alt="avarter"/>
              <span className="name">{item.username}</span>
              <span className="info">{item.chat_msg}</span>
              <span className="time">{item.ctime}</span>
            </div>
          </li>
        )
      })
    }
    return(
      <div className='chat-container'>
        <div className="chat-title">聊天</div>
        <div className="chat-list">
          <ul>{list}</ul>
        </div>
        {this.state.isShow?<ChatWindow chatInfo={this.state.chatInfo} wsclient={this.state.client} isShow={this.state.isShow} hideChat={this.hideChat}/>:null}
      </div>
    )
  }
}

export default Chat
