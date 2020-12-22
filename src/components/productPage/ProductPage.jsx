import React from 'react'
import Navbar from '../navbar/Navbar';
import Styles from './styles.module.scss';
import Product from '../../assets/products/1.jpg';
import Call  from '../../assets/icons/call.png';
function ProductPage() {
    return (
        <div className={Styles.ProductPage}>
            <Navbar />
            <div className={Styles.body}>
                <div className={Styles.left}>
                    <h2 className={Styles.productTitle}>Product Title</h2>
                    <p className={Styles.productDescription}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque, ex officiis veniam eligendi consectetur hic explicabo exercitationem nemo. Voluptate magni reiciendis neque amet provident soluta ea aliquam quo! Pariatur, consequatur.
                    </p>
                    <div className={Styles.priceRow}>
                        <p className={Styles.priceMrp}>
                            M.R.P :
                        </p>
                        <p className={Styles.priceValue}>
                            ₹ 420.00
                        </p>
                    </div>
                    <div className={Styles.seller}>

                        <p className={Styles.sellerTag}>Seller</p>

                        <div className={Styles.sellerProfile}>
                            <p className={Styles.sellerName}>
                                Nirmal George Mathew
                            </p>
                            <img className={Styles.sellerImage} src='https://avatars1.githubusercontent.com/u/42874695?s=400&u=5270b0013aa377093ddd4e4ba44a7723102621b8&v=4' />
                        </div>
                        
                        <div className={Styles.reviewRow}>
                            <p className={Styles.reviewStar}>*****</p>
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
