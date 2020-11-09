import React from 'react'
import { Link } from 'react-router-dom';
import Styles from './styles.module.scss';
import electronicsGadgets from '../../assets/icons/electronics.png';
import furniture from '../../assets/icons/furniture.png';
import tools from '../../assets/icons/tools.png';
import books from '../../assets/icons/books.png';

function Filters() {
    return (
        <div className={Styles.filters}>
                <Link to='/'>
                    <img src={books} alt='books' />
                    <p>Books</p>
                </Link>
                <Link to='/'>
                    <img src={electronicsGadgets} alt='electronics' />
                </Link>
                <Link to='/'>
                    <img src={furniture} alt='firniture' />
                </Link>
                <Link to='/'>
                    <img src={tools} alt='tools'/>
                </Link>
            </div>
    )
}

export default Filters
