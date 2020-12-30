import React from 'react';
import Navbar from '../navbar/Navbar';
import Styles from './styles.module.scss';
import Avatar from '../../assets/avatar/Jacob_Blake.png';
import {useForm} from "react-hook-form";
import axios from 'axios';

// axios.defaults.withCredentials = true


function Signin() {
    const {register, handleSubmit} = useForm();
    const onSubmit = (data) =>{
        console.log(data)
        axios.post('http://127.0.0.1:5000/signin', data)
        .then( response => alert(response.data.response))
        .catch( error => console.log(error))
    }
    return (
        <div className={Styles.signIn}>
            <Navbar />
            <div className={Styles.body}>
               <div className={Styles.content} >
                   <h1>Hey there!</h1>
                   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nam ipsum distinctio vitae quas ex officiis, magnam voluptates aperiam accusantium!</p>
               </div>
               <div className={Styles.form}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>Sign In</h1>
                        <input type='text' placeholder='username' name='username' ref={register} />
                        <input type='password' placeholder='password' name='password' ref={register} />
                        <button type='submit'>login</button>
                    </form>
               </div>
               
            </div>
            <div className={Styles.avatarSection}>
                <img className={Styles.avatar} src={Avatar} alt='avatar' />
            </div>
        </div>
    )
}

export default Signin;
