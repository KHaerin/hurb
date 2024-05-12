import { Container, Row, Col, Button} from 'react-bootstrap';
import * as FaIcons6 from 'react-icons/fa6';

export default function Footer(){

    const textStyle = {
        fontFamily: 'Times New Roman, Times, serif',
        fontSize: '1.3rem',
    }

    return(
        <>
            <Container fluid className='mt-5' id="footerContainer">
                <Row>
                    <Col lg={4} id="social-icons-container">
                        <Container fluid>
                            <Row>
                                <Col>
                                    <span style={textStyle}>Connect with us</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='d-flex gap-3'>
                                    <span id="social-icons"><FaIcons6.FaFacebook></FaIcons6.FaFacebook></span>
                                    <span id='social-icons'><FaIcons6.FaSquareInstagram></FaIcons6.FaSquareInstagram></span>
                                    <span id='social-icons'><FaIcons6.FaSquareXTwitter></FaIcons6.FaSquareXTwitter></span>
                                    <span id='social-icons'><FaIcons6.FaLinkedin></FaIcons6.FaLinkedin></span>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col lg={4}>
                        <Container fluid className='d-flex flex-column justify-content-center align-items-center mt-4'>
                            <Row>
                                <Col className='d-flex gap-5 mb-5' >
                                    <span style={textStyle}>About</span>
                                    <span style={textStyle}>Contacts</span>
                                    <span style={textStyle}>Our Team</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='mb-5'>
                                    <a href="#" style={textStyle}>hurb@gmail.com</a>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <span style={textStyle}>2024 hurb. All Rights Reserved</span>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col lg={4} id="newsletter-area">
                        <Container fluid>
                            <Row>
                                <Col><span style={textStyle}>Subscribe to our newsletter</span></Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="form-floating mb-3">
                                        <input 
                                            type="text" 
                                            className="form-control form-control-sm" 
                                            placeholder="Enter Email"
                                            name="footerEmail" 
                                            id="footerInput"
                                            />
                                        <label htmlFor="Enter Email" style={textStyle}>Enter Email</label>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button variant='dark' id="footerbtn" style={textStyle}>Subscribe</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )
}