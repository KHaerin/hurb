import React, { useState, useEffect } from 'react';
import NotAdmin from '../../NotAdmin'
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';
import { Container, Row, Col } from 'react-bootstrap';

export default function dashboard(){

    const [isAdmin, setIsAdmin] = useState('');

  useEffect(() => {
    setIsAdmin(localStorage.getItem('userId'));
  });

  const [accounts, setAccounts] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [registered, setRegistered] = useState([]);

  useEffect(() => {
    const getSales = async () => {
        try {
            const seller_id = localStorage.getItem('sellerId');
            const response = await axios.get('http://localhost/hurb/SellerApplication/Application.php');
            const filteredApplicants = response.data.filter(applicant => applicant.isAccepted === "0");
            const regApplicants = response.data.filter(applicant => applicant.isAccepted === "1");

            console.log('response: ', response.data);
            console.log('regApp: ', regApplicants);
            setRegistered(regApplicants);
            setApplicants(filteredApplicants);
            const url = await axios.get(`http://localhost/hurb/Admin/getAccount.php`);

            setAccounts(url.data);

    
        } catch (error) {
            console.error('myOrder error: ', error);
        }
    };
    getSales();
}, [])

 const iconstyle ={
    fontSize: '3rem',
    color: 'green '
 }

    return(
        <>

        {isAdmin === '1' ?             
            <Container fluid>
              <Row className="d-flex gap-5">
              <Col lg={4} id="sales-container" className='rounded'>
                  <Container fluid id="sales-container-inside">
                      <Row className='p-3'>
                          <Col className='d-flex justify-content-center align-items-center gap-5'>
                                <span style={iconstyle}><MdIcons.MdOutlineSupervisorAccount></MdIcons.MdOutlineSupervisorAccount></span>
                              <h4>Accounts Registered</h4>
                          </Col>
                          <Col className='d-flex justify-content-center align-items-center'>
                              <h1>{accounts.length}</h1>
                          </Col>
                      </Row>
                  </Container>
              </Col>
              <Col lg={4} id="sales-container" className='rounded'>
                  <Container fluid id="sales-container-inside">
                      <Row className='p-3'>
                        <Col className='d-flex justify-content-center align-items-center gap-5'>
                                <span style={iconstyle}><MdIcons.MdSell></MdIcons.MdSell></span>
                              <h4>Seller Applicants</h4>
                          </Col>
                          <Col className='d-flex justify-content-center align-items-center'>
                              <h1>{applicants.length}</h1>
                          </Col>
                      </Row>
                  </Container>
              </Col>
              <Col lg={4} id="sales-container" className='rounded'>
                  <Container fluid id="sales-container-inside">
                      <Row className='p-3'>
                            <Col className='d-flex justify-content-center align-items-center gap-5'>
                                <span style={iconstyle}><BsIcons.BsBagCheckFill></BsIcons.BsBagCheckFill></span>
                              <h4>Seller Registered</h4>
                          </Col>
                          <Col className='d-flex justify-content-center align-items-center'>
                              <h1>{registered.length}</h1>
                          </Col>
                      </Row>
                  </Container>
              </Col>
            </Row>
        </Container>
        : 
            <NotAdmin/>
        }
        </>
    )
}