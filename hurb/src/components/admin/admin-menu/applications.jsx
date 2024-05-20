import React, { useState, useEffect } from "react";
import axios from 'axios';
import NotAdmin from '../../NotAdmin'
export default function Applications() {
    const [applicants, setApplicants] = useState([]);
    const [selectedApplicant, setSelectedApplicant] = useState(null);

    useEffect(() => {
        fetchApplicants();
    }, []);

    const fetchApplicants = async () => {
        try {
            const response = await axios.get('http://localhost/hurb/SellerApplication/Application.php');
            setApplicants(response.data);
        } catch (error) {
            console.error('Error', error);
        }
    };

    const updateApply = (check_id) => {
        const updApply = 'http://localhost/hurb/SellerApplication/updateApplication.php';
        try {
            let verifyData = new FormData();
            verifyData.append('isAccepted', '1');
            verifyData.append('check_id', check_id);
            console.log(check_id);
            axios.post(updApply, verifyData)
                .then(response => {
                    if (response.data === 'Success') {
                        alert('Accepted');
                    } else {
                        console.log(response.data);
                        alert('Email not registered');
                    }
                })
                .catch(error => alert(error));
        } catch (error) {
            console.error('Error updating', error);
        }
    }

    const openModal = (applicant) => {
        setSelectedApplicant(applicant);
    };

    const closeModal = () => {
        setSelectedApplicant(null);
        window.location.reload();
    };

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAdmin(localStorage.getItem('userId'));
    });

    return (
        <>
            {isAdmin === 1 ? 
            <>
                <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Seller Application</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Applicant Name</th>
                                    <th scope="col">Business Name</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Country</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applicants.map((applicant, index) => (
                                    <tr key={applicant.check_id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{applicant.firstname}</td>
                                        <td>{applicant.business_name}</td>
                                        <td>{applicant.phonenumber}</td>
                                        <td>{applicant.user_email}</td>
                                        <td>{applicant.city_municipality}</td>
                                        <td>
                                        <button
                                                type="button"
                                                className={`btn btn-${applicant.isAccepted === '1' ? 'success disabled' : 'danger'}`}
                                                onClick={() => openModal(applicant)}
                                                disabled={applicant.isAccepted === '1'}
                                            >
                                                {applicant.isAccepted === '1' ? 'Accepted' : 'Pending'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {selectedApplicant && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5">ACCEPT APPLICANT</h1>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                Accept Applicant?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        updateApply(selectedApplicant.check_id);
                                        closeModal();
                                    }}
                                >
                                    Accept
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </> 
            : 
            <NotAdmin></NotAdmin>}
            
        </>
    )
}
