import React from 'react';
import Styles from './styles.module.scss';

function Item(props) {
    return (
        <div className={Styles.card}>
            <img className={Styles.productImage} src={props.Photo} alt='product' />
            <p className={Styles.productTitle}>{props.Title}</p>
            <p className={Styles.productPrice}>{`₹ ${props.Price}`}</p>
        </div>
        
    )
}

export default Item;
