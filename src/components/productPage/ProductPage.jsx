import React, {useState, useEffect} from 'react'
import Navbar from '../navbar/Navbar';
import Styles from './styles.module.scss';
import Product from '../../assets/products/1.jpg';
import Call  from '../../assets/icons/call.png';
import Close  from '../../assets/icons/close.png';
import whiteStar from '../../assets/icons/white_star.png';
import axios from 'axios';
import Star from '../../assets/icons/star.png';
import Modal from 'react-modal';
import Buy from '../../assets/icons/white_buy.png';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

function ProductPage({match}) {
    const [values, setValues] = useState({'title' : '', 'price' : '', 'description' : '', 'review' : 0, 'rating' : 0, 'sellerName' : '', 'year' : 0, 'category' : '', 'postedDate' : '', 'sellerId' : '' });
    const [img, setImage] = useState(''); 
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
                    ['sellerName'] : data.data.seller_name,
                    ['email'] : data.data.email,
                    ['contact'] : data.data.contact,
                    ['year'] : data.data.year,
                    ['dateAdded'] : data.data.date_added,
                    ['category'] : data.data.category,
                    ['sellerId'] : data.data.seller_id
            })

            console.log(data);
            setImage(`uploads/product/${data.data.im1}`);
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
                    <p className={Styles.category}>{values.category}</p>
                    <p className={Styles.year}>years : {values.year}</p>
                    <p className={Styles.dateAdded}>{values.dateAdded}</p>

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
                    <img src={'logo512.png'} alt='product'/>
                </div>
            </div>

            <Modal  
            isOpen={modal} 
            onRequestClose={() => setModal(false)}
            style={
                {
                    overlay:{
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    },
                    content:{
                        color: 'white',
                        background : '#3D6CB9',
                        width : '421px',
                        margin: 'auto auto',
                        display: 'flex',
                        borderRadius : '40px',
                        flexDirection: 'column',
                        textAlign : 'center',
                        height : '540px'
                    },

                }
            }
            >
                
                    {/* <div className={Styles.modalBox}> */}

                        <img onClick={(e)=> setModal(false)} style={{alignSelf : 'end', width: '30px'}}  src={Close} alt='close' />
                        <h1 style={{fontSize : '2rem'}}>Seller Details</h1>
                        <img style={{borderRadius : '50%', width: '200px', border: '5px solid white', margin: '30px auto'}} src='https://avatars1.githubusercontent.com/u/42874695?s=400&u=5270b0013aa377093ddd4e4ba44a7723102621b8&v=4' alt='profile' />
                        <p style={{fontSize: '1.7rem', fontWeight: '600'}}>{values.sellerName}</p>
                        <div style={{display : 'flex', margin: '10px auto', flexDirection: 'row', justifyContent: 'baseline'}}>
                                <p>
                                    {values.rating}
                                    <img style={{width: '17px', marginLeft: '3px'}} src={whiteStar} alt='star' />
                                </p>
                                <p style={{margin: '0 5px'}}> | </p>
                                <p >
                                    {Array(parseInt(values.rating))
                                    .fill()
                                    .map((_, i) => (
                                    <img style={{width: '17px'}} src={whiteStar} alt='star' />
                                    ))}
                                </p>
                                <p style={{margin: '0 5px'}}> | </p>
                                <p >{values.review} Reviews</p>

                            </div>
                        <p style={{fontSize: '1.1rem', margin: '10px 0'}}>E-mail : {values.email}</p>
                        <p style={{fontSize: '1.1rem', margin: '10px 0'}}>Contact : +91 {values.contact}</p>
                        <Link to={`/seller/rating/${values.sellerId}`}>
                            <img style={{width: '40px', margin : '10px auto'}} src={Buy} alt='buy' />
                        </Link>
                            
                       
                
            </Modal>
        </div>
    )
}

export default ProductPage;
