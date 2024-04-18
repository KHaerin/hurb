import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxSearch from '@mapbox/mapbox-sdk/services/geocoding';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiaHVyYmtvbCIsImEiOiJjbHVlc24yb2owMndqMm5xdXk4eGE3YmhuIn0.Yr-o2EfRyg75G9NmpD0aYw';

export default function EditAdd(){

    const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [address, setAddress] = useState('');
  const markerRef = useRef(null);
  const mapContainer = useRef(null);
  const map = useRef(null);
  
  
  const handleClick = async (e) => {
    const { lng, lat } = e.lngLat;
    setLat(lat);
    setLng(lng);
    
    try {
        const response = await reverseGeocode(lng, lat);
        const formattedAddress = formatAddress(response);
        setAddress(formattedAddress);
      
        // Update local storage
        localStorage.setItem('map_lat', lat);
        localStorage.setItem('map_long', lng);

        // Update marker position
        if (markerRef.current) {
            markerRef.current.setLngLat([lng, lat]);
        } else {
            // Create a new marker if it doesn't exist
            markerRef.current = new mapboxgl.Marker()
                .setLngLat([lng, lat])
                .addTo(map.current);
        }
    } catch (error) {
        console.error('Error fetching address:', error);
    }
};

useEffect(() => {
    if (lat !== null && lng !== null) {
        localStorage.setItem('map_lat', lat);
        localStorage.setItem('map_long', lng);
    }
}, [lat, lng]);

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
        map.current.setCenter([longitude, latitude]);
        setLat(latitude);
        setLng(longitude);

        try {
            const response = await reverseGeocode(longitude, latitude);
            const formattedAddress = formatAddress(response);
            setAddress(formattedAddress);
        } catch (error) {
            console.error('Error fetching address:', error);
        }

        if (!markerRef.current) {
          markerRef.current = new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .addTo(map.current);
        }
      },
      (error) => {
        console.error('Error getting user location:', error);
        map.current.setCenter([-74.5, 40]);
      }
    );

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    });
    map.current.addControl(geocoder);

    map.current.on('click', handleClick);

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });
    map.current.addControl(geolocate);

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
                    <div>
                    Latitude: {lat.toFixed(4)}, Longitude: {lng.toFixed(4)}
                    </div>
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
                            placeholder="Address 1"

                        />
                        <label htmlFor="floatingInput1">Address 1</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input
                            type="text"
                            id="floatingInput2"
                            className="form-control"
                            placeholder="Address 2"

                        />
                        <label htmlFor="floatingInput2">Address 2</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input
                            type="text"
                            id="floatingInput3"
                            className="form-control"
                            placeholder="City"
                    />
                        <label htmlFor="floatingInput3">City</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input
                            type="text"
                            id="floatingInput4"
                            className="form-control"
                            placeholder="Province"

                        />
                        <label htmlFor="floatingInput4">Province</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input
                            type="text"
                            id="floatingInput5"
                            className="form-control"
                            placeholder="Zipcode"
                       />
                        <label htmlFor="floatingInput5">Zipcode</label>
                    </div>
            </div>
        </>
    )
}