import React from "react";
import {Button,Input,Icon} from 'antd';
import axios from '../../confing/axios'
import CountDown from './CountDown'

interface ITomatoActionProps{
    startTomato:()=> void; 
    unfinishedTomato: any;
    updateTomato:(payload:any)=> void;
}

interface ITomatoActionState{
    description: string;
}

 
class TomatoesAction extends React.Component<ITomatoActionProps,ITomatoActionState>{
    constructor(props){
        super(props)
        this.state={
            description: ''
        }
    }

    onKeyUp = (e) => {
        if(e.keyCode === 13 && this.state.description !==''){
            this.addDescription()
        }
    }

    addDescription = async () =>{
        try{
            const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`,
            {description: this.state.description,
            ended_at: new Date()
            })
            this.setState({description: ''})
            console.log(response)
        }catch(e){
            throw new Error(e)
        }
    }


    public render(){
       let html = <div/>
        if(this.props.unfinishedTomato === undefined){
            html = <Button className="startTomatoButton"  onClick={()=>{this.props.startTomato()}}>开始番茄</Button>
        }else{
            const started_at = Date.parse(this.props.unfinishedTomato.started_at)
            const duration = this.props.unfinishedTomato.duration
            const timeNow = new Date().getTime()
            if(timeNow - started_at > duration){
               html = <div>
                   <Input value={this.state.description}
                   placeholder="请输入你刚刚完成的任务"
                   onChange={e=> this.setState({description: e.target.value})}
                   onKeyUp={e=> this.onKeyUp(e)}
                   />
                   <Icon type="close-circle"/>
                     </div>
            }else if(timeNow - started_at < duration){
                 html = <CountDown/>//倒计时
            }
        }
        
        return(
            <div className="TomatoesAction" id="TomatoesAction">
                {html}
            </div>
        );
    }
}

export default TomatoesAction;