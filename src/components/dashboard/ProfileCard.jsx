import React from 'react';
import Styles from './styles.module.scss';
import Star from '../../assets/icons/purple_star.png';

function ProfileCard(props) {
    return (
        <div className={Styles.cardProfile}>
            <img className={Styles.profileImage} src={props.profile} alt='profile' />
            <p className={Styles.profileName}>{props.name}</p>
            <div className={Styles.reviewRows}>
                <p className={Styles.ratingNumbers}>
                    {props.rating}
                    
                    <img className={Styles.ratingStars} src={Star} alt='star' />
                </p>
                <p className={Styles.divider}> | </p>
                <p className={Styles.reviewStar}>
                {Array(parseInt(props.rating))
                .fill()
                .map((_, i) => (
                <img className={Styles.ratingStars} src={Star} alt='star' />
                ))}
                </p>                                 
            </div>
        </div>
    );
}

export default ProfileCard;
