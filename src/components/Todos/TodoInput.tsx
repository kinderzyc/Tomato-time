import React from 'react';
import {Input,Icon} from 'antd';
import {connect} from 'react-redux';
import {addTodo} from '../../confing/redux/actions/action';
import axios from '../../confing/axios';

interface ITodoInputState{
    description:string;
}

interface ITodoInputProps{
    addTodo: (payload:any) => any;
}

class TodoInput extends React.Component<ITodoInputProps,ITodoInputState>{

    constructor(props: any){
        super(props)
        this.state = {
            description:''
        }
    }

    onkeyUp = (e: { keyCode: any; }) =>{
        if(e.keyCode ===13 && this.state.description !==''){
            this.postTodo()
        }
    }

    postTodo = async ()=>{
        try{
            const response =  await axios.post('todos',
            {description: this.state.description})
            this.props.addTodo(response.data.resource)
           
        }catch(e){
            throw new Error(e)
        }
        this.setState({description:''})
    }

    public render(){
        const {description} = this.state;
        const suffix = description ? <Icon type="enter" onClick={this.postTodo}/>:<span/>;
        return(
            <div className="TodoInput" id="TodoInput">
                <Input 
                 placeholder="添加新任务"
                 suffix={suffix}
                 value={description}
                 onChange ={(e: { target: { value: any; }; }) =>this.setState({description: e.target.value})}
                
                 onKeyUp={this.onkeyUp}
                />

            </div>
        )
        
    }
}


const mapStateToProps = (state, ownProps) => ({
    ...ownProps
  })

const mapDispatchToProps = {
    addTodo
  }  

export default connect(mapStateToProps,
    mapDispatchToProps)(TodoInput);
    

