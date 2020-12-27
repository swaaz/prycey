import React from 'react';
import Navbar from '../navbar/Navbar';
import Styles from './styles.module.scss';
import Star from '../../assets/icons/white_star.png';
import Image from '../../assets/products/1.jpg';


function sellerInfo() {
    return (
        <div className={Styles.sellerInfo}>
            <Navbar/>
            <div className={Styles.body}>
               <div className={Styles.content} >
                   <div className={Styles.imageSection}>
                        <img className={Styles.image} src='https://avatars1.githubusercontent.com/u/42874695?s=400&u=5270b0013aa377093ddd4e4ba44a7723102621b8&v=40' alt='profile image' />
                   </div>
                   <div className={Styles.profileContent}>
                       <p className={Styles.username}>Swasthik</p>
                       <p className={Styles.username}>Shetty</p>

                       <div className={Styles.reviewRow}>
                            <p className={Styles.ratingNumber}>
                                {/* {values.rating} */}
                                10
                                <img className={Styles.ratingStar} src={Star} alt='star' />
                            </p>
                            <p> | </p>
                            <p className={Styles.reviewStar}>
                                {Array(parseInt(3))
                                .fill()
                                .map((_, i) => (
                                <img className={Styles.ratingStar} src={Star} alt='star' />
                                ))}
                            </p>
                            <p> | </p>
                            <p className={Styles.reviewValue}>222 Reviews</p>

                        </div>
                   </div>
               </div>
               <div className={Styles.form}>
                        <h1>Seller Details</h1>
                        <p>Swasthik Shetty</p>
                        <p>swaasthik.shetty07@gmail.com</p>
                        <p>+91 81971 31451</p>
               </div>
               
            </div>
        </div>
    )
}

export default sellerInfo;
