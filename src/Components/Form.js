import React from 'react';
import Autocomplete from './Autocomplete';

const Form = ({value, change, keyDown}) => {
    return (
        <form action="submit">
            <Autocomplete/>
            <label htmlFor="newProduct" className="visuallyHidden">Add an item to your shopping list</label>
            <input
                type="text"
                id="newProduct"
                placeholder="Add Item"
                value={value}
                onChange={change}
                onKeyDown={keyDown}
                className="addText"
            />
        </form>
    );
}

export default Form;

