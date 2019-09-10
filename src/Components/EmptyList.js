import React from 'react';

const Empty = ({ emptyList, srcCart}) => {
    return (
        <div className={emptyList}>
            {/*Credit https://stackoverflow.com/a/51264578*/}
            <p>Your shopping list<span>is empty</span></p>
            <div className="emptyListImg">
                <img 
                    src={srcCart} 
                    alt="Cat with a shopping cart" 
                />
            </div>
        </div>
    );
}

export default Empty;