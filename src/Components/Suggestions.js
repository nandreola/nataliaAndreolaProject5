import React from 'react';
import appleImg from '../assets/apple.png';
import bananaImg from '../assets/bananas.png';
import baconImg from '../assets/bacon.png';
import broccoliImg from '../assets/broccoli.png';
import chocolateImg from '../assets/chocolate.png';
import eggplantImg from '../assets/eggplant.png';
import eggImg from '../assets/friedEgg.png';
import milkImg from '../assets/milk.png';
import toastImg from '../assets/toast.png';

const defaultProducts = [
    {
        name: 'apple',
        img: appleImg,
    },
    {
        name: 'banana',
        img: bananaImg,
    },
    {
        name: 'bacon',
        img: baconImg,
    },
    {
        name: 'broccoli',
        img: broccoliImg,
    },
    {
        name: 'chocolate',
        img: chocolateImg,
    },
    {
        name: 'eggplant',
        img: eggplantImg,
    },
    {
        name: 'egg',
        img: eggImg,
    },
    {
        name: 'milk',
        img: milkImg,
    },
    {
        name: 'toast',
        img: toastImg,
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
