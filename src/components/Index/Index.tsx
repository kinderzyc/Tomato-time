import React from 'react';
import axios from '../../confing/axios';
import { Menu, Dropdown,Icon} from 'antd';
import history from '../../confing/history';
import Todos from '../Todos/Todos';


import './Index.scss'

interface IRouter{
    history:any
}
interface IindexState{
    user:any
}

const logout =  () =>{
    localStorage.setItem('x-token','')
    history.push('/Login')
}

const menu = (
    <Menu>
      <Menu.Item key="1">
      <Icon type="robot" />
        个人设置
      </Menu.Item>
      <Menu.Item key="2" onClick={logout}>
      <Icon type="logout" />
        注销
      </Menu.Item>
    </Menu>
  );


class Component extends React.Component<IRouter,IindexState>{

    constructor(props: any){
        super(props)
        this.state = {
            user:{}
        }
    }


    async componentWillMount(){
        await this.getMe()
    }

     getMe = async () =>{
        try{
            const response = await axios.get('me')
            this.setState({user:response.data})
        }catch(e){
            // console.log(e.response)
            // console.log('获取用户失败')
            // if(e.response.status === 401){
            // this.props.history.push('/Login')    
            // }
        }
    }


    public render(){
        return(
            <div className="Index" id="Index">
                <header>
                    <span className="logo">LOGO</span>
                    <Dropdown overlay={menu}>
                        
                        <span>{this.state.user && this.state.user.account}
                        <Icon type="down" style={{marginLeft: 15}} />
                        </span> 
                    </Dropdown>
                </header>
                <main>
                    <Todos/>
                </main>
            </div>
        )
    }
}

export default  Component;