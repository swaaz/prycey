import React from 'react';
import Navbar from '../navbar/Navbar';
import Styles from './styles.module.scss'
import Avatar from '../../assets/avatar/tomas.png';
import Title from '../../assets/bg/font.png';
function Home() {
    return (
        <div className={Styles.home}>
            <Navbar/>
            <div className={Styles.hero}>
                {/* <p className={Styles.title}>Prycey</p> */}
                <img className={Styles.title} src={Title} />
                <img className={Styles.avatar} src={Avatar}/>
            </div>
        </div>
    )
}

export default Home;
