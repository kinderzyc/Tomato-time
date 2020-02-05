import React from 'react';
import {Router,Route} from 'react-router-dom'
import Login from './components/Login/Login'
import Index from './components/Index/Index'
import SignUp from './components/SignUp/SignUp'
import history from './confing/history'


class App extends React.Component{

  render(){
    return(
      <div>
      <Router history = {history} >
        <Route exact path="/" component={Index}/>
        <Route path="/Login" component={Login}/>
        <Route path="/SignUp" component={SignUp}/>
      </Router>
      </div>

    )
  }
}

export default App