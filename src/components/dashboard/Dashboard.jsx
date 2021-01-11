import React, {useState, useEffect} from 'react';
import Navbar from '../navbar/Navbar';
import Styles from './styles.module.scss';
import Star from '../../assets/icons/purple_star.png';
import Cards from './Cards';
import axios from 'axios';
import ProfileCard from './ProfileCard';
import { Link , useHistory} from 'react-router-dom';
function Dashboard() {
    const [details, setDetails] = useState({'userId' : '', 'firstName' : '' , 'lastName' : '' , 'rating' : 0, 'review' : '' });
    const [posts, setPosts] = useState([]);
    const [ratings, setRatings] = useState([]);
    const history = useHistory();
    useEffect(() => {
       axios.get('http://127.0.0.1:5000/dashboard')
       .then( value => {
        console.log(value);
           if (value.data.response == 'Please Sign in'){
            history.push('/signin')
           }
           else {
            setDetails({
                ...details,
                ['userId'] : value.data.user_id,
                ['firstName'] : value.data.fname,
                ['lastName'] : value.data.lname,
                ['rating'] : value.data.rating,
                ['review'] : value.data.no_of_ratings,
                ['profile'] : value.data.profile_image   
            })
            setPosts(value.data.posts)
            setRatings(value.data.ratings)
            console.log(value);
           }
       })
       .catch( error => console.log(error))
    }, [posts])

    

    return (
        <div className={Styles.dashboard}>
            <Navbar />
            <div className={Styles.body}>
                <div className={Styles.dashboardPanel}>
                    <h1 className={Styles.heading}>Dashboard</h1>

                    <div className={Styles.content} >

                        <div className={Styles.imageSection}>
                                <img className={Styles.image} src={`../uploads/profile/${details.profile}`} alt='profile image' />
                        </div>
                        <div className={Styles.profileContent}>
                            <p className={Styles.username}>{details.firstName}</p>
                            <p className={Styles.username}>{details.lastName}</p>

                        <div className={Styles.reviewRow}>
                                <p className={Styles.ratingNumber}>
                                    {details.rating}
                                    
                                    <img className={Styles.ratingStar} src={Star} alt='star' />
                                </p>
                                <p> | </p>
                                <p className={Styles.reviewStar}>
                                {Array(parseInt(details.rating))
                                .fill()
                                .map((_, i) => (
                                <img className={Styles.ratingStar} src={Star} alt='star' />
                                ))}
                                </p>
                                <p> | </p>
                                <p className={Styles.reviewValue}>{details.review} Reviews</p>
                                   
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className={Styles.sideHeading}>My Posts</h1>
                

                <div className={Styles.cards}>
                    {
                        posts.map( (data) =>  <Cards to={`/product/${data.item_id}`} key={data.item_id} itemId={data.item_id} title={data.title} description={data.description} image={`uploads/product/${data.im1}`} price={data.price}  />)
                        // {
                            // return(
                            // <Link key={data.item_id} >
                                //  <Cards to={`/product/${data.item_id}`} key={data.item_id} itemId={data.item_id} title={data.title} description={data.description} image={`uploads/product/${data.im1}`} price={data.price}  />
                            // </Link>
                            // );
                        // }
                        // )
                    }
                    
                   
                </div>
                <h1 className={Styles.sideHeading}>My Reviews</h1>
                <div className={Styles.profileCards}>
                    {
                        ratings.map ((data) => <ProfileCard key={data.user_id} name={data.name} profile='https://avatars1.githubusercontent.com/u/42874695?s=400&u=5270b0013aa377093ddd4e4ba44a7723102621b8&v=40' rating={data.rating} /> )
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
