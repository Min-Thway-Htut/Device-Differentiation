import React, { useState, useEffect } from "react";
import { isMobile, isDesktop } from "react-device-detect";

function DeviceBasedComponent() {
  const [orientation, setOrientation] = useState({ alpha: "N/A", beta: "N/A", gamma: "N/A" });
  const [hasPermission, setHasPermission] = useState(null);
  const [isSupported, setIsSupported] = useState(true);
  const [showPermissionButton, setShowPermissionButton] = useState(false);

  useEffect(() => {
    if (typeof DeviceOrientationEvent === "undefined") {
      setIsSupported(false);
      console.warn("Device orientation is not supported on this device.");
    }
  }, []);

  // Function to request motion/orientation permission on iOS
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
        setShowPermissionButton(true); // Show button only for iOS devices
      } else {
        setHasPermission(true); // Assume permission is granted for non-iOS devices
      }
    }
  }, [isSupported]);

  useEffect(() => {
    const handleOrientation = (event) => {
      if (event.alpha !== null && event.beta !== null && event.gamma !== null) {
        console.log("Device orientation updated:", event.alpha, event.beta, event.gamma);
        setOrientation((prev) => ({
          ...prev,
          alpha: event.alpha.toFixed(2),
          beta: event.beta.toFixed(2),
          gamma: event.gamma.toFixed(2),
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
    <div className="p-4 text-center">
      {isMobile && (
        <div>
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
              <p>Alpha (Z-axis): {orientation.alpha}°</p>
              <p>Beta (X-axis): {orientation.beta}°</p>
              <p>Gamma (Y-axis): {orientation.gamma}°</p>
            </>
          )}
        </div>
      )}

      {isDesktop && (
        <div>
          <h2 className="text-xl font-bold">Desktop-Only Feature</h2>
          <p>This feature is only visible on desktop devices!</p>
        </div>
      )}
    </div>
  );
}

export default DeviceBasedComponent;
