import React, {useState, useEffect} from 'react'
import Navbar from '../navbar/Navbar';
import Styles from './styles.module.scss';
import Product from '../../assets/products/1.jpg';
import Call  from '../../assets/icons/call.png';
import axios from 'axios';
import Star from '../../assets/icons/star.png';
function ProductPage({match}) {
    const [values, setValues] = useState({'title' : '', 'price' : '', 'description' : '', 'review' : 0, 'rating' : 0, 'sellerName' : '' })
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
                            <p className={Styles.reviewValue}>222 Reviews</p>

                        </div>
                        
                        <div className={Styles.contactSeller}>
                            <img className={Styles.contactIcon} src={Call} alt='call' />
                            <p className={Styles.contactText}>Contact Seller</p>
                        </div>
                    </div>
                </div>
                <div className={Styles.right}>
                    <img className={Styles.image} src={Product}/>
                </div>
            </div>
        </div>
    )
}

export default ProductPage;
