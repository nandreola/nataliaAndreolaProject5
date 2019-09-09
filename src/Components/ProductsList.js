import React from 'react';

const ProductsList = ({ showHideClearBtn, clickClear, products, changeToggle }) => {
    return (
        <ul className="prodUl">
            <li className={showHideClearBtn}>
                <button className="clear" onClick={clickClear}>Clear list</button>
            </li>
            {products.map((product) => {
                return (
                    <li key={product.uniqueKey}>
                        <input type="checkbox" defaultChecked={product.isChecked} name="product" className="checkBox" onChange={() => changeToggle(product.uniqueKey)} />
                        <label htmlFor="product">{product.name}</label>
                    </li>
                );
            })}
        </ul>
    );
}

export default ProductsList;