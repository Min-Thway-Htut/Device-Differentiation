import React,{ useEffect, useState } from 'react';
import { isMobile, isDesktop } from 'react-device-detect';


function DeviceBasedComponent() {
  
  const [orientation, setOrientation] = useState({alpha: 0, beta: 0, gamma: 0});

useEffect(() => {
  if (isMobile) {
    const handleOrientation = (event) => {
      setOrientation({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
      });
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }
}, []);



  return (
    <div>
      {isMobile && (
        <div>
          <h2>Mobile-Only Feature</h2>
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
