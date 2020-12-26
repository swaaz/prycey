import React, {useState} from 'react'
import Navbar from '../navbar/Navbar';
import Styles from './styles.module.scss';
import Avatar from '../../assets/avatar/Sheik.png';
import {useForm} from "react-hook-form";
import axios from 'axios';
function Signup() {
    const {register, handleSubmit} = useForm();
   
    
    const onSubmit = (data) => {
        // data.preventDefault();
        console.log(data)
        console.log('request sending')
        axios.post('http://127.0.0.1:5000/signup', data)
        .then( (response) => console.log(response))
        .catch( error => console.log(error))
    };

    return (
        <div className={Styles.signUp}>
            <Navbar />
            <div className={Styles.body}>
               <div className={Styles.content} >
                   <h1>Hey there!</h1>
                   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nam ipsum distinctio vitae quas ex officiis, magnam voluptates aperiam accusantium!</p>
               </div>
               <div className={Styles.form}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>Sign Up</h1>
                        <input ref={register} type='text' placeholder='username' name='user_id'  />
                        <input type='text' placeholder='full name' name='name' ref={register} />
                        <input type='text' placeholder='email id' name='email' ref={register}/>
                        <input type='text' placeholder='contact number' name='contact_number' ref={register}/>
                        <input type='password' placeholder='password' name='password' ref={register}/>
                        <button type='submit'>submit</button>
                    </form>
               </div>
               
            </div>
            <div className={Styles.avatarSection}>
                <img className={Styles.avatar} src={Avatar} alt='avatar' />
            </div>
        </div>
    )
}

export default Signup;
