import React from 'react';
import Styles from './styles.module.scss';
import Star from '../../assets/icons/purple_star.png';

function profileCard() {
    return (
        <div className={Styles.cardProfile}>
            <img className={Styles.profileImage} src='https://avatars1.githubusercontent.com/u/42874695?s=460&u=5270b0013aa377093ddd4e4ba44a7723102621b8&v=4' alt='profile' />
            <p>Swasthik Shetty</p>
            <div className={Styles.reviewRow}>
                <p className={Styles.ratingNumber}>
                    {/* {details.rating} */}
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
                <p className={Styles.reviewValue}>11 Reviews</p>
                                   
            </div>
        </div>
    )
}

export default profileCard;
