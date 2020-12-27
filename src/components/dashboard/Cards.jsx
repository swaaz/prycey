import React from 'react';
import Styles from './styles.module.scss';
import Delete from '../../assets/icons/black_bin.png';
import Edit from '../../assets/icons/black_edit.png';




function Cards(props) {
    return (
        <div className={Styles.card}>
            <div className={Styles.rowOne}>
                <h1 className={Styles.title}>{props.title}</h1>
                <div className={Styles.icons}>
                    <img className={Styles.icon} src={Edit} alt='edit'/>
                    <img className={Styles.icon} src={Delete} alt='delete'/>
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
