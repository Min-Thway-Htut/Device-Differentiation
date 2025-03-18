import React from 'react';
import { isMobile, isDesktop } from 'react-device-detect';

function DeviceBasedComponent() {
  return (
    <div>
      {isMobile && (
        <div>
          <h2>Mobile-Only Feature</h2>
          <p>This feature is only visible on mobile devices!</p>
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
