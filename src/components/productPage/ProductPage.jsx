import React, {useState, useEffect} from 'react'
import Navbar from '../navbar/Navbar';
import Styles from './styles.module.scss';
import Product from '../../assets/products/1.jpg';
import Call  from '../../assets/icons/call.png';
import Close  from '../../assets/icons/close.png';

import axios from 'axios';
import Star from '../../assets/icons/star.png';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function ProductPage({match}) {
    const [values, setValues] = useState({'title' : '', 'price' : '', 'description' : '', 'review' : 0, 'rating' : 0, 'sellerName' : '' });
    const [modal, setModal] = useState(false);
     useEffect(() => {
        axios
        .get(`http://127.0.0.1:5000/product/${match.params.productid}`)
        // .get('https://jsonplaceholder.typicode.com/posts/1')
        .then( data =>{

            setValues({
                ...values,
                    ['title'] : data.data.title,
                    ['description'] : data.data.description,
                    ['price'] : data.data.price,
                    ['rating'] : data.data.rating,
                    ['review'] : data.data.no_of_rating,
                    ['sellerName'] : data.data.seller_name

                
            })
        })
        .catch( error => {
            console.log(error)
        })
    }, [])

    return (
        <div className={Styles.ProductPage}>
            <Navbar />
            <div className={Styles.body}>
                <div className={Styles.left}>
                    <h2 className={Styles.productTitle}>{values.title}</h2>
                    <p className={Styles.productDescription}>
                        {values.description}
                    </p>
                    <div className={Styles.priceRow}>
                        <p className={Styles.priceMrp}>
                            M.R.P :
                        </p>
                        <p className={Styles.priceValue}>
                            ₹ {values.price}
                        </p>
                    </div>

                    <div className={Styles.seller}>

                        <p className={Styles.sellerTag}>Seller</p>

                        <div className={Styles.sellerProfile}>
                            <p className={Styles.sellerName}>
                                {values.sellerName}
                            </p>
                            <img className={Styles.sellerImage} src='https://avatars1.githubusercontent.com/u/42874695?s=400&u=5270b0013aa377093ddd4e4ba44a7723102621b8&v=4' alt='product' />
                        </div>
                        
                        <div className={Styles.reviewRow}>
                            <p className={Styles.ratingNumber}>
                                {values.rating}
                                <img className={Styles.ratingStar} src={Star} alt='star' />
                            </p>
                            <p> | </p>
                            <p className={Styles.reviewStar}>
                                {Array(parseInt(values.rating))
                                .fill()
                                .map((_, i) => (
                                <img className={Styles.ratingStar} src={Star} alt='star' />
                                ))}
                            </p>
                            <p> | </p>
                            <p className={Styles.reviewValue}>{values.review} Reviews</p>

                        </div>
                        
                        <div className={Styles.contactSeller} role='button' tabIndex={0} onClick={ (e)=> setModal(true)}>
                            <img className={Styles.contactIcon} src={Call} alt='call' />
                            <p className={Styles.contactText}>Contact Seller</p>
                        </div>
                    </div>
                </div>
                <div className={Styles.right}>
                    <img className={Styles.image} src={Product}/>
                </div>
            </div>

            <Modal   isOpen={modal} onRequestClose={() => setModal(false)}>
                <div className={Styles.modalWrapper}>
                    <div className={Styles.modalBackdrop}>
                        <div className={Styles.modalBox}>

                            <img className={Styles.modalClose} src={Close} alt='close' />
                            <h1 className={Styles.modalHeader}>Seller Details</h1>
                            <img className={Styles.modalImage} src='https://avatars1.githubusercontent.com/u/42874695?s=400&u=5270b0013aa377093ddd4e4ba44a7723102621b8&v=4' alt='profile' />
                            <p className={Styles.modalName}>{values.sellerName}</p>
                            <div className={Styles.modalRow}>
                                    <p className={Styles.modalRating}>
                                        {values.rating}
                                        <img className={Styles.modalStar} src={Star} alt='star' />
                                    </p>
                                    <p> | </p>
                                    <p className={Styles.modalReviewStar}>
                                        {Array(parseInt(values.rating))
                                        .fill()
                                        .map((_, i) => (
                                        <img className={Styles.modalRatingStar} src={Star} alt='star' />
                                        ))}
                                    </p>
                                    <p> | </p>
                                    <p className={Styles.modalReviewValue}>{values.review} Reviews</p>

                                </div>
                            <p className={Styles.modalEmail}>E-mail id : swaasthik.shetty@gmail.com</p>
                            <p className={Styles.modalContact}>Contact : +91 81971 31451</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ProductPage;
