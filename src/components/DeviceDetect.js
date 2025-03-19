import React,{ useEffect, useState } from 'react';
import { isMobile, isDesktop } from 'react-device-detect';


function DeviceBasedComponent() {
  
  const [orientation, setOrientation] = useState({alpha: 0, beta: 0, gamma: 0});
  const [hasPermission, setHasPermission] = useState(null)

  useEffect(() => {
    const requestPermission = async () => {
      if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
        try {
          const permission = await DeviceMotionEvent.requestPermission();
          setHasPermission(permission === "granted");
        } catch (error) {
          console.error("Permission request failed:", error);
          setHasPermission(false);
        }
      } else {
        setHasPermission(true); // Assume permission is granted for non-iOS devices
      }
    };

    requestPermission();
  }, []);

useEffect(() => {
  if ( hasPermission && isMobile) {
    const handleOrientation = (event) => {
      setOrientation({
        alpha: event.alpha !== null ? event.alpha.toFixed(2) : "N/A",
        beta: event.beta !== null ? event.beta.toFixed(2) : "N/A",
        gamma: event.gamma !== null ? event.gamma.toFixed(2) : "N/A",
      });
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }
}, [hasPermission]);



  return (
    <div>
      {isMobile && (
        <div>
          <h2>This is Mobile-Only Feature</h2>
          <p>This feature is only visible on mobile devices!</p>
          <p id="alpha">Alpha: {orientation.alpha} </p>
         <p id="beta">Beta: {orientation.beta}</p>
         <p id="gamma">Gamma: {orientation.gamma}</p>
        </div>
      )}

      {isDesktop && (
        <div>
          <h2>Desktop-Only Feature</h2>
          <p>This feature is only visible on desktop devices!</p>
        </div>
      )}
    </div>
  );
}

export default DeviceBasedComponent;
