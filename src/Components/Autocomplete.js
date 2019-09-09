import React, { Component } from 'react';
import Search from 'react-search';
import axios from 'axios';

class Autocomplete extends Component {

    constructor(props) {
        super(props)
        this.state = { products: [] }
    }

    itemsSelected(items) {
        console.log(items);
    }

    getItemsAsync(searchValue, cb) {
        // make Ajax request
        axios({
            method: 'GET',
            url: 'https://trackapi.nutritionix.com/v2/search/instant',
            dataResponse: 'json',
            params: {
                query: searchValue,
            },
            headers: {
                'x-app-key': 'f8d05ac6d9c3b0eb557f949f6b7c4e1c',
                'x-remote-user-id': '0',
                'x-app-id': 'b1e99c46',
            }
        }).then((results) => {
            if (results.data.common !== undefined) {
                let items = results.data.common.map((product, i) => { return { id: i, value: product.food_name } })
                this.setState({ products: items })
                cb(searchValue)
            }
        });
    }

    render() {
        return (
            <Search items={this.state.products}
                getItemsAsync={this.getItemsAsync.bind(this)}
                onItemsChanged={this.itemsSelected.bind(this)} />
        )
    }
}

export default Autocomplete;
