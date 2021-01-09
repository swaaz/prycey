import React, {useEffect, useState} from 'react';
import Navbar from '../navbar/Navbar';
import Styles from './styles.module.scss';
import Star  from "../../assets//icons/white_star.png";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useHistory } from 'react-router-dom';



function UpdateProduct(props) {
    const [product, setProduct] = useState({ 'title' : '', 'description': '', 'price' : 0, 'year' : 0, 'category': '', 'img': ''});
    const history = useHistory();
    useEffect(() => {
       axios.get(`http://127.0.0.1:5000/product/${props.match.params.value}`)
       .then( response => {
           setProduct({
               ...product,
               ['title'] : response.data.title,
               ['description'] : response.data.description,
               ['price'] : response.data.price,
               ['year'] : response.data.year,
               ['category'] : response.data.category,
               ['img'] : response.data.im1
           })
       })
       .catch( error => console.log(error))

    }, [])
    const onSubmit= (e) => {
        e.preventDefault();
        console.log(product);
        axios.post(`http://127.0.0.1:5000/product/edit/${props.match.params.value}`, product)
        .then( response => {
            toast(response.data.response, {position: toast.POSITION.TOP_CENTER})
            history.push('/dashboard')
        })
        .catch( error => console.log(error))
    }
    return (
        <div className={Styles.updateProduct}>
            <Navbar/>
            <div className={Styles.body}>
               <div className={Styles.content} >
                    <img className={Styles.image} src={`../../../uploads/product/${product.img}`} alt='Product Image' />

               </div>
               <div className={Styles.form}>
                    <form onSubmit={onSubmit}>
                        <h1>Profile</h1>
                        <p className={Styles.label}>Title</p>
                        <input type='text' value={product.title} name='title' onChange={ e => setProduct({...product, ['title'] : e.target.value})} />
                        <p className={Styles.label}>Description</p>
                        <input type='text' value={product.description} name='description' onChange={ e => setProduct({...product, ['description'] : e.target.value})} />
                        <p className={Styles.label}>Price</p>
                        <input type='text' value={product.price} name='price' onChange={ e => setProduct({...product, ['price'] : e.target.value})} />
                        <p className={Styles.label}>Year</p>
                        <input type='text' value={product.year} name='year' onChange={ e => setProduct({...product, ['year'] : e.target.value})} />
                        <p className={Styles.label}>Category</p>
                        <input type='text' value={product.category} name='category' readOnly/>     
                        <button type='submit'>submit</button>   
                    </form>
               </div>
               
            </div>
            
        </div>
    )
}

export default UpdateProduct
