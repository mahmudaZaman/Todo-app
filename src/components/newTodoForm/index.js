import React, { Component } from 'react';

class NewTodoForm extends Component {
    state = {
        description: null
    }
    handleChange = (e) => {
        this.setState({ ...this.state, description: e.target.value });
    }
    createTodo = (e) => {

        if (this.state.description) {
            console.log("Saving...",this.state.description)
            // this.setState({...this.state,description:null})
            fetch('http://crud0509.herokuapp.com/todo', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    // "Content-Type": "application/x-www-form-urlencoded",
                },
                body: JSON.stringify(this.state)
            }).then(response=> {
                return response.json();
            }).then( (data) =>{
                // console.log("Post successfull");
                this.props.refresh();
                this.setState({...this.state,description:null})
            });
        }
    }

    render() {
        return (
            <div >
                <label>Description : </label>
                <input type="text" value = {this.state.description || ''} onChange={this.handleChange} />
                <button onClick={this.createTodo}>Add</button>
            </div>
        );
    }
}

export default NewTodoForm;
