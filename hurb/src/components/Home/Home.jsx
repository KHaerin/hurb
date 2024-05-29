import {Link} from 'react-router-dom';
import React, { useState, useEffect } from "react";
import './Home.css';
import Nature from '../icons/nature-landing.jpg';
import Men from '../icons/model men.jpg';
import Women from '../icons/model women.jpg';
import Clothes from '../icons/clothes.jpg';
import Labor from '../icons/labor.jpg';
export default function Home(){

    const goShop = () => {
        window.location.href="/shop";
    }
    
    
    return( 

        <>
            <div className="container-fluid" id="home-page">
                <div className="row pt-5 row-cols-2">
                    <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center" id="text-home">
                        <span id="spice-txt">
                            Spice Up Your Style,
                            Shop with Confidence!
                        </span>
                        <span id="spice-details" className='mb-5'>
                        Embark on a fashion journey with a conscience at Hurb, where style seamlessly integrates with sustainability. Explore our thoughtfully curated collections for men, women, and kids, crafted with eco-friendly materials and practices. Every garment at Hurb not only exudes fashion-forward aesthetics but also champions environmental responsibility. Join us in our commitment to a greener future as you indulge in trendsetting pieces that prioritize both style and sustainability. At Hurb, fashion meets eco-consciousness for a wardrobe that looks good and does good.
                        </span>
                        <div className="button-contain d-flex justify-content-center">
                            <button className='btn btn-dark' id="exploreBtn" onClick={goShop}>Start Exploring</button>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-10" id="home-img-container">
                        <img src={Nature} alt="" id="home-first-img"/>
                    </div>
                </div>
            </div>
            <div className="container-fluid mt-5 mb-5">
                <div className="row">
                    <div className="col">
                        <div className="container d-flex flex-column gap-5" >
                            <div className="row">
                                <div className="col">
                                    <div className="container" id="menCollect">
                                    <div className="row d-flex flex-column p-5">
                                        <div className="col mb-3">
                                            <span id="collection-text"><span id="mens-text">Men's</span> <br/>Collection</span>
                                        </div>
                                        <div className="col">
                                            <button className='btn btn-dark' id="shop_now-btn" onClick={goShop}>Shop Now</button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                    <div className="container" id="labor">
                                        <img src={Labor} alt="" id="labor"/>
                                </div>
                            </div>
                          
                        </div>
                    </div>
                    <div className="col">
                        <div className="container d-flex flex-column ">
                            <div className="row">
                                <div className="col">
                                        <div className="container" id="lateTrends">
                                        <div className="row p-5 d-flex flex-column">
                                            <div className="col">
                                                <span id="collection-text-late">LATE TRENDS</span>
                                            </div>
                                            <div className="col">
                                                <button className='btn btn-dark' id="shop_now-btn" onClick={goShop}>Shop Now</button>
                                            </div>
                                        </div>             
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="container" id="womenCollect">
                                        <div className="row p-3 d-flex flex-column">
                                            <div className="col mb-4">
                                                <span id="collectionW-text"><span id="womens-text">Women's</span><br/>Collection</span>
                                            </div>
                                            <div className="col">
                                                <button className='btn btn-dark' id="shop_now-btn" onClick={goShop}>Shop Now</button>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="container-fluid p-5" id="top-products-container">
                <div className="row pb-5">
                    <div className="col d-flex justify-content-center">
                        <h1>TOP PRODUCTS</h1>
                    </div>
                </div>
                <div className="row pb-5">
                    <div className="container">
                        <div className="row d-flex justify-content-evenly">
                            <div className="col-auto">
                                <div className="card" id="cardGoal">
                                        <div className="card-body">
                                            <h5 className="card-title">Card title</h5>
                                            <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            <a href="#" className="card-link">Card link</a>
                                            <a href="#" className="card-link">Another link</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                <div className="card" id="cardGoal">
                                        <div className="card-body">
                                            <h5 className="card-title">Card title</h5>
                                            <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            <a href="#" className="card-link">Card link</a>
                                            <a href="#" className="card-link">Another link</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                <div className="card" id="cardGoal">
                                        <div className="card-body">
                                            <h5 className="card-title">Card title</h5>
                                            <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            <a href="#" className="card-link">Card link</a>
                                            <a href="#" className="card-link">Another link</a>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>     
                </div>
            </div> */}
        </>

    )
}