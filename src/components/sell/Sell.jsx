import React from 'react';
import Styles from './styles.module.scss';
import Avatar from '../../assets/avatar/oldman.png';
import Navbar from '../navbar/Navbar';
import {useForm} from "react-hook-form";
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


function Sell() {
    const history = useHistory();
    const {register, handleSubmit} = useForm();

    const onSubmit = (e) =>{
        console.log(e);
        let fd = new FormData();
        fd.append('file', e.file[0]);
        fd.append('filename', e.file[0].nam);
        fd.append('title' , e.title);
        fd.append('description' , e.description);
        fd.append('price' , e.price);
        fd.append('year' , e.year);
        fd.append('category' , e.category);
        

        // formData.append('name', 'swaas')
        console.log(fd)
        axios.post('http://127.0.0.1:5000/sell', fd)
        .then( response => {
            toast(response.data.response, {position: toast.POSITION.TOP_CENTER})
            if(response.data.response == 'Please Signin'){
                history.push('/signin')
            }
        })
        .catch( error => console.log(error))
        
    }
    return (
        <div className={Styles.sell}>
            <Navbar />
            <div className={Styles.body}>
               <div className={Styles.content} >
                   <h1>Hey there!</h1>
                   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nam ipsum distinctio vitae quas ex officiis, magnam voluptates aperiam accusantium!</p>
               </div>

               <div className={Styles.form}>
                    <form onSubmit={handleSubmit(onSubmit)} formEncType='multipart/form-data' >
                        <h1>Sell</h1>
                        <input name='title' type='text' placeholder='title' ref={register} required />
                        <input name='description' type='text' placeholder='description' ref={register} required/>
                        <p className={Styles.categoryTitle}>category</p>
                        <div className={Styles.category}>
                            <div className={Styles.categorySet}>
                                <input type='radio' name='category' id='books' value='2' ref={register} required/>
                                <p className={Styles.categoryName}>books</p>
                            </div>
                            <div className={Styles.categorySet}>
                                <input type='radio' name='category' id='electronics' value='1' ref={register} required />
                                <p className={Styles.categoryName}>electronics</p>
                            </div>
                            <div className={Styles.categorySet}>
                                <input type='radio' name='category' id='furniture' value='3' ref={register} required/>
                                <p className={Styles.categoryName}>furniture</p>
                            </div>
                            <div className={Styles.categorySet}>
                                <input type='radio' name='category' id='tools' value='4' ref={register} required/>
                                <p className={Styles.categoryName}>tools</p>
                            </div>
                        </div>
                        <p className={Styles.upload}>Uplaod profile image</p>
                        <input name='file' style={Styles.uploadImage} type="file" ref={register} required />
                        <input name='price' type='text' placeholder='price' ref={register} required />
                        <input name='year' type='text' placeholder='year' ref={register} required />
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

export default Sell;
