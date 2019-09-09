import React from 'react';
import appleImg from '../assets/apple.png';

const defaultProducts = [
    {
        name: 'apple',
        img: appleImg,
    },
    {
        name: 'apple',
        img: appleImg,
    },
    {
        name: 'apple',
        img: appleImg,
    },
    {
        name: 'apple',
        img: appleImg,
    },
    {
        name: 'apple',
        img: appleImg,
    },
    {
        name: 'apple',
        img: appleImg,
    }
]


const Suggestions = ({ selectSuggestion, products }) => {
    return (
        <ul className="suggestionsUl">
        {defaultProducts.map((product) => {
            const exists = products.includes(product.name)
            return (
                <li className={exists ? 'greyScale' : 'okay'}>
                    <button onClick={exists ? null : () => selectSuggestion(product.name)}>
                        <img src={product.img} alt={product.name} />
                    </button>
                </li>
            );
        })}
        </ul>
    );
}

export default Suggestions;
