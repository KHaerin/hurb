import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxSearch from '@mapbox/mapbox-sdk/services/geocoding';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './checkout';

mapboxgl.accessToken = 'pk.eyJ1IjoiaHVyYmtvbCIsImEiOiJjbHVlc24yb2owMndqMm5xdXk4eGE3YmhuIn0.Yr-o2EfRyg75G9NmpD0aYw';

export default function EditAdd({addressData}){
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [address, setAddress] = useState('');
  const markerRef = useRef(null);
  const mapContainer = useRef(null);
  const map = useRef(null);

    function handleMarkerClick(lng, lat) {
        // Update latitude and longitude
        setLat(lat);
        setLng(lng);
    
        // Fetch address data for the clicked location
        reverseGeocode(lng, lat)
            .then(response => {
                const formattedAddress = formatAddress(response);
                setAddress(formattedAddress);
            })
            .catch(error => {
                console.error('Error fetching address:', error);
            });
    }
    
    
    function handleClick(e) {
        const { lng, lat } = e.lngLat;
    
        // Place a marker at the clicked location
        if (!markerRef.current) {
            markerRef.current = new mapboxgl.Marker()
                .setLngLat([lng, lat])
                .addTo(map.current);
        } else {
            markerRef.current.setLngLat([lng, lat]);
        }
    
        // Call the marker click handler
        handleMarkerClick(lng, lat);
    }


  const reverseGeocode = async (lng, lat) => {
    const reverseGeocodingClient = MapboxSearch({ accessToken: mapboxgl.accessToken });
    const response = await reverseGeocodingClient.reverseGeocode({
      query: [lng, lat],
      limit: 1
    }).send();

    return response.body;
  };

  const formatAddress = (response) => {
    const { features } = response;
    if (features.length > 0) {
        const { place_name } = features[0];
        return place_name;
    }
    return 'Address not found';
  };

      useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 7
        });

        // Get user's current position
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                map.current.setCenter([longitude, latitude]); // Center map on user's location

                // Place a marker on the user's location without updating the state variables
                if (!markerRef.current) {
                    markerRef.current = new mapboxgl.Marker()
                        .setLngLat([longitude, latitude])
                        .addTo(map.current);
                }
            },
            (error) => {
                console.error('Error getting user location:', error);
                map.current.setCenter([-74.5, 40]); // Default to some other location if geolocation fails
            }
        );

        // Initialize geocoder control
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        });
        map.current.addControl(geocoder);

        // Handle map click event
        map.current.on('click', handleClick);

        // Initialize geolocate control
        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        });
        map.current.addControl(geolocate);

        // Handle geolocate event
        geolocate.on('geolocate', (e) => {
            const { latitude, longitude } = e.coords;
            setLat(latitude);
            setLng(longitude);

            // Place marker on user's location
            if (!markerRef.current) {
                markerRef.current = new mapboxgl.Marker()
                    .setLngLat([longitude, latitude])
                    .addTo(map.current);
            } else {
                markerRef.current.setLngLat([longitude, latitude]);
            }

            // Fetch address data
            reverseGeocode(longitude, latitude)
                .then(response => {
                    const formattedAddress = formatAddress(response);
                    setAddress(formattedAddress);
                })
                .catch(error => {
                    console.error('Error fetching address:', error);
                });
        });

        return () => {
            map.current.remove(); // Cleanup map on unmount
        };
    }, []);


  useEffect(() => {
    const handleModalShown = () => {
        if (map.current) {
            map.current.resize();
        }
    };

    const modalElement = document.getElementById('staticBackdrop');
    modalElement.addEventListener('shown.bs.modal', handleModalShown);

    return () => {
        modalElement.removeEventListener('shown.bs.modal', handleModalShown);
    };
  }, []);

  const[addressDetails, setAddressDetails] = useState([]);

  useEffect(() => {
      const getAddressBook = async () => {
          try{
              const user_id = localStorage.getItem('userId');
              const url = await axios.get(`http://localhost/hurb/AddressBook/getAddress.php?user_id=${user_id}`);
              const addressDetails = url.data;
              setAddressDetails(addressDetails);
          }catch(error){
              console.error(error);
          }
      };
      getAddressBook();
  }, [])


  const[rec_name, setRecName] = useState('');
  const[mobile_number, setMobileNum] = useState('');
  const[myAddress, setMyAddress] = useState('');
  const[region, setRegion] = useState('');
  const[street, setStreet] = useState('');
  const[zipcode, setZipCode] = useState('');
  const[bookID, setBookID] = useState('');

  const handleName = () => {
    setRecName(document.getElementById('recipientName').value);
  }

  const handleNumber = () => {
    setMobileNum(document.getElementById('mobile_number').value);
  }

  const handleAddress = () => {
    setMyAddress(document.getElementById('address').value);
  }

  const handleRegion = () => {
    setRegion(document.getElementById('region').value);
  }

  const handleStreet = () => {
    setStreet(document.getElementById('street').value);
  }

  const handleZip = () => {
    setZipCode(document.getElementById('zipCode').value);
  }
  
 const handlePlaceAddress =  async () => {
    if(bookID !== ''){
        try{
            const form = new FormData();
            form.append('addBook_id', bookID);
            form.append('recipient_name', rec_name);
            form.append('mobile_number', mobile_number);
            form.append('address', myAddress);
            form.append('region', region);
            form.append('street', street);
            form.append('zipcode', zipcode);
            form.append('map_lat', lat);
            form.append('map_long', lng);
            console.log('upodate')
            await axios.post("http://localhost/hurb/AddressBook/updateAddress.php", form);
            const addData = {
                bookID,
                rec_name,
                mobile_number,
                myAddress,
                region,
                street,
                zipcode,
                lat,
                lng
            }
            addressData(addData);
            const closeModalButton = document.querySelector('#staticBackdrop .btn-close');
            closeModalButton.click();
        }catch(error){
            console.error(error);
        }
    }else {
        if (!rec_name || !mobile_number || !myAddress || !region || !street || !zipcode){
            alert('Please fill up all fields.');
            return;
        } 
        if(!lat || !lng){
            alert('Mark your location on the map');
            return;
        }
        try{
            const addUrl = "http://localhost/hurb/AddressBook/addAddress.php";

            const user_id = localStorage.getItem('userId');

            let fData = new FormData();
            fData.append('user_id', user_id);
            fData.append('fullName', rec_name);
            fData.append('mobile_number', mobile_number);
            fData.append('address', myAddress);
            fData.append('region', region);
            fData.append('street', street);
            fData.append('zipcode', zipcode);
            fData.append('map_lat', lat);
            fData.append('map_long', lng);
    
            axios.post(addUrl, fData)
            .then(response=>{
                alert(response.data);
                
                setRecName('');
                setAddress('');
                setMobileNum('');
                setRegion('');
                setStreet('');
                setZipCode('');
                console.log('add');
                const closeModalButton = document.querySelector('#staticBackdrop .btn-close');
                closeModalButton.click();
            })
            .catch(error=>alert(error));
        }catch(error){
            console.error(error);
        }
    }
  };
  
  const clearFields = () => {
    setLat('');
    setLng('');
    setBookID('');
    setRecName('');
    setMobileNum('');
    setMyAddress('');
    setRegion('');
    setStreet('');
    setZipCode('');

    if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null; // Reset markerRef.current to null
    }
  }

  const bookClick = (addDetails) => {
    setLat(addDetails.map_lat);
    setLng(addDetails.map_long);
    setBookID(addDetails.addBook_id);
    setRecName(addDetails.recipient_name);
    setMobileNum(addDetails.mobile_number);
    setMyAddress(addDetails.address);
    setRegion(addDetails.region);
    setStreet(addDetails.street);
    setZipCode(addDetails.zipcode);

    if (addDetails.map_lat !== '' && addDetails.map_long !== '') {
        const newLat = parseFloat(addDetails.map_lat);
        const newLng = parseFloat(addDetails.map_long);

        // Move the marker to the new coordinates
        if (markerRef.current) {
            markerRef.current.setLngLat([newLng, newLat]);
        } else {
            markerRef.current = new mapboxgl.Marker()
                .setLngLat([newLng, newLat])
                .addTo(map.current);
        }
    }

  }
    

    return(
        <>
          <div className="modal fade"  id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
            <div className="modal-dialog modal-fullscreen modal-dialog-centered modal-dialog-scrollable modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Address</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p>{address}</p>
                        <p>{lat} {lng}</p>
                    </div>
                </div>
                <div className="row d-flex justify-content-end align-items-end mb-3">
                    <div className="col-auto">
                        <button className="btn btn-outline-secondary" onClick={clearFields}>Clear</button>
                    </div>
                </div>
                
               
            </div>
            <div className="container pt-4 pb-4 px-5 mb-5 rounded" id="address-book-container">
                <h3>ADDRESS BOOK</h3>
                <div className="row row-cols-1">
                    {addressDetails.map((addDetails, index) => (
                    <div className="col btn btn-outline-dark p-3 mb-3" onClick={() => {bookClick(addDetails)}} key={addDetails.addBook_id} id="addressBookList">
                         <div className="d-flex gap-5">
                             <span>Home</span>
                             <span>{addDetails.recipient_name}</span>
                             <span>{addDetails.address}</span>
                             <span>{addDetails.zipcode}</span>
                             <span>{addDetails.mobile_number}</span>
                         </div>
                     </div>
                    ))}

                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="container-fluid">
                            <div className="row d-flex flex-column">
                                <div className="col mb-3">
                                    <label htmlFor="recipientName">Recipient's Name</label>
                                    <input type="text" id="recipientName" value={rec_name} onChange={handleName} className="form-control" placeholder={`Recipient's Name`}/>
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="mobile_number">Mobile Number</label>
                                    <input type="text" id="mobile_number" value={mobile_number} onChange={handleNumber} className="form-control" placeholder={`Phone Number`}/>
                                </div>
                                <div className="col d-flex gap-3">
                                    <button className="btn btn-outline-success">Office</button>
                                    <button className="btn btn-outline-info">Home</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="container-fluid">
                            <div className="row d-flex flex-column">
                                <div className="col mb-3">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" id="address" value={myAddress} onChange={handleAddress} className="form-control" placeholder={`Address`}/>
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="Region">Region</label>
                                    <input type="text" id="region" value={region} onChange={handleRegion} className="form-control" placeholder={`Region`}/>
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="street">Street</label>
                                    <input type="text" id="street" value={street} onChange={handleStreet} className="form-control" placeholder={`Street`}/>
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="zipCode">Zipcode</label>
                                    <input type="text" id="zipCode" value={zipcode} onChange={handleZip} className="form-control" placeholder={`Zipcode`}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
             <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button 
                           type="button" 
                           className="btn btn-primary" 
                           onClick={handlePlaceAddress} 
                       >Place Address</button>
                   </div>
                </div>
            </div>
        </div>    
        </>
    )
}