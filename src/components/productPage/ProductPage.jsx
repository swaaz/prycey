import React from 'react'
import Navbar from '../navbar/Navbar';
import Styles from './styles.module.scss';
import Product from '../../assets/products/1.jpg';
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
                </div>
                <div className={Styles.right}>
                    <img className={Styles.image} src={Product}/>
                </div>
            </div>
        </div>
    )
}

export default ProductPage;
