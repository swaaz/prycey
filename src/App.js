<<<<<<< HEAD
import styles from "./App.module.scss"
import Home from "./components/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import Search from "./components/search/Search";
import ProductPage from "./components/productPage/ProductPage";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/product' component={ProductPage} />
          <Route path='/search' component={Search} />
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
          <Route path='/' exact component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
=======
import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       username : '',
       password : '',
    }
  }

  changeHandler = (e) =>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    axios.post('http://192.168.1.13:5000/signin', this.state)
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
  }
  // clicked (){
  //   const value = {
  //     'name' : 'swaaz',
  //     'password' : 'password',
  //   }
  //   axios.post('http://192.168.1.13:5000/signin', value)
  //   .then((response) => {
  //     console.log(response)
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
  // }
  
  render() {
    const {username, password} = this.state;
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <div>
            <input type='text' name='username' value={username} onChange={this.changeHandler} />
          </div>
          <div>
            <input type='password' name='password' value={password} onChange={this.changeHandler} />
          </div>
          <button type='submit'>Submit</button>
        </form>
        {/* <button onClick={this.clicked} >Submit</button> */}
      </div>
    )
  }
}

export default App;


>>>>>>> sql-build
