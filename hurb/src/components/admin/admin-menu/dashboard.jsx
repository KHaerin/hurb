import React, { useState, useEffect } from 'react';
import NotAdmin from '../../NotAdmin'
import axios from 'axios';
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

    return(
        <>

        {isAdmin === '1' ?             
            <Container fluid>
              <Row className="d-flex gap-5">
              <Col lg={4} id="sales-container" className='rounded'>
                  <Container fluid id="sales-container-inside">
                      <Row className='p-3'>
                          <Col>
                              <h4>Accounts Registered</h4>
                          </Col>
                      </Row>
                      <Row className='px-3'>
                          <Col>
                              <h1>{accounts.length}</h1>
                          </Col>
                      </Row>
                  </Container>
              </Col>
              <Col lg={4} id="sales-container" className='rounded'>
                  <Container fluid id="sales-container-inside">
                      <Row className='p-3'>
                          <Col>
                              <h4>Seller Applicants</h4>
                          </Col>
                      </Row>
                      <Row className='px-3'>
                          <Col>
                              <h1>{applicants.length}</h1>
                          </Col>
                      </Row>
                  </Container>
              </Col>
              <Col lg={4} id="sales-container" className='rounded'>
                  <Container fluid id="sales-container-inside">
                      <Row className='p-3'>
                          <Col>
                              <h4>Seller Registered</h4>
                          </Col>
                      </Row>
                      <Row className='px-3'>
                          <Col>
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