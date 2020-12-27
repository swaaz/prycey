import React from 'react';
import Navbar from '../navbar/Navbar';
import Styles from './styles.module.scss';
import Star from '../../assets/icons/purple_star.png';
import Cards from './Cards';
import Image from '../../assets/products/1.jpg';


function Dashboard() {
    return (
        <div className={Styles.dashboard}>
            <Navbar />
            <div className={Styles.body}>
                <div className={Styles.dashboardPanel}>
                    <h1 className={Styles.heading}>Dashboard</h1>

                    <div className={Styles.content} >

                        <div className={Styles.imageSection}>
                                <img className={Styles.image} src='https://avatars1.githubusercontent.com/u/42874695?s=400&u=5270b0013aa377093ddd4e4ba44a7723102621b8&v=40' alt='profile image' />
                        </div>
                        <div className={Styles.profileContent}>
                            <p className={Styles.username}>Swasthik</p>
                            <p className={Styles.username}>Shetty</p>

                        <div className={Styles.reviewRow}>
                                <p className={Styles.ratingNumber}>
                                    {/* {values.rating} */}
                                    10
                                    <img className={Styles.ratingStar} src={Star} alt='star' />
                                </p>
                                <p> | </p>
                                <p className={Styles.reviewStar}>
                                    {Array(parseInt(3))
                                    .fill()
                                    .map((_, i) => (
                                    <img className={Styles.ratingStar} src={Star} alt='star' />
                                    ))}
                                </p>
                                <p> | </p>
                                <p className={Styles.reviewValue}>222 Reviews</p>

                            </div>
                        </div>
                    </div>
                </div>
                <h1 className={Styles.sideHeading}>My posts</h1>
                <div className={Styles.cards}>
                    <Cards title='project title' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore sed est, voluptatibus explicabo quo dolorem autem facer' image={Image} price='9999' />
                    <Cards title='project title' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore sed est, voluptatibus explicabo quo dolorem autem facer' image={Image} price='9999' />
                    <Cards title='project title' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore sed est, voluptatibus explicabo quo dolorem autem facer' image={Image} price='9999' />                   
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
