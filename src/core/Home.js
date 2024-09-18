import React from 'react'
import Posts from '../post/Posts'
import Picture from '../images/spotifood.jpg'

const Home = () => (
    <div>
        {/* <div className="jumbotron">
            <h2>Homepage</h2>
            <p className="lead">Welcome to Spotifood</p>
        </div> */}
        <div className="container">
            <Posts />
        </div>
    </div>
);


export default Home;
