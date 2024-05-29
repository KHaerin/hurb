import "bootstrap/dist/css/bootstrap.min.css"
import "./About.css";
import React, { useState, useEffect } from 'react';
import Bruh from '../hurb-logo/CCU02780.png';
import HurbLogo from '../hurb-logo/hurb logo files-04.png';
import Bruh1 from '../hurb-logo/CCU02791.png';
import Bruh2 from '../hurb-logo/CCU02789.png';
import Bruh3 from '../hurb-logo/CCU02761.png';
import Angeloy from './TeamImage/angelu.png';
import AngeloSmile from './TeamImage/angelosmile.png';
import RoliNoSmile from './TeamImage/roli.png';
import RoliSalute from './TeamImage/roli salute.png';
import Kerry from './TeamImage/kerry.png';
import KerrySmile from './TeamImage/kerrysmile.png';
import Yoyo from './TeamImage/yoyo.png';
import YoyoSh from './TeamImage/yoyoshh.png';
import Leo from './TeamImage/leo.png';
import LeoPeace from './TeamImage/leopeace.png';
import Kol from './TeamImage/kol.png';
import KolSmile from './TeamImage/kolsmile.png';
import BruhCode1 from './TeamImage/bruhcode1logofinal.png';
import BruhCode2 from './TeamImage/bruhcode2logofinal.png';
import Chapter1BC from './TeamImage/bcc1.png';
import Chapter1BC_2 from './TeamImage/bcc1-2.png';

export default function About(){


    const profile = {
        width: '40px',
        height: '30px'
    }

    const [isHovered, setIsHovered] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const teamData = [
        { role: "PROJECT MANAGER", name: "BRUHCODE", image: Kol, hoveredImage: KolSmile },
        { role: "FULL STACK DEVELOPER", name: "BRUHCODE", image: Angeloy, hoveredImage: AngeloSmile },
        { role: "BACK END DEVELOPER", name: "BRUHCODE", image: Yoyo, hoveredImage: YoyoSh },
    ];

    const teamData2 = [
        { role: "UI/UX Designer", name: "BRUHCODE", image: Kerry, hoveredImage: KerrySmile },
        { role: "FRONT END DEVELOPER", name: "BRUHCODE", image: RoliNoSmile, hoveredImage: RoliSalute},
        { role: "DOCUMENTATION", name: "BRUHCODE", image: Leo, hoveredImage: LeoPeace },
    ];

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
                {teamData.map((member, index) => (
                    <div className="col-auto" key={index}>
                             <div
                            className="team-card rounded p-4"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="container-fluid position-relative">
                                <div className="row">
                                    <div className="col d-flex justify-content-center">
                                        <h1 id="roleText">{member.role}</h1>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col d-flex justify-content-center align-items-center">
                                        <h1 id="barcodetext">{member.name}</h1>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col d-flex justify-content-center align-items-center">
                                        <h1 id="bruhBack">{member.name}</h1>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col d-flex justify-content-center align-items-center" id="team-image-container">
                                        <img
                                            src={index === hoveredIndex ? member.hoveredImage : member.image}
                                            alt=""
                                            id="team-image"
                                           
                                        />
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div> 
                         ))} 
                    </div>
                    <div className="row d-flex justify-content-center gap-4 align-items-center">    
                    </div>
                </div>
            </div>
            <div className="carousel-item " > 
                <div className="container-fluid mb-5">
                <div className="row d-flex justify-content-center gap-4 align-items-center">
                    {teamData2.map((member, index) => (
                    <div className="col-auto" key={index}>
                             <div
                                className="team-card rounded p-4"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                            <div className="container-fluid position-relative">
                                <div className="row">
                                    <div className="col d-flex justify-content-center">
                                        <h1 id="roleText">{member.role}</h1>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col d-flex justify-content-center align-items-center">
                                        <h1 id="barcodetext">{member.name}</h1>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col d-flex justify-content-center align-items-center">
                                        <h1 id="bruhBack">{member.name}</h1>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col d-flex justify-content-center align-items-center" id="team-image-container">
                                        <img
                                            src={index === hoveredIndex ? member.hoveredImage : member.image}
                                            alt=""
                                            id="team-image"
                                           
                                        />
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div> 
                         ))} 
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

        <div className="container mb-5">
            <div className="row">
                <div className="col d-flex gap-3 justify-content-center align-items-center">
                    <img src={BruhCode1} alt="" id="bruhcode"/>
                    <h1><strong>The BruhCode Company</strong></h1>
                    <img src={BruhCode2} alt="" id="bruhcode"/>
                </div>
            </div>
        </div>
        <div className="container" id="goalContainer">
            <div className="row d-flex justify-content-center align-items-center" >
                <div className="col-auto p-5 rounded" id="bruh-container">
                    <div  className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active"  data-bs-interval="3000">
                                <img src={Chapter1BC_2} className="d-block w-100 rounded" alt="..."/>
                            </div>
                            <div className="carousel-item "  data-bs-interval="3000">
                                <img src={Bruh} className="d-block w-100 rounded" alt="..."/>
                            </div>
                            <div className="carousel-item"  data-bs-interval="3000">
                                <img src={Bruh1} className="d-block w-100 rounded" alt="..."/>
                            </div>
                            <div className="carousel-item"  data-bs-interval="3000">
                                <img src={Bruh2} className="d-block w-100 rounded" alt="..."/>
                            </div>
                            <div className="carousel-item "  data-bs-interval="3000">
                                <img src={Chapter1BC} className="d-block w-100 rounded" alt="..."/>
                            </div>  
                            <div className="carousel-item "  data-bs-interval="3000">
                                <img src={Bruh3} className="d-block w-100 rounded" alt="..."/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>   
     </>
        
    );
}