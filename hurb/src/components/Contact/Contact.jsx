import { Container, Row, Col, Button} from 'react-bootstrap';
import * as FaIcons6 from 'react-icons/fa6';
import * as IoIcons5 from 'react-icons/io5';
import * as CiIcons from 'react-icons/ci';
import './Contact.css';

export default function Contact(){

    const contactText = {
        fontFamily: 'Times New Roman',
    }

    const icons = {
        fontSize: '1.5rem',
    }

    return(
        <>
        <Container fluid>
            <Row className='d-flex text-center mb-3'>
                <Col>
                    <h1 style={contactText}>Contact Us</h1>
                </Col>
            </Row>
            <Row id="contact-area">
                <Col>
                    <Container fluid>
                        <Row>
                            <Col className='mb-2'>
                                <h4>Get in touch</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='d-flex gap-2 align-items-center mb-2'>
                                <span style={icons}>
                                    <IoIcons5.IoCallOutline></IoIcons5.IoCallOutline>
                                </span>
                                <span>
                                    09662019086
                                </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='d-flex gap-2 align-items-center mb-2'>
                                <span style={icons}>
                                    <CiIcons.CiLocationOn></CiIcons.CiLocationOn>
                                </span>
                                <span>
                                    Sabang, Danao, Japan
                                </span>
                            </Col>
                        </Row>
                        <Row className='mb-5'>
                            <Col className='d-flex gap-2 align-items-center mb-5'>
                                <span style={icons}>
                                    <CiIcons.CiMail></CiIcons.CiMail>
                                </span>
                                <span>
                                    hurb@gmail.com
                                </span>
                            </Col>
                        </Row>
                        <Row className=''>
                            <Col>
                                <span>Follow us</span>
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
                <Col>
                    <Container fluid>
                        <Row>
                            <Col>
                                <div className="form-floating mb-3">
                                     <input 
                                        type="text" 
                                        className="form-control form-control-sm" 
                                        placeholder="Name"
                                        name="contactName" 
                                        />
                                      <label htmlFor="contactName">Name</label>
                                </div>
                            </Col>
                            <Col>
                                <div className="form-floating mb-3">
                                     <input 
                                        type="email" 
                                        className="form-control form-control-sm" 
                                        placeholder="Email"
                                        name="contactEmail" 
                                        />
                                      <label htmlFor="contactEmail">Email</label>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="form-floating mb-3">
                                    <textarea className="form-control" name="contactMsg" placeholder="Message" id="contactMsg"></textarea>
                                    <label htmlFor="contactMsg">Message</label>
                                </div>
                            </Col>
                        </Row>
                        <Row >
                            <Col className='d-flex justify-content-center align-items-center'>
                                <Button variant='dark' id="contactBtn">Send Message</Button>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
        </>
    )
}