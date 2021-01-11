import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import StarRating from '../StarRating/StarRating';
import Navbar from '../navbar/Navbar';
import Styles from './styles.module.scss'; 
// {
//     'rated_id': 'johndoe',
//     'rating': 5,
//     'review': 'very good'
// }

function PostOrder(props) {
    const {register, handleSubmit} = useForm();
    const [rating, setRating] = useState(0);
    const params = new URLSearchParams(props.location.search);
    const id = params.get('id');
    const seller = params.get('seller')

    console.log(props)

        useEffect(() => {
            let fd = new FormData();
            fd.append('seller', seller);
            fd.append('id', id);
            axios.post('http://127.0.0.1:5000/transact', fd)
            .then(response => console.log(response))
            .catch(error => console.log(error) )
            
        }, [])
    
    const onSubmit = (value) =>{
        console.log(value)
        let fd = new FormData();
        fd.append('review', value.review);
        fd.append('rating', rating);
        axios.post(`http://127.0.0.1:5000/rating/${seller}`, fd)
        .then(response => toast(response.data.response, {position: toast.POSITION.TOP_CENTER}))
        .catch(error => console.log(error))
    }
    return (
        <div>
            <Navbar />
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <div className={Styles.Box}>
                    <p className={Styles.Rating}>Ratings : </p>
                    <input className={Styles.Input} type='text' name='review' placeholder='Add Comment' ref={register} />
                    <p className={Styles.Message}>
                        Thanks you for showing interest!
                    </p>
                </div>
                <StarRating rating={rating} onClick={(value) => setRating(value) } />
                <div className={Styles.buttonRow}>
                    <button className={Styles.Button} type='submit' >submit</button>
                </div>
            </form>
        </div>
    )
}

export default PostOrder
