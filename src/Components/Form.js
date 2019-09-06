import React from 'react';

const Form = ({value, change, keyDown}) => {
    return (
        <form action="submit">
            <label htmlFor="newProduct" className="visuallyHidden">Add an item to your shopping list</label>
            <input
                type="text"
                id="newProduct"
                placeholder="Add an item to your list"
                value={value}
                onChange={change}
                onKeyDown={keyDown}
            />
        </form>
    );
}

export default Form;

