import React from "react";
import './Tomatoes.scss'
import TomatoesAction from './TomatoesAction';
import {connect} from 'react-redux';
import {addTomato,initTomatoes,updateTomato} from '../../confing/redux/actions/Tomatoes';
import axios from '../../confing/axios';

interface ITomatoesProps{
    addTomato: (payload :any) => any;
    updateTomato: (payload :any) => any;
    Tomatoes:any[];
    initTomatoes:(payload :any[]) => any;
}



class Tomatoes extends React.Component<ITomatoesProps>{
    constructor(props){
        super(props) 
        console.log(this.props)
    }


    componentDidMount(){
        this.getTomatoes()
    }

    get unfinishedTomato(){
        return this.props.Tomatoes.filter(t => !t.description && !t.ended_at)[0]
    }


    getTomatoes = async()=>{
        try{
            const response =  await axios.get('tomatoes')
            this.props.initTomatoes(response.data.resources)
            console.log(this.props.Tomatoes)
            console.log("我是谁",this.unfinishedTomato[0])
        }catch(e){
            throw  new Error(e)
        }
    }


    startTomato = async () =>{
        try{
            const response = await axios.post('tomatoes',{duration: 1500000})
            this.props.addTomato(response.data.resource)
        }catch(e){
            throw new Error(e)
        }
    }

    public render(){
        return (
            <div className="Tomatoes" id="Tomatoes">
                <TomatoesAction startTomato={this.startTomato} unfinishedTomato={this.unfinishedTomato} updateTomato={this.props.updateTomato}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    Tomatoes: state.Tomatoes,
    ...ownProps
  })

const mapDispatchToProps = {
    addTomato,
    updateTomato,
    initTomatoes,
  }  

export default connect(mapStateToProps,
    mapDispatchToProps  ) (Tomatoes);