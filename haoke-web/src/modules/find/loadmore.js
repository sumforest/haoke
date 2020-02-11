import React from 'react';
import Tloader from 'react-touch-loader';
import { Item,Icon,Button,Modal,TextArea } from 'semantic-ui-react'
import axios from 'axios';
import './tab.css';

class QuestionModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 'small',
      commentStyle: {
        width: '100%',
        border: 0
      },
      value: ''
    };
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  submitComment = (e) => {
    axios.post('/infos/question',{
      question: this.state.value
    }).then(data=>{
      if(data.meta.status == 200) {
        this.props.close()
      }
    })
  }

  render() {
    const { open,close } = this.props
    return (
      <div>
        <Modal size={this.state.size} open={open} onClose={close}>
          <Modal.Header>发表评论</Modal.Header>
          <Modal.Content>
            <TextArea value={this.state.value} onChange={this.handleChange} style={this.state.commentStyle} placeholder='Tell us more' />
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={close}>取消</Button>
            <Button positive onClick={this.submitComment} icon='checkmark' labelPosition='right' content='发表' />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}


class LoadMore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canRefreshResolve: 1,
      hasMore: 0,
      initializing: 1,
      currentNum: 0,
      total: 0,
      pagenum: 0,
      pagesize: 2,
      listData: [],
      open: false
    }
  }
  loadData = () => {
    let params = this.props.params;
    return axios.post(params.url,{
      type: params.data.type,
      pagenum: this.state.currentNum,
      pagesize: this.state.pagesize
    }).then(data=>{
      // 设置状态
      this.setState({
        total: data.data.list.total,
        initializing: 2,
        hasMore: data.data.list.data.length?1:0
      });
      return data.data.list.data;
    })
  }
  refresh(resolve, reject) {
    setTimeout(() => {
      // 没有刷新完成，保持等待。
      if (!this.state.canRefreshResolve) {
        return reject();
      }
      this.setState({
        currentNum: 0
      });
      this.loadData().then(data=>{
        this.setState({
          listData: data
        })
      })
      resolve();
    }, 0);
  }
  loadMore(resolve) {
    setTimeout(() => {
      this.setState({
        currentNum: this.state.currentNum + this.state.pagesize
      });
      this.loadData().then((data)=>{
        this.state.listData.push(...data);
        let flag = this.state.currentNum>0&&this.state.currentNum<this.state.total
        this.setState({
          hasMore: flag
        });
        resolve();
      })
    }, 0);
  }
  componentDidMount() {
    setTimeout(() => {
      this.loadData().then(data=>{
        this.setState({
          listData: data
        });
      })
    }, 0);
  }
  toggleCanRefresh() {
    this.setState({ canRefreshResolve: !this.state.canRefreshResolve });
  }

  close = () => {
    this.setState({
      open: false
    })
  }

  produceList = (type) => {
    let list = [];
    this.state.listData.forEach(item => {
      if(type === 1 || type === 2){
        list.push(
          <Item key={item.id}>
            <Item.Image size='small' src='http://47.96.21.88:8086/public/1.png' />
            <Item.Content verticalAlign='middle'>
              <Item.Header className='info-title'>{item.info_title}</Item.Header>
              <Item.Meta>
                <span className='price'>$1200</span>
                <span className='stay'>1 Month</span>
              </Item.Meta>
            </Item.Content>
          </Item>
        )
      } else if (type === 3) {
        list.push(
          <li key={item.question_id}>
            <div className='title'>
              <span className='cate'>
                <Icon color='green' name='users' size='small' />
                思维
              </span>
              <span>
                {item.question_name}
              </span>
            </div>
            {item.answer_content&&(
              <div className='user'>
                <Icon circular name='users' size='mini'/>
                {item.username} 的回答
              </div>
            )}
            <div className="info">
              {item.answer_content}
            </div>
            <div className="tag">
              {item.question_tag&&item.question_tag.split(',').map((tag,index)=>{return <span key={index}>{tag}X</span>})}
              <span>{item.qnum?item.qnum:0}个回答</span>
            </div>
          </li>
        )
      }
    })
    if(type === 1 || type === 2) {
      let Message = (
        <Item.Group unstackable>
          {list}
        </Item.Group>
      )
      return Message;
    } else if (type === 3) {
      let AskMessage = (
        <div>
          <QuestionModel open={this.state.open} close={this.close}/>
          <div className='info-ask-btn'>
            <Button fluid color='green' onClick={this.askHandle}>快速提问</Button>
          </div>
          <ul className='info-ask-list'>{list}</ul>
        </div>
      )
      return AskMessage;
    }
  }
  askHandle = () => {
    this.setState({
      open: true
    })
  }
  render() {
    var { hasMore, initializing,listData } = this.state;
    // var list = [];
    // if(listData.length>0) {
    //   listData.forEach(item=>{
    //     list.push(
    //       <li key={item.id}>
    //         <p>{item.info_title}</p>
    //       </li>
    //     );
    //   })
    // }
    return (
      <div className="view">
        <Tloader className="main"
          onRefresh={(resolve, reject) => this.refresh(resolve, reject)}
          onLoadMore={(resolve) => this.loadMore(resolve)}
          hasMore={hasMore}
          initializing={initializing}>
          <ul>{this.produceList(this.props.params.data.type)}</ul>
        </Tloader>
      </div>
    );
  }
}

export default LoadMore;
