import React, { Component } from 'react'
import axios from 'axios';
import Helmet from 'react-helmet'

class githubusers extends Component {
    constructor(props){
        super(props);
        this.state = {users:'', errorMessage:''}
    }
    // state = {
    //     users: "",
    // };

    // Form button function
    // getUser(e) {
        getUser = e => {
        e.preventDefault();
        const login = e.target.elements.login.value;
        axios
            .get(
                `https://api.github.com/users/${login}`
            )
            .then(response => {
                console.log(response.data);
                this.setState({
                    users: response.data,
                    login: response.data.login, //showing login on webpage
                    name:response.data.name //showing name on webpage
                });
            })
            .catch(error => {
                console.log("Error is:", error);
                  this.setState({
                    errorMessage:
                      "Username does not exist. Please enter valid username"
                  });
              });
    };

      //Disappear error message after 2000sec.
  componentDidUpdate() {
    setTimeout(() => this.setState({ errorMessage: "" }), 2000);
  }

    render() {
        return (
            <>
                <Helmet><title>Githubusers</title></Helmet>
                <h1>Github users</h1>
                {/* <form onSubmit={this.getUser.bind(this)}> */}
                <form onSubmit={this.getUser}>
                    <input type="text" name="login" placeholder="Enter User..." />
                    <button>Get User</button>
                    <p>{this.state.errorMessage}</p>
                    <p>{this.state.login}</p> {/* showing login on webpage */}
                    <p>{this.state.name}</p> {/* showing name on webpage  */}
                </form>
            </>
        );
    }
}

export default githubusers;