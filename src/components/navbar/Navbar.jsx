import React, {useState} from 'react';
import Styles from './styles.module.scss';
import { Link } from "react-router-dom";
import Search from '../../assets/icons/search.png';
import {useForm} from "react-hook-form";
// import {Redirect} from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Navbar(props) {
    const {register, handleSubmit} = useForm();
    // const [search, setSearch] = useState('');
    // console.log(props)
    const history = useHistory();


    const onSubmit = (data) =>{
        // console.log(data.searchValue)
        data.searchValue? history.push(`/search/${data.searchValue}`) : console.log('null');
        
    }
    // const submit = (e) =>{
    //     e.preventDefault();
    //     console.log(search);
    //     if(search){
    //         history.push("/sell")
    //     }

    // }

    return (
        <div className={Styles.navbar}>
            <nav>
                <Link to='/'>
                    <p>Prycey</p>
                </Link>
                <div className={Styles.search}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type='text' name='searchValue' ref={register} />
                        <button type='submit'>
                            <img src={Search} alt='search'/>
                        </button>
                    </form>
                </div>
                <ul className={Styles.navbarOptions}>
                    {/* <li>{search}</li> */}
                    
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    <li><Link to='/sell'>Sell</Link></li>
                    <li><Link to='/signin'>Sign in</Link></li>
                   
                    <Link className={Styles.navbarButton} to='/signup'><li> Sign Up </li></Link>
                    
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
