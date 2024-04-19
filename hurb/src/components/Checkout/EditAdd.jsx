import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxSearch from '@mapbox/mapbox-sdk/services/geocoding';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './checkout';

mapboxgl.accessToken = 'pk.eyJ1IjoiaHVyYmtvbCIsImEiOiJjbHVlc24yb2owMndqMm5xdXk4eGE3YmhuIn0.Yr-o2EfRyg75G9NmpD0aYw';

export default function EditAdd(){
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
                    handleChange(); // Update address data
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


  const[rec_name, setRecName] = useState('');
  const[mobile_number, setMobileNum] = useState('');
  const[myAddress, setMyAddress] = useState('');
  const[region, setRegion] = useState('');
  const[street, setStreet] = useState('');
  const[zipcode, setZipCode] = useState('');


    

    return(
        <>
            <div className="container">
                <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />
                <p>{address}</p>
                <p>{lat} {lng}</p>
            </div>
            <div className="container pt-4 pb-4 px-5 mb-5 rounded" id="address-book-container">
                <h3>ADDRESS BOOK</h3>
                <div className="row">
                    <div className="col btn btn-outline-dark p-3" id="addressBookList">
                        <div className="d-flex gap-5">
                            <span>Home:</span>
                            <span>Name</span>
                            <span>Address</span>
                            <span>zipcode</span>
                            <span>phone number</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="container-fluid">
                            <div className="row d-flex flex-column">
                                <div className="col mb-3">
                                    <label htmlFor="recipientName">Recipient's Name</label>
                                    <input type="text" id="recipientName" className="form-control" placeholder={`Recipient's Name`}/>
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="mobile_number">Mobile Number</label>
                                    <input type="text" id="mobile_number" className="form-control" placeholder={`Phone Number`}/>
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
                                    <input type="text" id="address" className="form-control" placeholder={`Address`}/>
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="Region">Region</label>
                                    <input type="text" id="region" className="form-control" placeholder={`Region`}/>
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="street">Street</label>
                                    <input type="text" id="street" className="form-control" placeholder={`Street`}/>
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="zipCode">Zipcode</label>
                                    <input type="text" id="zipCode" className="form-control" placeholder={`Zipcode`}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </>
    )
}