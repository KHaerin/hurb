import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddAddress({handleLinkClick}){

    const[fullName, setFullName] = useState('');
    const[mobileNumber, setMobile] = useState('');
    const[address, setAddress] = useState('');
    const[region, setRegion] = useState('');
    const[street, setStreet] = useState('');
    const[zipcode, setZipcode] = useState('');

   
    // const handleFullName = (e) => setFullName(e.target.value);
    // const handleMobile = (e) => setMobile(e.target.value);
    // const handleAddress = (e) => setAddress(e.target.value);
    // const handleRegion = (e) => setRegion(e.target.value);
    // const handleStreet = (e) => setStreet(e.target.value);
    // const handleZipCode = (e) => setZipcode(e.target.value);
    const addBook_id = localStorage.getItem('addBook_id');

    useEffect(() => {
        if (addBook_id) {
            const fetchAddressDetails = async () => {
                try {
                    const response = await axios.get(`http://localhost/hurb/AddressBook/getAddress.php?addBook_id=${addBook_id}`);
                    const addressData = response.data[0];
                    setFullName(addressData.recipient_name || '');
                    setMobile(addressData.mobile_number || '');
                    setAddress(addressData.address || '');
                    setRegion(addressData.region || '');
                    setStreet(addressData.street || '');
                    setZipcode(addressData.zipcode || '');
                } catch (error) {
                    console.error('Error fetching address details:', error);
                }
            };

            fetchAddressDetails();
        }
    }, [addBook_id]);

    const saveBtn = async() => {
        if(addBook_id){
            try{
                    console.log('test');
                    const newData = new FormData();
                    newData.append('addBook_id', addBook_id);
                    newData.append('recipient_name', fullName);
                    newData.append('mobile_number', mobileNumber);
                    newData.append('address', address);
                    newData.append('region', region);
                    console.log(region);
                    newData.append('street', street);
                    newData.append('zipcode', zipcode);
    
                    await axios.post("http://localhost/hurb/AddressBook/updateAddress.php", newData);
                    localStorage.removeItem('addBook_id');
                    handleLinkClick('addressBook');
                
            }catch(error){
                console.error(error);
            }
            return;
        }
        if (!fullName || !mobileNumber || !address || !region || !street || !zipcode) {
            alert('Please fill up all the fields');
            return;
        }
        const url = "http://localhost/hurb/AddressBook/addAddress.php";
        const user_id = localStorage.getItem('userId');

        let fData = new FormData();
        fData.append('user_id', user_id);
        fData.append('fullName', fullName);
        fData.append('mobile_number', mobileNumber);
        fData.append('address', address);
        fData.append('region', region);
        fData.append('street', street);
        fData.append('zipcode', zipcode);

        axios.post(url, fData)
        .then(response=>{
            alert(response.data);
            
            setFullName('');
            setAddress('');
            setMobile('');
            setRegion('');
            setStreet('');
            setZipcode('');
            handleLinkClick('addressBook');
        })
        .catch(error=>alert(error));
    }
    

    const handleAddAddressClick = () => {
        handleLinkClick('addressBook');
        localStorage.removeItem('addBook_id');
    };

    return(
        <>
          <div className="container p-5" id="addAddress-container">
                <div className="row row-cols-2">
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="fullName">Full name</label>
                            <input type="text" className="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} id="fullName" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobileNumber">Mobile Number</label>
                            <input type="text" className="form-control" value={mobileNumber} onChange={(e) => setMobile(e.target.value)} id="mobileNumber" />
                        </div>
                        <div className="mb-3">
                            <p>Select a label for effective delivery</p>
                            <div className="locationBtn d-flex gap-3">
                                <button className="btn btn-outline-success">Office</button>
                                <button className="btn btn-outline-info">Home</button>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="addressField">Address</label>
                            <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} id="addressField" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="regionField">Region</label>
                            <input type="text" className="form-control" value={region} onChange={(e) => setRegion(e.target.value)} id="regionField" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="streetField">Street</label>
                            <input type="text" className="form-control" value={street} onChange={(e) => setStreet(e.target.value)} id="streetField" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="zipField">Zipcode</label>
                            <input type="text" className="form-control" value={zipcode} onChange={(e) => setZipcode(e.target.value)} id="zipField" />
                        </div>
                        <div className="d-flex gap-3 justify-content-end">
                            <button className="btn btn-dark" onClick={handleAddAddressClick}>Cancel</button>
                            <button className="btn btn-success" onClick={saveBtn}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}