import './register.css';
import {Link} from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
export default function Register(){

    const[firstName, setFirstName]      = useState('');
    const[lastName, setLastName]        = useState('');
    const[userName, setUserName]        = useState('');
    const[phoneNumber, setPhoneNumber]  = useState('');
    const[email, setEmail]              = useState('');
    const[password, setPassword]        = useState('');
    const[conPass, setConPass]          = useState('');
    const [errors, setErrors] = useState({});

    const validateField = (fieldName, value) => {
        let errorMessage = '';
        let pass = password;
        let conPass = '';
    

        if(fieldName === 'confirmPassword'){
            conPass = value;
        }
        
        if (fieldName === 'firstName' && value.length < 2) {
            errorMessage = 'Enter a valid first name.';
        } else if (fieldName === 'lastName' && value.length < 2) {
            errorMessage = 'Enter a valid last name.';
        } else if (fieldName === 'userName' && value.length < 4) {
            errorMessage = 'Enter a valid username.';
        } else if (fieldName === 'phoneNumber' && !value.match(/[0-9]{11}/)) {
            errorMessage = 'Enter a 12 digit phone number.';
        } else if (fieldName === 'email' && !value.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
            errorMessage = 'Enter a valid email.';
        } else if (fieldName === 'password' && !value.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\d\s]).{8,}$/)) {
            errorMessage = 'Please provide a password.';
        } else if(fieldName === 'confirmPassword' && conPass != pass) {
            errorMessage = 'Password mismatch!';
        }

        setErrors(prevErrors => ({ ...prevErrors, [fieldName]: errorMessage }));
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
        validateField('firstName', e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
        validateField('lastName', e.target.value);
    };

    const handleuserNameChange = (e) => {
        setUserName(e.target.value);
        validateField('userName', e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
        validateField('phoneNumber', e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        validateField('email', e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        validateField('password', e.target.value);
    };

    const handleConPassChange = (e) => {
        setConPass(e.target.value);
        validateField('confirmPassword', e.target.value);
    };

    const handleRegister = () => {
        if (Object.values(errors).some(error => error !== '')) {
            alert('There are errors in the fields!');
            return;
        }
        if(firstName.length === 0){
            alert('Firstname is empty.');
        }else if(lastName.length === 0){
            alert('Lastname is empty.');
        }else if(userName.length === 0){
            alert('Username is empty.');
        }else if(phoneNumber.length === 0){
            alert('Phonenumber is empty.');
        }else if(email.length === 0){
            alert('Email is empty');
        }else if(password.length === 0){
            alert('Please provide a password.');
        }else{
            const url = "http://localhost/hurb/register/registerUser.php";

            let fData = new FormData();
            fData.append('firstName', firstName);
            fData.append('lastName', lastName);
            fData.append('userName', userName);
            fData.append('phoneNumber', phoneNumber);
            fData.append('email', email);
            fData.append('password', password);

            axios.post(url, fData)
            .then(response=>{
                alert(response.data);
                if(response.data === 'user already exists'){
                    return;
                }else{
                    setFirstName('');
                    setLastName('');
                    setUserName('');
                    setPhoneNumber('');
                    setEmail('');
                    setPassword('');
                    setConPass('');
                    window.location.href="/login";
                }         
            })
            .catch(error=>alert(error));
        }
    }
    
    return(
        <>
            <div className="container-fluid" id="registerContainer">
                <div className="row gap-3">
                    <div className="col d-flex gap-5" id="regImages">
                        <img src="" alt="" id="register-img" className='mt-5' />
                        <img src="" alt="" id="register-img"/>
                    </div>
                    <div className="col" id="formContainerReg">
                        <h1 className='d-flex mb-5'>SIGN UP</h1>
                        <div className="container">
                            <div className="row row-cols-2">
                                <div className="col">
                                    <div className="form-floating mb-4">
                                        <input type="text" className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} id="firstName" placeholder='First Name' name="firstName" value={firstName} onChange={handleFirstNameChange} required/>
                                        <label htmlFor="firstName">First Name</label>
                                        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-floating mb-4">
                                        <input type="text" className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} id="lastName" name="lastName" placeholder='Last Name'required value={lastName} onChange={handleLastNameChange}/>
                                        <label htmlFor="lastName">Last Name</label>
                                        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="row row-cols-1">
                                <div className="col">
                                    <div className="form-floating mb-4">
                                        <input type="text" className={`form-control ${errors.userName ? 'is-invalid' : ''}`} id="userName" name="userName" placeholder='Username' required minLength="3" value={userName} onChange={handleuserNameChange}/>
                                        <label htmlFor="userName">Username</label>
                                        {errors.userName && <div className="invalid-feedback">{errors.userName}</div>}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-floating mb-4">
                                        <input type="tel" className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`} id="phoneNumber" name="phoneNumber" placeholder='Phone Number' pattern="[0-9]{12,}" value={phoneNumber} onChange={handlePhoneNumberChange}/>
                                        <label htmlFor="phoneNumber">Phone Number</label>
                                        {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-floating mb-4">
                                        <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" name="email" placeholder='Email Address' required value={email} onChange={handleEmailChange}/>
                                        <label htmlFor="email">Email Address</label>
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-floating mb-4">
                                        <input type="text" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password" name="password" placeholder='Password' required value={password} onChange={handlePasswordChange}/>
                                        <label htmlFor="password">Password</label>
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-floating mb-4">
                                        <input type="text" className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' value={conPass} onChange={handleConPassChange} required/>
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                                    </div>
                                </div>
                                <div className="col mb-4">
                                    <Link className='btn btn-dark' onClick={handleRegister} type='button'>SIGN UP</Link>
                                </div>
                                <div className="col">
                                    <span>Already have an account? <Link to="/login">Log in.</Link></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}