import React from 'react';
import { Checkbox , Icon } from 'antd';
import '../Todos/TodoItem.scss'
// import classNames from 'classnames';
import {connect} from 'react-redux';
import {editTodo,updateTodo} from '../../confing/redux/actions/action'
import axios from '../../confing/axios';
 

interface ITodoItemProps{
    id: number;
    description: string;
    completed: boolean;
    editing: boolean;
    editTodo:(id:number)=>any;
    updateTodo:(payload:any)=>any;
}
interface ITodoItemState{
    editText:string;
}

class TodoItem extends React.Component<ITodoItemProps,ITodoItemState>{

    constructor(props){
        super(props)
        this.state={
            editText: this.props.description
        }
    }


    updateTodo = async(params:any) =>{
        try{
            const response = await axios.put(`todos/${this.props.id}`,params)
            this.props.updateTodo(response.data.resource)
        }catch(e){
            throw new Error(e)
        }
    }

    editTodo = () => {
        this.props.editTodo(this.props.id)
    }

    onKeyUp = (e) =>{
        if(e.keyCode ===13 && this.state.editText !==''){
            this.updateTodo({description:this.state.editText})
        }
    }

    public render(){
        const Editing =(
            <div className="editing">
                <input type="text" value={this.state.editText}
                    onChange={e =>this.setState({editText:e.target.value})}
                    onKeyUp={this.onKeyUp}
                />
                <div className="iconWarpper">
                <Icon type="enter" />
                <Icon type="delete" theme="filled" 
                
                    onClick={e =>this.updateTodo({deleted: true})}/>
                </div>
            </div>
        )
        const Text = <span className="text" onDoubleClick={this.editTodo}>{this.props.description}</span>
    
        const todoItemClass =`TodoItem ${(this.props.editing && 'editing')||''}
        ${(this.props.completed && 'completed')||''}`
        return(
            <div className={todoItemClass}  id="TodoItem">
                <Checkbox checked={this.props.completed}
                    onChange={e=> this.updateTodo({completed: e.target.checked})}
                />         
                {this.props.editing?Editing:Text}             
            </div>
        )
    }
}
const mapStateToProps = (_state, ownProps) => ({
    ...ownProps
  })

const mapDispatchToProps = {
    editTodo,
    updateTodo,
  }  

export default connect(mapStateToProps,mapDispatchToProps)(TodoItem);