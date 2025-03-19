import React, { useState, useEffect } from "react";
import { isMobile, isDesktop } from "react-device-detect";

function DeviceBasedComponent() {
  const [orientation, setOrientation] = useState({ alpha: "N/A", beta: "N/A", gamma: "N/A" });
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
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
        setHasPermission(true); // Assume permission is granted for non-iOS devices
      }
    };

    requestPermission();
  }, []);

  useEffect(() => {
    const handleOrientation = (event) => {
      if (event.alpha !== null && event.beta !== null && event.gamma !== null) {
        console.log("Device orientation updated:", event.alpha, event.beta, event.gamma);
        setOrientation({
          alpha: event.alpha.toFixed(2),
          beta: event.beta.toFixed(2),
          gamma: event.gamma.toFixed(2),
        });
      } else {
        console.warn("Device orientation event received but values are null.");
      }
    };

    if (hasPermission && isMobile) {
      console.log("Adding event listener for device orientation...");
      window.addEventListener("deviceorientation", handleOrientation);
      return () => {
        console.log("Removing event listener for device orientation...");
        window.removeEventListener("deviceorientation", handleOrientation);
      };
    }
  }, [hasPermission]);

  return (
    <div>
      {isMobile && (
        <div>
          <h2>Mobile-Only Feature</h2>
          <p>This feature is only visible on mobile devices!</p>
          {hasPermission === false && <p>Permission denied. Enable motion sensors in browser settings.</p>}
          {hasPermission === null && <p>Requesting motion permission...</p>}
          {hasPermission && (
            <>
              <p>Alpha: {orientation.alpha}</p>
              <p>Beta: {orientation.beta}</p>
              <p>Gamma: {orientation.gamma}</p>
            </>
          )}
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

