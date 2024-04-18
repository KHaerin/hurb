import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxSearch from '@mapbox/mapbox-sdk/services/geocoding';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiaHVyYmtvbCIsImEiOiJjbHVlc24yb2owMndqMm5xdXk4eGE3YmhuIn0.Yr-o2EfRyg75G9NmpD0aYw';

const Map = () => {
  const [lngLat, setLngLat] = useState(null);
  const [address, setAddress] = useState('');
  const markerRef = useRef(null);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const defaultMarkerRef = useRef(null); // Reference to the default marker

  const handleClick = async (e) => {
    const { lng, lat } = e.lngLat;

    setLngLat({ lat, lng });

    try {
      const response = await reverseGeocode(lng, lat);
      const formattedAddress = formatAddress(response);
      setAddress(formattedAddress);
    } catch (error) {
      console.error('Error fetching address:', error);
    }

    localStorage.setItem('map_lat', lat);
    localStorage.setItem('map_long', lng);

    // Remove the default marker if it exists
    if (defaultMarkerRef.current) {
      defaultMarkerRef.current.remove();
    }

    // If marker exists, update its position
    if (markerRef.current) {
      markerRef.current.setLngLat(e.lngLat);
    } else {
      // If marker doesn't exist, create a new one
      markerRef.current = new mapboxgl.Marker()
        .setLngLat(e.lngLat)
        .addTo(map.current);
    }
  };

  const reverseGeocode = async (lng, lat) => {
    const reverseGeocodingClient = MapboxSearch({ accessToken: mapboxgl.accessToken });
    const response = await reverseGeocodingClient.reverseGeocode({
      query: [lng, lat],
      limit: 1
    }).send();

    return response.body;
  };

  const formatAddress = (response) => {
    // Extract relevant address components
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
        setLngLat({ lat: latitude, lng: longitude });
        try {
          const response = await reverseGeocode(longitude, latitude);
          const formattedAddress = formatAddress(response);
          setAddress(formattedAddress);
        } catch (error) {
          console.error('Error fetching address:', error);
        }
        // Check if this is the default geolocation
        if (!markerRef.current) {
          // Create a marker at the user's location
          markerRef.current = new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .addTo(map.current);
        }
      },
      (error) => {
        console.error('Error getting user location:', error);
        // Default to a fallback location (New York City)
        map.current.setCenter([-74.5, 40]);
      }
    );
  
    // Add geocoder control
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    });
    map.current.addControl(geocoder);
  
    // Add click event listener
    map.current.on('click', handleClick);
  
    // Add geolocation control
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });
    map.current.addControl(geolocate);
  
    return () => map.current.remove(); // Cleanup map on unmount
  }, []);

  

  return (
    <div>
      <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />
      {lngLat && (
        <div>
          Latitude: {lngLat.lat.toFixed(4)}, Longitude: {lngLat.lng.toFixed(4)}
        </div>
      )}
      {address && (
        <div>
          Address: {address}
        </div>
      )}
    </div>
  );
};

export default Map;
