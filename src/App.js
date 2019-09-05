import React, { Component } from 'react';
import firebase from './firebase';
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
      console.log(data.val());
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

  render () {
    return (
      <div className="App">
        <h1>Project5 Name</h1>
        <form action="submit">
          <label htmlFor="newProduct" className="visuallyHidden">Add an item to your shopping list</label>
          <input 
            type="text" 
            id="newProduct" 
            placeholder="Add an item to your list" 
            onChange={this.handleChange} 
            value={this.state.userInput}
          />
        </form>
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
