import React, {useState, useEffect} from 'react';
import Navbar from '../navbar/Navbar';
import Styles from './styles.module.scss'
import Avatar from '../../assets/avatar/tomas.png';
import Title from '../../assets/bg/font.png';
import Filters from './Filters';
import Item from './Item';
import Photo from '../../assets/products/1.jpg';
import axios from 'axios';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
		axios
			.get(`http://127.0.0.1:5000/search`)
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
                {/* <p className={Styles.title}>Prycey</p> */}
                <img className={Styles.title} src={Title} alt='title'/>
                <img className={Styles.avatar} src={Avatar} alt='avatar'/>
            </div>
            <Filters />
            {/* {posts.map(post=><p key={post.id}>{post.title}</p>)} */}
			
            <div className={Styles.cards}>
                {
                    <Item key={posts.item_id['0']} Photo={Photo} Title={posts.title['0']} Price={posts.price['0']}/>
                }
            </div>
        </div>
    )
}

export default Home;
