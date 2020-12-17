import React from 'react';
import Navbar from '../navbar/Navbar';
import Styles from './styles.module.scss';
import Card from './Card';
import Product from '../../assets/products/1.png';


function Search() {
    return (
        <div className={Styles.search}>
            <Navbar />
            <div className={Styles.body}>
                <div className={Styles.searchResult}>
                    <p className={Styles.searchValue}>
                        <span>Search Results : </span>
                        `NCERT TEXT BOOKS`
                    </p>
                </div>
                <div className={Styles.cards}>
                    <Card Photo={Product} Title='Dell XP15 Laptop' Price='400.00'/>
                    <Card Photo={Product} Title='Dell XP15 Laptop' Price='400.00'/>
                    <Card Photo={Product} Title='Dell XP15 Laptop' Price='400.00'/>
                    <Card Photo={Product} Title='Dell XP15 Laptop' Price='400.00'/>
                    <Card Photo={Product} Title='Dell XP15 Laptop' Price='990.00'/>
                    <Card Photo={Product} Title='Dell XP15 Laptop' Price='400.00'/>
                </div>
            </div>
        </div>
    )
}

export default Search;
