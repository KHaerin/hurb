import "bootstrap/dist/css/bootstrap.min.css"
import "./About.css";
import React, { useState, useEffect } from 'react';
import Bruh from '../hurb-logo/CCU02780.png';
import HurbLogo from '../hurb-logo/hurb logo files-04.png';
import Bruh1 from '../hurb-logo/CCU02791.png';
import Bruh2 from '../hurb-logo/CCU02789.png';
import Bruh3 from '../hurb-logo/CCU02761.png';
import Angeloy from '../hurb-logo/angeloy.png';
import AngeloSmile from '../hurb-logo/angeloysmile.png';
import RoliNoSmile from '../hurb-logo/rolinosmile.png';
import RoliSalute from '../hurb-logo/rolisalute.png';

export default function About(){


    const profile = {
        width: '40px',
        height: '30px'
    }

    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
        <div className="container-fluid text-center mb-5">
            <span className="text">ABOUT THE WEBSITE</span>
            <div className="d-flex justify-content-center align-items-center">
                <img src={HurbLogo} alt="" className="img object-fit-cover p-5" />
            </div>
            
        </div>

        <div className="container-fluid text-center d-flex justify-content-center flex-column align-items-center aboutText">
            <span>( About )</span>
            <span className="about-text">
            Elevating Fashion with <br></br>Style, Quality, and Uniqueness. 
            </span>
        </div>

        <div className="container-fluid d-flex justify-content-center gap-3">
            <img src="" className="img2" id="img-down" />
            <img src="" className="img2"  id="img-up"/>
        </div>

        <div className="text-wrap span2 mx-4">
        Just like herbs add zest to dishes, Hurb adds style, quality, and uniqueness to your wardrobe. Elevate your look with us today.
        </div>
    

        {/* Team Section */}
        <div className="container-fluid" id="teamSection">
            <h1 id="teamtxt">The Developers</h1>
            <div className="row d-flex justify-content-evenly mb-5">
                {/* data-bs-ride="carousel" */}
            <div id="carouselExampleDark" className="carousel carousel-dark slide" >
        <div className="carousel-indicators mt-5">
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
        </div>
        <div className="carousel-inner">
            {/* data-bs-interval="1000" */}
            <div className="carousel-item active" > 
                <div className="container-fluid mb-5">
                    <div className="row d-flex justify-content-center gap-4 align-items-center">
                        <div className="col-auto">
                            <div className="team-card rounded p-4">
                                <div className="container-fluid position-relative">
                                    <div className="row">
                                        <div className="col d-flex justify-content-center">
                                            <h1 id="roleText">PROJECT MANAGER</h1>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col d-flex justify-content-center align-items-center">
                                            <h1 id="barcodetext">BRUHCODE</h1>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col d-flex justify-content-center align-items-center">
                                            <h1 id="bruhBack">BRUHCODE</h1>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col d-flex justify-content-center align-items-center" id="team-image-container">
                                        <img
                                            src={isHovered ? RoliSalute : RoliNoSmile} 
                                            alt=""
                                            
                                            id="team-image"
                                            onMouseEnter={() => setIsHovered(true)} 
                                            onMouseLeave={() => setIsHovered(false)}
                                        />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <div className="col-auto">
                            <div className="team-card rounded p-4">
                                <div className="container-fluid position-relative">
                                    <div className="row">
                                        <div className="col d-flex justify-content-center">
                                            <h1 id="roleText">FULL STACK DEVELOPER</h1>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col d-flex justify-content-center align-items-center">
                                            <h1 id="barcodetext">BRUHCODE</h1>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col d-flex justify-content-center align-items-center">
                                            <h1 id="bruhBack">BRUHCODE</h1>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col d-flex justify-content-center align-items-center" id="team-image-container">
                                        <img
                                            src={isHovered ? AngeloSmile : Angeloy} 
                                            alt=""
                                            
                                            id="team-image"
                                            onMouseEnter={() => setIsHovered(true)} 
                                            onMouseLeave={() => setIsHovered(false)}
                                        />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <div className="col-auto">
                            <div className="team-card rounded p-4">
                                <div className="container-fluid position-relative">
                                    <div className="row">
                                        <div className="col d-flex justify-content-center">
                                            <h1 id="roleText">FULL STACK DEVELOPER</h1>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col d-flex justify-content-center align-items-center">
                                            <h1 id="barcodetext">BRUHCODE</h1>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col d-flex justify-content-center align-items-center">
                                            <h1 id="bruhBack">BRUHCODE</h1>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col d-flex justify-content-center align-items-center" id="team-image-container">
                                        <img
                                            src={isHovered ? RoliSalute : RoliNoSmile} 
                                            alt=""
                                            
                                            id="team-image"
                                            onMouseEnter={() => setIsHovered(true)} 
                                            onMouseLeave={() => setIsHovered(false)}
                                        />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
            <div className="carousel-item" > 
                <div className="container mb-5">
                    <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-auto">
                            <div className="team-card rounded p-4">
                                <div className="container-fluid position-relative">
                                    <div className="row">
                                        <div className="col d-flex justify-content-center">
                                            <h1 id="roleText">FULL STACK DEVELOPER</h1>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col d-flex justify-content-center align-items-center">
                                            <h1 id="barcodetext">BRUHCODE</h1>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col d-flex justify-content-center align-items-center">
                                            <h1 id="bruhBack">BRUHCODE</h1>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col d-flex justify-content-center align-items-center" id="team-image-container">
                                        <img
                                            src={isHovered ? RoliSalute : RoliNoSmile} 
                                            alt=""
                                            
                                            id="team-image"
                                            onMouseEnter={() => setIsHovered(true)} 
                                            onMouseLeave={() => setIsHovered(false)}
                                        />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <div className="col-auto">
                            <div className="team-card rounded p-4">
                                <div className="container-fluid position-relative">
                                    <div className="row">
                                        <div className="col d-flex justify-content-center">
                                            <h1 id="roleText">FULL STACK DEVELOPER</h1>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col d-flex justify-content-center align-items-center">
                                            <h1 id="barcodetext">BRUHCODE</h1>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col d-flex justify-content-center align-items-center">
                                            <h1 id="bruhBack">BRUHCODE</h1>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col d-flex justify-content-center align-items-center" id="team-image-container">
                                        <img
                                            src={isHovered ? RoliSalute : RoliNoSmile} 
                                            alt=""
                                            
                                            id="team-image"
                                            onMouseEnter={() => setIsHovered(true)} 
                                            onMouseLeave={() => setIsHovered(false)}
                                        />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <div className="col-auto">
                            <div className="team-card rounded p-4">
                                <div className="container-fluid position-relative">
                                    <div className="row">
                                        <div className="col d-flex justify-content-center">
                                            <h1 id="roleText">FULL STACK DEVELOPER</h1>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col d-flex justify-content-center align-items-center">
                                            <h1 id="barcodetext">BRUHCODE</h1>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col d-flex justify-content-center align-items-center">
                                            <h1 id="bruhBack">BRUHCODE</h1>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col d-flex justify-content-center align-items-center" id="team-image-container">
                                        <img
                                            src={isHovered ? RoliSalute : RoliNoSmile} 
                                            alt=""
                                            
                                            id="team-image"
                                            onMouseEnter={() => setIsHovered(true)} 
                                            onMouseLeave={() => setIsHovered(false)}
                                        />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
            </div>
        </div>
        {/* END OF TEAM CARD */}


        <div className="goalsText text-wrap">
            BruhCode Namba WAN!! 
        </div>

        <div className="container" id="goalContainer">
            <div className="row d-flex justify-content-center">
            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="3000">
                    <img src={Bruh3} className="d-block w-100 rounded" alt="..."/>
                    </div>
                    <div className="carousel-item " data-bs-interval="2000">
                        <img src={Bruh} className="d-block w-100 rounded" alt="..."/>
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                    <img src={Bruh1} className="d-block w-100 rounded" alt="..."/>
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                    <img src={Bruh2} className="d-block w-100 rounded" alt="..."/>
                    </div>
                </div>
                </div>
            </div>
        </div>   
     </>
        
    );
}