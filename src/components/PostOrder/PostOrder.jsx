import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import StarRating from '../StarRating/StarRating';
// {
//     'rated_id': 'johndoe',
//     'rating': 5,
//     'review': 'very good'
// }

function PostOrder(props) {
    const {register, handleSubmit} = useForm();
    const [rating, setRating] = useState(null);
    const params = new URLSearchParams(props.location.search);
    const id = params.get('id');
    const seller = params.get('seller')

    console.log(props)

    useEffect(() => {
        
        console.log(seller)
        
    }, [])
    
    const onSubmit = (value) =>{
        console.log(value)
        let fd = new FormData();
        fd.append('review', value.review);
        fd.append('rating', rating);
        // axios.post(`http://127.0.0.1:5000/rating/${props.match.params}`, fd)
        // .then(response => toast(response.data.response, {position: toast.POSITION.TOP_CENTER}))
        // .catch(error => console.log(error))
    }
    return (
        <div>
            <StarRating rating={rating} onClick={(value) => setRating(value) } />
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <input type='text' name='review' ref={register} />
                <button type='submit' >submit</button>
            </form>
       
        </div>
    )
}

export default PostOrder
