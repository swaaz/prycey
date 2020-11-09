import React from 'react';
import Styles from './styles.module.scss';
import { Link } from "react-router-dom";
function Navbar() {
    return (
        <div className={Styles.navbar}>
            <nav>
                <p>Prycey</p>
                <div className={Styles.search}>
                    <form>
                    <input type='text' />
                    <button type='submit'>
                        <img src="https://img.icons8.com/ios/50/000000/search--v3.png"/>
                    </button>
                    </form>
                </div>
                <ul className={Styles.navbarOptions}>
                   <li><Link to='/Home'>signin</Link></li>
                   <li><Link to='/ss'>signin</Link></li>
                   <li><Link to='/d'>signin</Link></li>
                   
                    <Link className={Styles.navbarButton} to='/a'><li> signin </li></Link>
                    
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
