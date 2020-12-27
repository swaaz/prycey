import React, {useState, useEffect} from 'react';
import Navbar from '../navbar/Navbar';
import Styles from './styles.module.scss'
import Avatar from '../../assets/avatar/tomas.png';
import Title from '../../assets/bg/font.png';
import Filters from './Filters';
import Item from './Item';
import Photo from '../../assets/products/1.jpg';
import axios from 'axios';
import { Link } from "react-router-dom";


function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
		axios
			.get(`http://127.0.0.1:5000/search?q=`)
			.then(response => {
                console.log(response.data)
				setPosts(response.data)
			})
			.catch(error => {
				console.log(error)
			})
    }, [])
    
    return (
        <div className={Styles.home}>
            <Navbar/>
            <div className={Styles.hero}>
                <img className={Styles.title} src={Title} alt='title'/>
                <img className={Styles.avatar} src={Avatar} alt='avatar'/>
            </div>  
            <Filters />
			
            <div className={Styles.cards}>
                {
                    posts.map( (value) => {
                        return(
                            <Link key={value.item_id} to={`/product/${value.item_id}`}>
                                <Item key={value.item_id}  Photo={Photo} Title={value.title} Price={value.price}/>
                            </Link>
                        )
                    })
                }
            </div>
            <footer className={Styles.footer}>
                <p className={Styles.footerText}> prycey © 2020 </p>
            </footer>
            
        </div>
    )
}

export default Home;
