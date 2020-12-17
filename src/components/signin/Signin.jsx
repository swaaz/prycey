import React from 'react';
import Navbar from '../navbar/Navbar';
import Styles from './styles.module.scss';
import Avatar from '../../assets/avatar/Jacob_Blake.png';


function Signin() {
    return (
        <div className={Styles.signIn}>
            <Navbar />
            <div className={Styles.body}>
               <div className={Styles.content} >
                   <h1>Hey there!</h1>
                   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nam ipsum distinctio vitae quas ex officiis, magnam voluptates aperiam accusantium!</p>
               </div>
               <div className={Styles.form}>
                    <form>
                        <h1>Sign In</h1>
                        <input type='text' placeholder='username' />
                        <input type='password' placeholder='password'/>
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
