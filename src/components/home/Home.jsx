import React, {useReducer} from 'react';
import Navbar from '../navbar/Navbar';
import Styles from './styles.module.scss'
import Avatar from '../../assets/avatar/tomas.png';
import Title from '../../assets/bg/font.png';
import Filters from './Filters';
import Item from './Item';
import Photo from '../../assets/products/1.jpg';
import axios from 'axios';

const initialState = {
    posts:  {}
}

const reducer = (state, action ) => {
    switch(action.type){
        case 'FETCH_SUCESS':
            return{
                post: action.payload
            }
        case 'FETCH_ERROR':
            return{
                post:{}
            }

        default: return state
    }
}

function Home() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        axios
        return () => {
            cleanup
        }
    }, [input])
    return (
        <div className={Styles.home}>
            <Navbar/>
            <div className={Styles.hero}>
                {/* <p className={Styles.title}>Prycey</p> */}
                <img className={Styles.title} src={Title} alt='title'/>
                <img className={Styles.avatar} src={Avatar} alt='avatar'/>
            </div>
            <Filters />
            <div className={Styles.cards}>
                <Item Photo={Photo} Title={'HP i3 Laptop'} Price={999}/>
                <Item Photo={Photo} Title={'HP i3 Laptop'} Price={999}/>
                <Item Photo={Photo} Title={'HP i3 Laptop'} Price={999}/>
                <Item Photo={Photo} Title={'HP i3 Laptop'} Price={999}/>
                <Item Photo={Photo} Title={'HP i3 Laptop'} Price={999}/>
                <Item Photo={Photo} Title={'HP i3 Laptop'} Price={999}/>
                <Item Photo={Photo} Title={'HP i3 Laptop'} Price={999}/>
                <Item Photo={Photo} Title={'HP i3 Laptop'} Price={999}/>
                <Item Photo={Photo} Title={'HP i3 Laptop'} Price={999}/>
               
                
            </div>
        </div>
    )
}

export default Home;
