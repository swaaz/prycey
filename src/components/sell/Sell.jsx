import React from 'react';
import Styles from './styles.module.scss';
import Avatar from '../../assets/avatar/oldman.png';
import Navbar from '../navbar/Navbar';

function Sell() {
    return (
        <div className={Styles.sell}>
            <Navbar />
            <div className={Styles.body}>
               <div className={Styles.content} >
                   <h1>Hey there!</h1>
                   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nam ipsum distinctio vitae quas ex officiis, magnam voluptates aperiam accusantium!</p>
               </div>
               <div className={Styles.form}>
                    <form>
                        <h1>Sell</h1>
                        <input type='text' placeholder='title' />
                        <input type='text' placeholder='description' />
                        <p className={Styles.categoryTitle}>category</p>
                        <div className={Styles.category}>
                            <div className={Styles.categorySet}>
                                <input type='radio' name='category' id='books' value='books' />
                                <p className={Styles.categoryName}>books</p>
                            </div>
                            <div className={Styles.categorySet}>
                                <input type='radio' name='category' id='electronics' value='electronics' />
                                <p className={Styles.categoryName}>electronics</p>
                            </div>
                            <div className={Styles.categorySet}>
                                <input type='radio' name='category' id='furniture' value='furniture' />
                                <p className={Styles.categoryName}>furniture</p>
                            </div>
                            <div className={Styles.categorySet}>
                                <input type='radio' name='category' id='tools' value='tools' />
                                <p className={Styles.categoryName}>tools</p>
                            </div>
                        </div>
                        <input style={Styles.uploadImage} type="file" />
                        <input type='text' placeholder='price' />
                        <input type='text' placeholder='year' />
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
