import './Login.css';
import {Link, useNavigate} from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';

export default function Login({updateLoginStatus}){
    const[userName, setUserName]        = useState('');
    const[password, setPassword]        = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

  

    const validateField = (fieldName, value) => {
        let errorMessage = '';

       if (fieldName === 'userName' && value.length < 4) {
            errorMessage = 'Enter a valid username.';
        } else  if (fieldName === 'password' && !value.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\d\s]).{8,}$/)) {
            errorMessage = 'Invalid password!';
        } 

        setErrors(prevErrors => ({ ...prevErrors, [fieldName]: errorMessage }));
    };


    const handleuserNameChange = (e) => {
        setUserName(e.target.value);
        validateField('userName', e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        validateField('password', e.target.value);
    };

    const handleLogin = () => {
        if(userName.length === 0 || password.length === 0) {
            alert('Username or password is empty.');
        } else {
            const url = "http://localhost/hurb/login/login.php";
    
            const formData = new FormData();
            formData.append('userName', userName);
            formData.append('password', password);
    
            axios.post(url, formData)
            .then(response => {
                const data = response.data;
                if (data.success) {
                    const userId = data.userId;
                    localStorage.setItem('userId', userId);
                    if(userId === '1'){
                        localStorage.setItem('isLoggedIn', true);
                        updateLoginStatus(true);
                        window.location.href="/login/admin";
                        alert('ADMIN');
                    }else{
                        localStorage.setItem('isLoggedIn', true);
                        updateLoginStatus(true);
                        navigate("/");
                        window.location.reload();
                    }
                } else {
                    alert(data.message); 
                    updateLoginStatus(false);
                }               
            })
            .catch(error => alert(error));
            
        }
    };

    const[showPass, setShowPass] = useState(true);

    const showBtn = () => {
        setShowPass(prevState => !prevState);
    }

    return(
        <>
        <div className="container" id="loginContainer">
            <div className="container">
                    <div className="row">
                        <div className="col d-flex justify-content-center mb-5">
                            <span className="text-center" id="welcome">WELCOME!</span>
                        </div>
                    </div>
                </div>

                <div className="container" id="formContainer">
                    <div className="container" id="cont">
                        <div className="row d-flex">
                            <div className="col d-flex flex-column justify-content-center align-items-center">
                                <div className="form-floating mb-3">
                                    <input type="text" className={`form-control ${errors.userName ? 'is-invalid' : ''}`} id="loginUser" name = "username"  onChange={handleuserNameChange} placeholder="Username"/>
                                    <label htmlFor="loginUser">Username / Email</label>
                                    {errors.userName && <div className="invalid-feedback">{errors.userName}</div>}
                                </div>

                                <div className="form-floating  position-relative mb-3">
                                    <input type={showPass ? 'password' : 'text'} className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="loginPassword" name="password" onChange={handlePasswordChange} placeholder="Password"/>
                                    <label htmlFor="loginPassword">Password</label>
                                    <button className="btn" id="eye-btn-login" type="button" onClick={showBtn}>{showPass ? <FaIcons.FaEye/> : <FaIcons.FaEyeSlash/> }</button>
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}

                                </div>
                            
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-auto" id="noAcc">    
                                <span>No Account? <Link to="/register">Register Here!</Link></span>
                            </div> 
                        </div>
                    </div>
                    <div className="col mb-4 d-flex justify-content-center">
                            <button type="button" className="btn btn-dark" id="loginBtn" onClick={handleLogin}>Login</button>
                        </div>
                    {/* <div className="col d-flex gap-5 d-flex justify-content-center mb-5">
                        <button type="button" className="btn btn-secondary" id="loginGoogle">Continue with Gogel</button>
                        <button type="button" className="btn btn-secondary" id="loginFB">Peysbook?</button>
                    </div> */}
                </div>               
        </div>
           
        </>
    )
}

