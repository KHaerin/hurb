import Map from '../../../googleMap/Map';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './regSeller.css';
import { ToastContainer, toast } from 'react-toastify';

export default function regSeller() {
    const [showMap, setShowMap] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [shop_name, setShopName] = useState('');
    const [shop_mail, setShopMail] = useState('');
    const [shop_address1, setAddress1] = useState('');
    const [shop_address2, setAddress2] = useState('');
    const [shop_barangay, setBarangay] = useState('');
    const [shop_city, setCity] = useState('');
    const [shop_province, setProvince] = useState('');
    const [shop_zip, setZip] = useState('');
    const [error, setErrors] = useState({});
    const verifyBtnRef = useRef(null);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateFields = (fieldName, value) => {
        let errorMsg = '';
        if (fieldName === 'shop_name' && value.length === 0) {
            errorMsg = 'Provide your business name';
        } else if (fieldName === 'shop_mail' && (value.length === 0 || !emailPattern.test(value))) {
            errorMsg = 'Provide a valid business email';
        } else if (fieldName === 'shop_address1' && value.length === 0) {
            errorMsg = 'Provide your business address';
        } else if (fieldName === 'shop_barangay' && value.length === 0) {
            errorMsg = 'Provide your barangay';
        } else if (fieldName === 'shop_city' && value.length === 0) {
            errorMsg = 'State your city';
        } else if (fieldName === 'shop_province' && value.length === 0) {
            errorMsg = 'State your province';
        } else if (fieldName === 'shop_zip' && value.length === 0) {
            errorMsg = 'Provide a zip code';
        }
        setErrors(prevErrors => ({ ...prevErrors, [fieldName]: errorMsg }));
    };

    const handleShopName = (e) => {
        setShopName(e.target.value);
        validateFields('shop_name', e.target.value);
    }

    const handleShopMail = (e) => {
        setShopMail(e.target.value);
        validateFields('shop_mail', e.target.value);
    }

    const handleShopAddress1 = (e) => {
        setAddress1(e.target.value);
        validateFields('shop_address1', e.target.value);
    }

    const handleShopAddress2 = (e) => {
        setAddress2(e.target.value);
        validateFields('shop_address2', e.target.value);
    }

    const handleShopBarangay = (e) => {
        setBarangay(e.target.value);
        validateFields('shop_barangay', e.target.value);
    }

    const handleShopCity = (e) => {
        setCity(e.target.value);
        validateFields('shop_city', e.target.value);
    }

    const handleShopProvince = (e) => {
        setProvince(e.target.value);
        validateFields('shop_province', e.target.value);
    }

    const handleShopZip = (e) => {
        setZip(e.target.value);
        validateFields('shop_zip', e.target.value);
    }

    const handleVerifyEmail = async () => {
        if (shop_mail === '' || shop_name === '') {
            alert('Please provide business name and email');
            toast.warning('Please provide business name and email');
            return;
        }
        if (!emailPattern.test(shop_mail)) {
            toast.warning('Please provide a valid email address');
            return;
        }
    
        const url = "http://localhost/hurb/register/verifyBtn.php";
        const userId = localStorage.getItem('userId');
        let verifyData = new FormData();
        verifyData.append('shop_name', shop_name);
        verifyData.append('user_id', userId);
        verifyData.append('shop_mail', shop_mail);
    
        // Check if the user is already verified
        try {
            const response = await axios.get(`http://localhost/hurb/register/getApplication.php?user_id=${userId}`);
            const isVerified = response.data.isVerified;
            if (isVerified === '1') {
                toast.warning('Your email is already verified');
                return;
            }
        } catch (error) {
            console.log('Error fetching verification status:', error);
        }
    
        // If not already verified, send verification request
        axios.post(url, verifyData)
            .then(response => {
                console.log(response.data);
                if (response.data === 'Success') {
                    toast.warning('Please check your email for verification');
                } else {
                    toast.warning('Email not registered');
                }
            })
            .catch(error => alert(error));
    }

    const checkEmailVerified = async () => {
        try{
            const getUserId = localStorage.getItem('userId');
            const response = await axios.get(`http://localhost/hurb/register/getApplication.php?user_id=${getUserId}`);
            const dataFetch = response.data;
            const getUserIdDB = dataFetch.user_id;
            const getVerified = dataFetch.isVerified;
            if(getUserIdDB === getUserId && getVerified === '1'){
                setIsEmailVerified(true);
                
            }
        }catch(error){
            console.log('Error fetching data:', error);
        }
    }

    useEffect(() => {
        checkEmailVerified();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            checkEmailVerified();
        }, 500); // Poll every 5 seconds, adjust as needed
    
        return () => clearInterval(interval);
    }, []);

    const handleRegSeller = async () => {
        // Check if the email is verified
        await checkEmailVerified();
        
        // If email is not verified, prevent submission
        if (!isEmailVerified) {
            toast.warning('Please verify your email before submitting');
            verifyBtnRef.current.scrollIntoView({ behavior: "smooth" });
            return;
        }
        
        // Proceed with submission
        if (Object.values(error).some(errors => errors !== '')) {
            toast.error('Error in the fields');
            return;
        } else {
            const url = "http://localhost/hurb/register/registerSeller.php";
            localStorage.setItem('isApplied', true);
            const isApplied = localStorage.getItem('isApplied');
            const map_lat = localStorage.getItem('map_lat');
            const map_long = localStorage.getItem('map_long');
            const userId = localStorage.getItem('userId');
    
            if (map_lat === null || map_long === null) {
                toast.warning('Please mark your location in the map');
                return;
            }
            let fData = new FormData();
            fData.append('shop_name', shop_name);
            fData.append('user_id', userId);
            fData.append('shop_mail', shop_mail);
            fData.append('shop_address1', shop_address1);
            fData.append('shop_address2', shop_address2);
            fData.append('shop_barangay', shop_barangay);
            fData.append('shop_city', shop_city);
            fData.append('shop_province', shop_province);
            fData.append('shop_zip', shop_zip);
            fData.append('map_lat', map_lat);
            fData.append('map_long', map_long);
            fData.append('isVerified', isApplied);
    
            axios.post(url, fData)
                .then(response => {
                    alert(response.data);
                    setShopName('');
                    setShopMail('');
                    setAddress1('');
                    setAddress2('');
                    setBarangay('');
                    setCity('');
                    setProvince('');
                    setZip('');
                    localStorage.removeItem('isApplied');
                    localStorage.removeItem('map_lat');
                    localStorage.removeItem('map_long');
                    window.location.href = "/account";
                })
                .catch(error => alert(error));
        }
    }
    
    return (
        <>
            <div className="container-fluid mb-5">
                <div className="row">
                    <div className="col">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <span>Seller Registration</span>
                                    <hr className="border border-dark border-1 opacity-40" id="hr2" />
                                </div>
                            </div>
                            <div ref={verifyBtnRef}></div>
                            <div className="row">
                                <div className="col-7">
                                    <div className="form-floating mb-3">
                                        <input type="text" className={`form-control ${error.shop_name ? 'is-invalid' : ''}`} placeholder="Business Name" name="shop_name" onChange={handleShopName} id="shop_name" />
                                        <label htmlFor="shop_name">Business Name</label>
                                        {error.shop_name && <div className="invalid-feedback">{error.shop_name}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-7">
                                    <div className="form-floating mb-3">
                                        <input type="text" className={`form-control ${error.shop_mail ? 'is-invalid' : ''}`} onChange={handleShopMail} id="shop_mail" />
                                        <label htmlFor="shop_mail">Email</label>
                                        {error.shop_mail && <div className="invalid-feedback">{error.shop_mail}</div>}
                                        {!emailPattern.test(shop_mail) && <div className="invalid-feedback">Invalid email format</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-7">
                                    <a className=" link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover mb-3" onClick={handleVerifyEmail} id="verifyBtn">Verify</a>
                                    {error.verifyBtn && <div className="invalid-feedback">{error.verifyBtn}</div>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <span>Address</span>
                                </div>
                            </div>
                            <div className="row row-cols-1">
                                <div className="col">
                                    <button className="btn btn-dark mb-3" onClick={() => setShowMap(!showMap)}>
                                        {showMap ? 'Hide Map' : 'Show Map'}
                                    </button>
                                </div>
                                <div className="col mb-3">
                                    {showMap ? <Map /> : 'Press Button to show the map'}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-7">
                                    <div className="form-floating mb-3">
                                        <input type="text" className={`form-control ${error.shop_address1 ? 'is-invalid' : ''}`} onChange={handleShopAddress1} id="shop_address1" />
                                        <label htmlFor="shop_address1">Address 1: </label>
                                        {error.shop_address1 && <div className="invalid-feedback">{error.shop_address1}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-7">
                                    <div className="form-floating mb-3">
                                        <input type="text" className={`form-control ${error.shop_address2 ? 'is-invalid' : ''}`} onChange={handleShopAddress2} id="shop_address2" />
                                        <label htmlFor="shop_address2">Address 2: </label>
                                        {error.shop_address2 && <div className="invalid-feedback">{error.shop_address2}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-7">
                                    <div className="form-floating mb-3">
                                        <input type="text" className={`form-control ${error.shop_barangay ? 'is-invalid' : ''}`} onChange={handleShopBarangay} id="shop_barangay" />
                                        <label htmlFor="shop_barangay">Barangay</label>
                                        {error.shop_barangay && <div className="invalid-feedback">{error.shop_barangay}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-7">
                                    <div className="form-floating mb-3">
                                        <input type="text" className={`form-control ${error.shop_city ? 'is-invalid' : ''}`} onChange={handleShopCity} id="shop_city" />
                                        <label htmlFor="shop_city">City/Municipality</label>
                                        {error.shop_city && <div className="invalid-feedback">{error.shop_city}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-7">
                                    <div className="form-floating mb-3">
                                        <input type="text" className={`form-control ${error.shop_province ? 'is-invalid' : ''}`} onChange={handleShopProvince} id="shop_province" />
                                        <label htmlFor="shop_province">Province</label>
                                        {error.shop_province && <div className="invalid-feedback">{error.shop_province}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-7">
                                    <div className="form-floating mb-3">
                                        <input type="text" className={`form-control ${error.shop_zip ? 'is-invalid' : ''}`} onChange={handleShopZip} id="shop_zip" />
                                        <label htmlFor="shop_zip">Postal / Zip Code</label>
                                        {error.shop_zip && <div className="invalid-feedback">{error.shop_zip}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-7">
                                    <button className="btn btn-dark mb-3" onClick={handleRegSeller}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-center" limit={1}/>
        </>
    )
}
