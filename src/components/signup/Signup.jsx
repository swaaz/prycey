import React from 'react'
import Navbar from '../navbar/Navbar';
import Styles from './styles.module.scss';
import Avatar from '../../assets/avatar/Sheik.png';
import {useForm} from "react-hook-form";
import axios from 'axios';
// import {toast} from 'react-toastify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
toast.configure();
function Signup() {
    const {register, handleSubmit} = useForm();
   
    
    const onSubmit = (e) => {
        // data.preventDefault();
        // console.log(data)
        // console.log('request sending')
        let fd = new FormData();
        fd.append('file', e.file[0]);
        fd.append('filename', e.file[0].nam);
        fd.append('user_id' , e.user_id);
        fd.append('name' , e.name);
        fd.append('contact_number' , e.contact_number);
        fd.append('password' , e.password);
        fd.append('emai_id' , e.email_id);
        axios.post('http://127.0.0.1:5000/signup', fd)
        .then( (response) => toast(response.data.response, {position: toast.POSITION.TOP_CENTER}))
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
                        <input ref={register} type='text' placeholder='username' name='user_id' required />
                        <input type='text' placeholder='full name' name='name' ref={register} required />
                        <input type='text' placeholder='email id' name='email' ref={register} required />
                        <input type='text' placeholder='contact number' name='contact_number' ref={register} required />
                        <input type='password' placeholder='password' name='password' ref={register} required />
                        <p className={Styles.upload}>Uplaod profile image</p>
                        <input name='file' style={Styles.uploadImage} type="file" ref={register} required />
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
