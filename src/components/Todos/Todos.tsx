import React from 'react'; 
import TodoInput  from '../Todos/TodoInput';
import axios from '../../confing/axios';
import '../Todos/Todos.scss';
import TodoItem from './TodoItem';
import {connect} from 'react-redux';
import {initTodos,updateTodo} from '../../confing/redux/actions/action';


class Todos extends React.Component <any>{

    // constructor(props: any){
    //     super(props)
      
        
    // }

    get unDeletedTodos(){
        return this.props.todos.filter(t=> !t.deleted)
    }

    get unCompeletedTodos(){
        return this.unDeletedTodos.filter(t=> !t.completed)
    }
    get CompeletedTodos(){
        return this.unDeletedTodos.filter(t=> t.completed)
    }


    componentDidMount(){
        this.getTodos()
    }

    getTodos = async() => {
        try{
            const response = await axios.get('todos')
            const todos= response.data.resources.map(t=>Object.assign({},t,{editing:false}))
            this.props.initTodos(todos)
        }catch(e){
            throw new Error(e)
        }
    }


    public render(){
        return (
            <div className="Todos" id="Todos">
                <TodoInput/>
                <div className="todoList">
                    {
                        this.unCompeletedTodos.map(t=><TodoItem key={t.id} {...t}
                        />)
                    }
                     {
                        this.CompeletedTodos.map(t=><TodoItem key={t.id} {...t}
                        />)
                    }
                </div>
            </div>
        )   
    }
}


const mapStateToProps = (state, ownProps) => ({
    todos: state.todos,
    ...ownProps
  })

const mapDispatchToProps = {
    initTodos,
    updateTodo,
  }  

export default connect(mapStateToProps,
    mapDispatchToProps)(Todos);