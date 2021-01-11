import React, {useState, useEffect} from 'react';
import Styles from './styles.module.scss';
import { Link } from "react-router-dom";
import Search from '../../assets/icons/search.png';
import {useForm} from "react-hook-form";
// import {Redirect} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function Navbar(props) {
    const {register, handleSubmit} = useForm();
    // const [search, setSearch] = useState('');
    // console.log(props)
    const [loggedin, setLoggedin] = useState(false);
    const history = useHistory();

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/checkauth')
        .then(response => 
            {
                response.data.response? setLoggedin(true) : setLoggedin(false);

                console.log(loggedin)
            })
        .catch( error => console.log(error))
    } )

    const onSubmit = (data) =>{
        // console.log(data.searchValue)
        data.searchValue? history.push(`/search/${data.searchValue}`) : console.log('');
        
    }
    const signOut=(e)=>
    {
        axios.get('http://127.0.0.1:5000/signout')
        .then(response => {
            console.log(response);
            console.log('sigginigout ')
            setLoggedin(false);
            toast(response.data.response, {position: toast.POSITION.TOP_CENTER})
        })
        .catch(error => console.log(error))

    }

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
                    {loggedin ?<li> <Link onClick={ e => signOut()}>Signout</Link></li> :<li><Link to='/signin'>Sign in</Link></li>} 

                   
                    <Link className={Styles.navbarButton} to='/signup'><li> Sign Up </li></Link>
                    
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
