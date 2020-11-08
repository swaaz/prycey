import React from 'react';
import Navbar from '../navbar/Navbar';
import Styles from './styles.module.scss'

function Home() {
    return (
        <div className={Styles.app}>
            <Navbar/>
        </div>
    )
}

export default Home;
