import React, { Component } from 'react';

class TodoList extends Component {
  state = {
    todoList: [],
    isLoaded: false
  }
  componentDidMount() {
    fetch("http://crud0509.herokuapp.com/todo").then(response => response.json().then(data =>
      // console.log(data._embedded.todo)
      this.setState({ ...this.state, isLoaded: true, todoList: data._embedded.todo })
    ))
  }

  handleChange = (e) => {
    const queryText = e.target.value;
    fetch(`http://crud0509.herokuapp.com/todo/search/findByDescription?query=${queryText}`).then(response => response.json().then(data => {
      console.log(data._embedded.todo)
      this.setState({ ...this.state, isLoaded: true, todoList: data._embedded.todo })
    }
    ))
  }
  componentDidUpdate() {
    if (this.props.shouldRefresh) {
    // console.log("this.props",this.props)
      fetch("http://crud0509.herokuapp.com/todo").then(response => response.json().then(data => {
        // console.log(data._embedded.todo)
        this.setState({ ...this.state, isLoaded: true, todoList: data._embedded.todo });
        this.props.refreshDone();
      }
      ));
    }
  }

  render() {
    if (!this.state.isLoaded) return <div>Loading...</div>
    
    return (
      <div >
        <input type="text" onChange={this.handleChange} />
        {this.state.todoList.map((todo, index) => <div key={index}>{index + 1}.{todo.description}</div>)}
      </div>
    );
  }
}

export default TodoList;
