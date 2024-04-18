import "bootstrap/dist/css/bootstrap.min.css"
import "./About.css";

export default function About(){
    return (
        <>
        <div className="container-fluid text-center mb-5">
            <span className="text">MOCK UP ECOMMERCE</span>
            <img className="img"></img>
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
            <h1 id="teamtxt">Team</h1>
            <div className="row d-flex justify-content-evenly mb-5">
                <div className="col-auto">
                <div className="card" id="cardTeam">
                    <img src="..." className="card-img-top" id="cardImg-about"/>
                    <div className="card-body">
                        <h5 className="card-title">Cole Uyan</h5>
                        <p className="card-text">Lorem ipsum dolor sit amet consectetur.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                    </div>
                </div>
                <div className="col-auto">
                <div className="card" id="cardTeam">
                    <img src="..." className="card-img-top" id="cardImg-about"/>
                    <div className="card-body">
                        <h5 className="card-title">Angelu Banogbanog</h5>
                        <p className="card-text">I am gay</p>
                        <a href="#" className="btn btn-primary">Call me? :*</a>
                    </div>
                    </div>
                </div>
                <div className="col-auto d-none d-lg-block">
                <div className="card" id="cardTeam">
                    <img src="..." className="card-img-top" id="cardImg-about"/>
                    <div className="card-body">
                        <h5 className="card-title">Herjhun Gerundio</h5>
                        <p className="card-text">Lorem ipsum dolor sit amet consectetur.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid d-flex flex-column justify-content-center align-items-center ">
            <div className="bullets">bullets</div>
            <div className="bullets">bullets</div>
            <div className="arrows">arrows</div>
            <div className="arrows">arrows</div>
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