import React, { Component } from 'react';
import './login.css';
import { Form } from 'semantic-ui-react';
import axios from 'axios';
import { withRouter } from 'react-router';
import config from './common.js';

class Login extends Component {
  state = { 
    username: '', 
    password: '' 
  }
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    const { username, password } = this.state
    const { history } = this.props
    axios.post(config.apiBaseUrl + 'users/login',{
      uname: username,
      pwd: password
    }).then(function(ret){
      if(ret.meta.status === 200) {
        // 登录成功,保存token信息并实现跳转
        localStorage.setItem('mytoken',ret.data.token);
        localStorage.setItem('uid',ret.data.uid);
        history.push('/home');
      } else {
        console.log(ret.meta.msg)
      }
    }).catch(function(data){
      console.log(data)
    })
  }

  render() {
    const { username, password } = this.state
    return (
      <div className='login-container'>
        <div className='login-title'>登录</div>
        <div className='login-form'>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input 
              icon='user' 
              required 
              size='big' 
              iconPosition='left' 
              name='username'
              value={username}
              onChange={this.handleChange}
              placeholder='请输入用户名...' 
            />
            <Form.Input 
              type='password' 
              icon='lock' 
              required 
              size='big' 
              iconPosition='left' 
              name='password'
              value={password}
              onChange={this.handleChange}
              placeholder='请输入密码...' 
            />
            <Form.Button positive content='登录' />
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
