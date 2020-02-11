import React from 'react';
import { Grid,Icon,Button,Modal,Confirm,TextArea } from 'semantic-ui-react'
import './my.css';
import axios from 'axios';
import AvatarEditor from 'react-avatar-editor';
import config from '../../common.js';
class ImageModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 'small',
      commentStyle: {
        width: '100%',
        border: 0
      },
      value: '',
      scale: 1,
      allowZoomOut: false
    };
    this.fileInput = React.createRef();
  }

  submitComment = (e) => {
    this.props.close(this.fileInput.current.files[0])
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  render() {
    const { open,close } = this.props
    return (
      <div>
        <Modal size={this.state.size} open={open} onClose={close}>
          <Modal.Header>选择图片</Modal.Header>
          <Modal.Content>
            {/*<TextArea value={this.state.value} onChange={this.handleChange} style={this.state.commentStyle} placeholder='图片URL' />*/}
            <input type="file" ref={this.fileInput} />
          </Modal.Content>
          <Modal.Actions>
            <Button positive onClick={this.submitComment} icon='checkmark' labelPosition='right' content='确定' />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

class AvatarModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 'small',
      commentStyle: {
        width: '100%',
        border: 0
      },
      value: '',
      scale: 1,
      allowZoomOut: false
    };
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  handleScale = e => {
    const scale = parseFloat(e.target.value)
    this.setState({ scale })
  }
  setEditorRef = editor => {
    if (editor) this.editor = editor
  }
  submitComment = (e) => {
    // 生成头像数据
    const img = this.editor.getImageScaledToCanvas().toDataURL()
    axios.post('/my/avatar',{
      avatar: img
    }).then(data=>{
      this.props.updateAvatar(img);
    })
  }
  render() {
    const { open,close,avatar } = this.props
    console.log(avatar)
    return (
      <div>
        <Modal size={this.state.size} open={open} onClose={close}>
          <Modal.Header>上传头像</Modal.Header>
          <Modal.Content>
            <AvatarEditor
              ref={this.setEditorRef}
              borderRadius={75}
              width={160}
              height={160}
              border={50}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={this.state.scale}
              rotate={0}
              image={avatar}
            />
            <div>
              <span className='avatar-zoom'>缩放:</span>
              <input
                name="scale"
                type="range"
                onChange={this.handleScale}
                min={'1'}
                max="2"
                step="0.01"
                defaultValue="1"
              />
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button positive onClick={this.submitComment} icon='checkmark' labelPosition='right' content='确定' />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

class My extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: '',
      avatarPath: '',
      openAvatar: false,
      openImage: false,
      avatar: ''
    };
  }
  componentWillMount = () => {
    axios.post('/my/info',{
      user_id: localStorage.getItem('uid')
    }).then(ret=>{
      this.setState({
        uname: ret.data.username,
        avatarPath: ret.data.avatar
      })
    })
  }
  closeImage = (v) => {
    this.setState({
      openImage: false,
      openAvatar: true,
      avatar: v
    })
  }
  closeAvatar = () => {
    this.setState({
      openAvatar: false
    })
  }
  showAvatar = () => {
    this.setState({
      openImage: true
    })
  }
  updateAvatar = (avatar) => {
    this.setState({
      avatarPath: avatar,
      openAvatar: false
    });
  }
  render() {
    return(
      <div className='my-container'>
        <ImageModel open={this.state.openImage} close={this.closeImage}/>
        <AvatarModel updateAvatar={this.updateAvatar} avatar={this.state.avatar} open={this.state.openAvatar} close={this.closeAvatar}/>
        <div className='my-title'>
          <img src={config.imgBaseUrl+'public/my-bg.png'} alt='me'/>
          <div className="info">
            <div className="myicon" onClick={this.showAvatar}>
              <img src={this.state.avatarPath} alt="icon"/>
            </div>
            <div className='name'>{this.state.uname}</div>
            <Button color='green' size='mini'>已认证</Button>
            <div className='edit'>编辑个人资料</div>
          </div>
        </div>
        <Grid padded  className='my-menu'>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Icon name='clock outline' size='big' />
              <div>看房记录</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name='yen sign' size='big' />
              <div>我的订单</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name='bookmark outline' size='big' />
              <div>我的收藏</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name='user outline' size='big' />
              <div>个人资料</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name='home' size='big' />
              <div>身份认证</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name='microphone' size='big' />
              <div>联系我们</div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div className='my-ad'>
          <img src={config.imgBaseUrl+'public/ad.png'} alt=""/>
        </div>
      </div>
    );
  }
}

export default My
