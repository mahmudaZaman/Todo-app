import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NewTodoForm from "./components/newTodoForm"
import TodoList from "./components/todoList"
class App extends Component {
  state = {
    re : false,
  }
  handleRefresh = ()=>{
    if(this.state.re===false){
      this.setState({...this.state,re : true})
    }
  }
  refreshDone = ()=>{
    this.setState({...this.state,re : false})
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <NewTodoForm refresh = {this.handleRefresh}/>
          </div>
          <div className="col-md-6"><TodoList  shouldRefresh = {this.state.re} refreshDone = {this.refreshDone}/></div>
        </div>
      </div>
    );
  }
}

export default App;
