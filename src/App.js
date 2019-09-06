import React, { Component } from 'react';
import firebase from './firebase';
import Form from './Components/Form';
import './Partials/App.scss';

class App extends Component {
  constructor() {
    super();

    // initial state for products data
    this.state = {
      products: [],
      userInput: ''
    };
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();

    // Grab value of firebase
    dbRef.on('value', (data) => {
      // store product to Firebase
      const productData = data.val();
      
      // variable to store the new state
      const newState = [];

      for (let key in productData) {
        newState.push(productData[key]);
      } 

      this.setState({
        products: newState
      });

    });
  }

  handleChange = (event) => {
    this.setState({userInput: event.target.value})
  }

  // Event to add input to the list once user press enter
  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // create reference to database
      const dbRef = firebase.database().ref();
      // Grab value userInput has and push to the database
      dbRef.push(this.state.userInput);
      // reset to an empty string
      this.setState({userInput: ''})
    }
  }

  render () {
    return (
      <div className="App">
        <h1>Project5 Name</h1>
        <Form value={this.state.userInput} change={this.handleChange} keyDown={this.handleKeyDown}/>
        
        <ul>
          {this.state.products.map((product) => {
            return <li>{product}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default App;
