import "bootstrap/dist/css/bootstrap.min.css"
import "./About.css";
// import Bruh from '../hurb-logo/CCU02780.JPG';

export default function About(){
    return (
        <>
        <div className="container-fluid text-center mb-5">
            <span className="text">MOCK UP ECOMMERCE</span>
            <img src={''} alt="" className="img" />
        </div>

        <div className="container-fluid text-center d-flex justify-content-center flex-column align-items-center aboutText">
            <span>( About )</span>
            <span className="about-text">Lorem ipsum dolor sit amet consectetur. In maecenas vulputate velit tellus. Quisque scelerisque netus metus accumsan bibendum.</span>
        </div>

        <div className="container-fluid d-flex justify-content-center gap-3">
            <img src="" className="img2" id="img-down" />
            <img src="" className="img2"  id="img-up"/>
        </div>

        <div className="text-wrap span2">
            Lorem ipsum dolor sit amet consectetur. Sem nibh ridiculus consequat gravida at cras eleifend.
        </div>
    

        {/* Team Section */}
        <div className="container-fluid" id="teamSection">
            <h1 id="teamtxt">The Developers</h1>
            <div className="row d-flex justify-content-evenly mb-5">
            <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
        <div className="carousel-indicators mt-5">
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
        </div>
    <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="50000">
            <div className="container mb-5">
                <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-auto">
                        <div className="card" id="cardGoal">
                            <div className="card-body">
                                <h5 className="card-title">Card title1</h5>
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
                                <h5 className="card-title">Card title2</h5>
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
                                <h5 className="card-title">Card title3</h5>
                                <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" className="card-link">Card link</a>
                                <a href="#" className="card-link">Another link</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/* <div className="carousel-caption d-none d-md-block mt-5">
            <h1>hi</h1>
        </div> */}
        </div>
        <div className="carousel-item" data-bs-interval="2000">
            <div className="container mb-5">
                    <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-auto">
                            <div className="card" id="cardGoal">
                                <div className="card-body">
                                    <h5 className="card-title">Card title4</h5>
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
                                        <h5 className="card-title">Card title5</h5>
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
                                        <h5 className="card-title">Card title66</h5>
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
            Lorem ipsum dolor sit amet consectetur.  Vitae elementum malesuada montes ultrices sagittis venenatis.
        </div>

        <div className="container-fluid text-center mb-5">
            <span id="spanGoal">GOALS FOR THE BUSINESS/TEAM/OR UNSA???</span>
        </div>

        <div className="container" id="goalContainer">
            <div className="row d-flex justify-content-center mb-5">
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
     </>
        
    );
}