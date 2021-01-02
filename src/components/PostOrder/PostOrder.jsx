import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
// {
//     'rated_id': 'johndoe',
//     'rating': 5,
//     'review': 'very good'
// }

function PostOrder(props) {
    const {register, handleSubmit} = useForm();
    console.log(props.match.params.value)

    const onSubmit = (value) =>{
        console.log(value)
        axios.post(`http://127.0.0.1:5000/rating/${props.match.params.value}`, value)
        .then(response => toast(response.data.response, {position: toast.POSITION.TOP_CENTER}))
        .catch(error => console.log(error))
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type='radio' value="1" name='star' ref={register} />
                <input type='radio' value="2" name='star' ref={register} />
                <input type='radio' value="3" name='star' ref={register}/>
                <input type='radio' value="4" name='star' ref={register} />
                <input type='radio' value="5" name='star' ref={register}/>
                <input type='text' name='review' ref={register} />
                <button type='submit' >submit</button>
            </form>

        </div>
    )
}

export default PostOrder
