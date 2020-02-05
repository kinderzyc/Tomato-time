import React from 'react';
import { Input, Tooltip, Icon , Button } from 'antd';
import axios from '../../confing/axios';
import {Link} from 'react-router-dom';  

import './Login.scss';

interface ILoginState{
    account: string,
    password: string,
}

class Login extends React.Component<any,ILoginState>{
    constructor(props: any){
        super(props)
        this.state = {
            account:'',
            password:'',
        }
    }

    submit = async() =>{
        const {account,password} = this.state;
        try{
            await axios.post('https://gp-server.hunger-valley.com/sign_in/user',{
                account,
                password,
            })
            this.props.history.push('/')
        }catch(e){
           throw new Error(e)
        }
    }
    

    onChange = (key:keyof ILoginState ,value:string) =>{
        const newState = {}
        newState[key] = value
        this.setState(newState)
    }
 


    public render(){
        const {account,password} = this.state;
        return(
            <div className="Login" id="Login">
                <h1>番茄闹钟毕设登录</h1>
                <Input
                        placeholder="请输入你的用户名"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        suffix={
                        <Tooltip title="Extra information">
                        <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                        
                    }
                    value={account}
                    onChange={(e) => this.onChange('account',e.target.value)}
                />
                    <Input.Password value={password}  placeholder="请输入密码" onChange={(e) => this.onChange('password',e.target.value)}/>
                    <Button type="primary" className="LoginBotton" onClick={this.submit}>登录</Button>
                    <p>如果你没有账户请立即 <Link to="SignUp">注册</Link></p> 
            </div>
        )
    }
}

export default  Login;