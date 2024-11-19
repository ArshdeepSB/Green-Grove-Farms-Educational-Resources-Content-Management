import React from "react";
import { Button } from "../../components/common/Button";
import './styles.css';
import { Link } from "react-router-dom";





function HomePage() {
    return (
      <div className='hero-container'>
        <video src='/videos/HomeVid.mp4' autoPlay loop muted />
        <h1>Green Farms Educational Platform.</h1>
        <p>Growing Knowledge, Cultivating Success: Your Gateway to Smarter Farming.</p>
        <div className='hero-btns'>
            <Link to='/ResourcesLibrary'>
          <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
          >
            GET STARTED
          </Button>
          </Link>
          
        </div>
      </div>
      
    );
  }
  
  export default HomePage;