import React, {useState, useEffect} from 'react';
import Navbar from '../navbar/Navbar';
import Styles from './styles.module.scss';
import Card from './Card';
import Product from '../../assets/products/1.png';
import axios from 'axios';
import { Link } from "react-router-dom";



function Search({match}) {
        const [ values, setValues] = useState([]);
        const [category, setCategory] = useState();
        useEffect(() => {
       axios
       .get(`http://127.0.0.1:5000/product/category/${match.params.category}`)
       .then((values) => {
           if(values.data[0] != null) setCategory(values.data[0]['category'])
           setValues(values.data);
       })
       .catch((error) => {
           console.log(error)
       })
    }, [])

    return (
        <div className={Styles.search}>
            <Navbar />
            <div className={Styles.body}>
                <div className={Styles.searchResult}>
                    <p className={Styles.searchValue}>
                        <span>Search Results : </span>
                        '{category? category: 'no data'}'
                    </p>
                </div>
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

export default Search;
