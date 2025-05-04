import React, { useState, useEffect } from "react";
import { isMobile, isDesktop } from "react-device-detect";
import "./styles.css";

function DeviceBasedComponent() {
  const [orientation, setOrientation] = useState({ alpha: "N/A", beta: "N/A", gamma: "N/A" });
  const [hasPermission, setHasPermission] = useState(null);
  const [isSupported, setIsSupported] = useState(true);
  const [showPermissionButton, setShowPermissionButton] = useState(false);
  const [location, setLocation] = useState({latitude: null, longitude: null, altitude: null});
  const [acceleration, setAcceleration] = useState({x: null, y: null, z: null});
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleMotion = (event) => {
      if (event.acceleration){
        setAcceleration({
          x: event.acceleration.x,
          y: event.acceleration.y,
          z: event.acceleration.z,
        });
      }
    };

    if ("DeviceMotionEvent" in window){
      window.addEventListener("devicemotion", handleMotion);
    } else {
      setError("Device motion is not supported by your browser.");
    }

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    }
  }, []);


  useEffect(() => {
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const altitude = position.coords.altitude;
          setLocation({latitude, longitude, altitude});
        },
        (err) => {
          setError("Unable to retrieve location.");
          console.error(err);
        }
      );
    }else{
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (typeof DeviceOrientationEvent === "undefined") {
      setIsSupported(false);
      console.warn("Device orientation is not supported on this device.");
    }
  }, []);

  
  const requestPermission = async () => {
    if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
      try {
        const permission = await DeviceMotionEvent.requestPermission();
        if (permission === "granted") {
          setHasPermission(true);
          console.log("Motion permission granted.");
        } else {
          setHasPermission(false);
          console.error("Motion permission denied.");
        }
      } catch (error) {
        console.error("Error requesting permission:", error);
        setHasPermission(false);
      }
    } else {
      setHasPermission(true);
    }
  };

  useEffect(() => {
    if (isMobile && isSupported) {
      if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
        setShowPermissionButton(true); 
      } else {
        setHasPermission(true); 
      }
    }
  }, [isSupported]);

  useEffect(() => {
    const handleOrientation = (event) => {
      if (event.alpha !== null && event.beta !== null && event.gamma !== null) {
        console.log("Device orientation updated:", event.alpha, event.beta, event.gamma);
        setOrientation((prev) => ({
          ...prev,
          alpha: event.alpha.toFixed(1),
          beta: event.beta.toFixed(1),
          gamma: event.gamma.toFixed(1),
        }));
      } else {
        console.warn("Device orientation event received but values are null.");
      }
    };

    if (hasPermission && isMobile && isSupported) {
      console.log("Adding event listener for device orientation...");
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      console.log("Removing event listener for device orientation...");
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [hasPermission, isSupported]);

  return (
    <div className="container">
      {isMobile && (
        <div style={{backgroundColor: "none"}}>
          <h2 className="text-xl font-bold">Mobile-Only Feature</h2>
          <p>This feature is only visible on mobile devices!</p>

          {!isSupported && <p>Your device does not support orientation sensors.</p>}

          {isSupported && hasPermission === false && (
            <p>Permission denied. Enable motion and orientation access in your browser settings.</p>
          )}

          {isSupported && hasPermission === null && showPermissionButton && (
            <button onClick={requestPermission} className="bg-blue-500 text-white px-4 py-2 rounded">
              Request Permission
            </button>
          )}

          {isSupported && hasPermission && (
            <>
              <p>This feature is only visible on the mobile.</p>
              <p>Alpha : {orientation.alpha}°</p>
              <p>Beta : {orientation.beta}°</p>
              <p>Gamma : {orientation.gamma}°</p>
              <p>Latitude: {location.latitude}°</p>
              <p>Longitude: {location.longitude}°</p>
              <p>Altitude: {location.altitude} </p>
            </>
          )}
        </div>
      )}

      {isDesktop && (
        <div style={{backgroundColor: "none"}}>
          <h2 className="text-xl font-bold">Desktop-Only Feature</h2>
          <p>This feature is only visible on desktop devices!</p>
          <p>Latitude: {location.latitude} </p>
          <p>Longitude: {location.longitude}</p>
          <p>Altitude: {location.altitude}</p>
        </div>
      )}
    </div>
  );
}

export default DeviceBasedComponent;
