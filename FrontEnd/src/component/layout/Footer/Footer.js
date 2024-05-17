import React from 'react'
import './Footer.css'
import playstore from '../../../images/playstore.png'
import appstore from '../../../images/appstore.png'

const Footer = () => {
    return (
        <footer id='footer'>
        
            <div className="leftFooter">
                <h4>Download Our APP</h4>
                <p>Download App For Android and IOS mobile phones</p>
                <img src={playstore} alt="Playstore" />
                <img src={appstore} alt="Appstore" />
            </div>

            <div className="midFooter">
                <h4>E-Commerce</h4>
                <p>High Quality is our first priority</p>
                <p>Copyrights 2023 &copy; UsmanAhmad </p>
            </div>

            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="/">Instagram</a>
                <a href="/">Facebook</a>
                <a href="/">Youtube</a>
            </div>

        </footer>
    )
}

export default Footer
