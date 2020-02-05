import React from 'react';
import { Input, Tooltip, Icon , Button } from 'antd';
import axios from '../../confing/axios';
import {Link} from 'react-router-dom';  

import './SignUp.scss';

interface ISignUpState{
    account: string,
    password: string,
    passwordConfirmation: string
}

class SignUp extends React.Component<any,ISignUpState>{
    constructor(props: any){
        super(props)
        this.state = {
            account:'',
            password:'',
            passwordConfirmation:''
        }
    }

    submit = async() =>{
        const {account,password,passwordConfirmation} = this.state;
        try{
            await axios.post('https://gp-server.hunger-valley.com/sign_up/user',{
                account,
                password,
                password_confirmation:passwordConfirmation
            })
            this.props.history.push('/')
        }catch(e){
           throw new Error(e)
        }
    }
    
    onChangeAccount = (e: { target: { value: any; }; }) =>{
        this.setState({account: e.target.value});
    }

    onChangePassword = (e: { target: { value: any; }; }) =>{
        this.setState({password: e.target.value});
    }
    onChangePasswordConfirmation = (e: { target: { value: any; }; }) =>{
        this.setState({passwordConfirmation: e.target.value});
    }


    public render(){
        const {account,password, passwordConfirmation} = this.state;
        return(
            <div className="SignUp" id="SignUp">
                <h1>番茄闹钟毕设注册</h1>
                <Input
                        placeholder="请输入你的用户名"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        suffix={
                        <Tooltip title="Extra information">
                        <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                        
                    }
                    value={account}
                    onChange={this.onChangeAccount}
                />
                    <Input.Password value={password}  placeholder="请输入密码" onChange={this.onChangePassword}/>
                    <Input.Password value={ passwordConfirmation}  placeholder="请确认密码" onChange={this.onChangePasswordConfirmation} />
                    <Button type="primary" className="SignUpBotton" onClick={this.submit}>注册</Button>
                    <p>如果你有账号请立即登录 <Link to="login">登录</Link></p> 
            </div>
        )
    }
}

export default  SignUp;