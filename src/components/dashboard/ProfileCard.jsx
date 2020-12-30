import React from 'react';
import Styles from './styles.module.scss';
import Star from '../../assets/icons/white_star.png';

function ProfileCard(props) {
    return (
        <div className={Styles.cardProfile}>
            <img className={Styles.profileImage} src={props.profile} alt='profile' />
            <p>{props.name}</p>
            <div className={Styles.reviewRow}>
                <p className={Styles.ratingNumber}>
                    {props.rating}
                    
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
            </div>
        </div>
    );
}

export default ProfileCard;
