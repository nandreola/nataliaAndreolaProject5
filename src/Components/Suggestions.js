import React from 'react';
import appleImg from '../assets/apple.png';
import bananaImg from '../assets/bananas.png';
import baconImg from '../assets/bacon.png';
import broccoliImg from '../assets/broccoli.png';
import chocolateImg from '../assets/chocolate.png';
import hamburgerImg from '../assets/hamburger.png';
import eggImg from '../assets/friedEgg.png';
import milkImg from '../assets/milk.png';
import toastImg from '../assets/toast.png';
import grapesImg from '../assets/grapes.png';
import chickenImg from '../assets/chicken-leg.png';
import orangeImg from '../assets/orange.png';

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
        name: 'toast',
        img: toastImg,
    },
    {
        name: 'chocolate',
        img: chocolateImg,
    },
    {
        name: 'hamburger',
        img: hamburgerImg,
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
        name: 'broccoli',
        img: broccoliImg,
    },
    {
        name: 'chicken',
        img: chickenImg,
    },
    {
        name: 'grapes',
        img: grapesImg,
    },
    {
        name: 'orange',
        img: orangeImg,
    }
]

const Suggestions = ({ selectSuggestion, products }) => {
    return (
        <div className="suggestionsBlock">
            <h2>Popular items </h2>
            <ul className="suggestionsUl">
                {defaultProducts.map((product) => {
                    const exists = products.includes(product.name)
                    return (
                        <li>
                            <button
                                className={['suggestionsBtn', exists ? 'greyScale' : 'okay'].join(' ')}
                                onClick={exists ? null : () => selectSuggestion(product.name)}>
                                <img src={product.img} alt={product.name} />
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
        
    );
}

export default Suggestions;
