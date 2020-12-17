import React from 'react'
import Navbar from '../navbar/Navbar';
import Styles from './styles.module.scss';
import Avatar from '../../assets/avatar/Sheik.png';
function Signup() {
    return (
        <div className={Styles.signUp}>
            <Navbar />
            <div className={Styles.body}>
               <div className={Styles.content} >
                   <h1>Hey there!</h1>
                   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nam ipsum distinctio vitae quas ex officiis, magnam voluptates aperiam accusantium!</p>
               </div>
               <div className={Styles.form}>
                    <form>
                        <h1>Sign Up</h1>
                        <input type='text' placeholder='username' />
                        <input type='text' placeholder='full name' />
                        <input type='text' placeholder='email id' />
                        <input type='text' placeholder='contact number' />
                        <input type='password' placeholder='password'/>
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
