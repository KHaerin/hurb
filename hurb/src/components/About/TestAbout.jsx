import React from 'react'

import HurbLogo1 from '../hurb-logo/hurb logo files-01.png'
import HurbLogo2 from '../hurb-logo/hurb logo files-02.png'
import HurbLogo3 from '../hurb-logo/hurb logo files-03.png'
import HurbLogo4 from '../hurb-logo/hurb logo files-04.png'

const imagestyle = {
    width: '50px'
}

const color = {
    color: '#000000',
}

function TestAbout() {
  return (
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
  )
}

export default TestAbout