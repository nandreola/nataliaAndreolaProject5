import React, { Component } from 'react';
import firebase from './firebase';
import Form from './Components/Form';
import './Partials/App.scss';
import cart from './assets/shoppingCart.jpg';

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
        newState.push({
          uniqueKey: key, 
          name: productData[key].name,
          isChecked: productData[key].isChecked
        });
      } 

      this.setState({
        products: newState
      });
    });
  }

  handleChange = (event) => {
    this.setState({userInput: event.target.value})
  }

  // Event to add product to the list once user presses enter
  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // create reference to database
      const dbRef = firebase.database().ref();
      // Grab value userInput has and push to the database
      dbRef.push({
        isChecked: false,
        name: this.state.userInput
      });
      // reset to an empty string
      this.setState({userInput: ''});
    }
  }

  toggleCheckbox(uniqueKey) {
    // credit https://stackoverflow.com/a/46518653
    this.setState({
      products: this.state.products.map(product => {
        if (product.uniqueKey === uniqueKey) {
          const dbRef = firebase.database().ref();
          dbRef.child(uniqueKey).update({ isChecked: !product.isChecked })
          return { ...product, isChecked: !product.isChecked } 
        } else {
          return product
        }
      })
    });
  }  

  removeProduct() {
    const dbRef = firebase.database().ref();
    const notCheckedProducts = this.state.products.filter(product => {
      if (product.isChecked === true) {
        dbRef.child(product.uniqueKey).remove();
        return false
      } else {
        return true
      }
    })

    this.setState({
      products: notCheckedProducts
    });
  }

  render () {
    return (
      <div className="App">
        <div className="wrapper">
          <h1>GroceryFy</h1>
          
          <div className="listContainer">
            <Form value={this.state.userInput} change={this.handleChange} keyDown={this.handleKeyDown} />

            <div className="listBox">

              <div className={this.state.products.length === 0 ? 'shown' : 'hidden'}>
              {/*Credit https://stackoverflow.com/a/51264578*/} 
                <p>Your shopping list<span>is empty</span></p>
                <div>
                  <img src={cart} alt="Cat with a shopping cart"/>
                </div>
              </div>

              <ul>
                <li className={this.state.products.length === 0 ? 'hidden' : 'shown'}>
                  <button className="clear" onClick={() => this.removeProduct()}>Clear list</button>
                </li>
                {this.state.products.map((product) => {
                  return (
                    <li key={product.uniqueKey}>
                    <input type="checkbox" defaultChecked={product.isChecked} name="product" className="checkBox" onChange={() => this.toggleCheckbox(product.uniqueKey)} />
                    <label htmlFor="product">{product.name}</label>
                    </li>
                    );
                  })}
              </ul>
            </div>
            
          </div>

        </div> 
               
      </div> 
    );
  }
}

export default App;
