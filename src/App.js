import React, { Component } from 'react';
import firebase from './firebase';
import Form from './Components/Form';
import Empty from './Components/EmptyList';
import ProductsList from './Components/ProductsList';
import './Partials/App.scss';
import cart from './assets/shoppingCart.jpg';
import Suggestions from './Components/Suggestions';

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

  // Event for product selected from suggested items
  selectedProduct = (product) => {
      // create reference to database
      const dbRef = firebase.database().ref();
      // Grab value userInput has and push to the database
      dbRef.push({
        isChecked: false,
        name: product
      });    
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

  // Event to remove product from the shopping list
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
        <div className="overlay">
          <div className="wrapper">
            <h1>GroceryFy</h1>
            <div className="listContainer">
              <Form value={this.state.userInput} change={this.handleChange} keyDown={this.handleKeyDown} />
              <div className="mainContainer">
                <div className="listBox">
                  <Empty emptyList={this.state.products.length === 0 ? 'shown' : 'hidden'} srcCart={cart} />
                  <ProductsList showHideClearBtn={this.state.products.length === 0 ? 'hidden' : 'shown'} clickClear={() => this.removeProduct()} products={this.state.products} changeToggle={this.toggleCheckbox.bind(this)} />
                </div> {/* .listBox */}
                <div className="suggestionsContainer">
                  <Suggestions
                    selectSuggestion={this.selectedProduct.bind(this)}
                    products={this.state.products.map(product => product.name)} />
                </div> {/* .suggestionsContainer */}
              </div> {/* .mainContainer */}
            </div> {/* .listContainer */}
          </div> {/* .wrapper */} 
        </div> {/* .overlay */}
           
        <div className="iconsCredit">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>          
      </div>
    );
  }
}

export default App;
