import React from 'react';
import Styles from './styles.module.scss';
import { Link } from "react-router-dom";
import Search from '../../assets/icons/search.png';
function Navbar() {
    return (
        <div className={Styles.navbar}>
            <nav>
                <Link to='/'>
                    <p>Prycey</p>
                </Link>
                <div className={Styles.search}>
                    <form>
                    <input type='text' />
                    <button type='submit'>
                        <img src={Search}/>
                    </button>
                    </form>
                </div>
                <ul className={Styles.navbarOptions}>
                    <li><Link to='/Home'>signin</Link></li>
                    <li><Link to='/search'>signin</Link></li>
                    <li><Link to='/signin'>signin</Link></li>
                   
                    <Link className={Styles.navbarButton} to='/signup'><li> signin </li></Link>
                    
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
