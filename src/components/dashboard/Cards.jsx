import React from 'react';
import Styles from './styles.module.scss';
import Delete from '../../assets/icons/purple_bin.png';
import Edit from '../../assets/icons/purple_edit.png';
import axios from 'axios';




function Cards(props) {
    const onDelete = (data) => {
        console.log(data);
        axios.get(`http://0.0.0.0:5000/product/${data}/delete`)
        .then( response => console.log(response))
        .catch( error => console.log(error))
    }
    return (
        <div className={Styles.card}>
            <div className={Styles.rowOne}>
                <h1 className={Styles.title}>{props.title}</h1>
                <div className={Styles.icons}>
                    <img className={Styles.icon} src={Edit} alt='edit'/>
                    <img onClick={ e => onDelete(props.itemId)} className={Styles.icon} src={Delete} alt='delete'/>
                </div>
            </div>
            <p className={Styles.description}>{props.description}</p>
            <div className={Styles.rowTwo}>
                <p className={Styles.price}>₹ {props.price}</p>
                <img className={Styles.productImage} src={props.image} alt='product' />
            </div>
        </div>
    )
}

export default Cards;
