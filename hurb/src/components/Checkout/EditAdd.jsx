import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxSearch from '@mapbox/mapbox-sdk/services/geocoding';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './checkout';

mapboxgl.accessToken = 'pk.eyJ1IjoiaHVyYmtvbCIsImEiOiJjbHVlc24yb2owMndqMm5xdXk4eGE3YmhuIn0.Yr-o2EfRyg75G9NmpD0aYw';

export default function EditAdd({onUpdateAddress}){

  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [address, setAddress] = useState('');
  const markerRef = useRef(null);
  const mapContainer = useRef(null);
  const map = useRef(null);

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

  const handleChange = () => {
    const addressData = {
      map_lat: document.getElementById('static1').value,
      map_lng: document.getElementById('static2').value,
      rec_name: document.getElementById('floatingInput1').value,
      phone_num: document.getElementById('floatingInput2').value,
      address: document.getElementById('floatingInput3').value,
      region: document.getElementById('floatingInput4').value,
      street: document.getElementById('floatingInput5').value,
      zipcode: document.getElementById('floatingInput6').value
    };

    onUpdateAddress(addressData);
  };
    
    function handleClick(e) {
      const { lng, lat } = e.lngLat;

      // Set latitude and longitude only when user clicks on the map
      setLat(lat);
      setLng(lng);

      // Place a marker at the clicked location
      if (!markerRef.current) {
          markerRef.current = new mapboxgl.Marker()
              .setLngLat([lng, lat])
              .addTo(map.current);
      } else {
          markerRef.current.setLngLat([lng, lat]);
      }

      // Fetch address data for the clicked location
      reverseGeocode(lng, lat)
          .then(response => {
              const formattedAddress = formatAddress(response);
              setAddress(formattedAddress);
              handleChange(); // Update address data
          })
          .catch(error => {
              console.error('Error fetching address:', error);
          });
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


    return(
        <>
            <div>
                <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />
                <p id="ps">NOTE: PUT A MARKER TO YOUR EXACT LOCATION</p>
                {lat !== null && lng !== null && (
                  <>
                  <div className="d-flex gap-2">
                    <label htmlFor="static1" className="col-form-label">Latitude: </label>
                    <input 
                        type="text"
                        id="static1"
                        className="form-control-plaintext"
                        value={lat}
                        onChange={handleChange}
                        >
                      </input>
                      <label htmlFor="static2" className="col-form-label">Latitude: </label>
                      <input 
                        type="text"
                        id="static2"
                        className="form-control-plaintext"
                        value={lng}
                        onChange={handleChange}
                        readOnly>
                      </input>
                  </div>
                   
                  </>
                  
                )}
                {address && (
                    <div>
                    Address: {address}
                    </div>
                )}
                 <h1>ADDRESS DETAILS</h1>
                    <div className="form-floating mb-3">
                    <input
                            type="text"
                            id="floatingInput1"
                            className="form-control"
                            placeholder="Recipient's Name"
                            onChange={handleChange}
                        />
                        <label htmlFor="floatingInput1">Recipient's Name</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input
                            type="text"
                            id="floatingInput2"
                            className="form-control"
                            placeholder="Phone Number"
                            onChange={handleChange}
                        />
                        <label htmlFor="floatingInput2">Phone Number</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input
                            type="text"
                            id="floatingInput3"
                            className="form-control"
                            placeholder="Address"
                            onChange={handleChange}
                        />
                        <label htmlFor="floatingInput3">Address</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input
                            type="text"
                            id="floatingInput4"
                            className="form-control"
                            placeholder="Region"
                            onChange={handleChange}
                    />
                        <label htmlFor="floatingInput4">Region/City/District</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input
                            type="text"
                            id="floatingInput5"
                            className="form-control"
                            placeholder="Street"
                            onChange={handleChange}
                        />
                        <label htmlFor="floatingInput5">Street/Building Name</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input
                            type="text"
                            id="floatingInput6"
                            className="form-control"
                            placeholder="Zipcode"
                            onChange={handleChange}
                       />
                        <label htmlFor="floatingInput6">Zipcode</label>
                    </div>
            </div>
        </>
    )
}