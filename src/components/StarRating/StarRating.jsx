import React, {useState} from 'react';
import {FaStar} from 'react-icons/fa';
import Styles from './styles.module.scss';

const StarRating = (props) =>{
    const [hover, setHover] = useState(null);

    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label>
                        <input className={Styles.radio} type='radio' name='rating' value={ratingValue} onClick={() => props.onClick(ratingValue)} />
                        <FaStar className={Styles.star} size={100} color={ratingValue <= (hover || props.rating) ? "#ffc107" : "#e4e5e9 "} onMouseEnter={() => setHover(ratingValue)} onMouseLeave = {()=> setHover(null)} />
                    </label>
                ) ;
            })}
            
        </div>
    );
}
export default StarRating;
