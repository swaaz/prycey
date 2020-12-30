import React, {useState, useEffect} from 'react';
import Navbar from '../navbar/Navbar';
import Styles from './styles.module.scss';
import Card from './Card';
import Product from '../../assets/products/1.png';
import axios from 'axios';
import { Link } from "react-router-dom";



function SearchResult(props) {
        const [ values, setValues] = useState([]);
        useEffect(() => {
        console.log(props);
       axios
       .get(`http://127.0.0.1:5000/search?q=${props.match.params.value}`)
       .then((values) => {
           setValues(values.data);
       })
       .catch((error) => {
           console.log(error)
       })
    }, [props.match.params.value])

    return (
        <div className={Styles.search}>
            <Navbar />
            <div className={Styles.body}>
                <div className={Styles.searchResult}>
                    <p className={Styles.searchValue}>
                        <span>Search Results : </span>
                        '{props.match.params.value}'
                    </p>
                </div>
                <p className={Styles.warning}>{values.length? '' : 'No Result Found'}</p>
                <div className={Styles.cards}>
                    {
                        values.map( (data) => {
                            return(
                                <Link key={data.item_id} to={`/product/${data.item_id}`} >
                                    <Card key={data.item_id} Photo={Product} Title={data.title} Price={data.price}/>
                                </Link>
                            );
                        })
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default SearchResult;
