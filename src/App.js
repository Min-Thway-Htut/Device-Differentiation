import logo from './logo.svg';
import './App.css';
import './components/Button.js';
import FloatingButtons from './components/Button.js';
import ImageComparison from './components/ImageSlider.js';
import DeviceBasedComponent from './components/DeviceDetect.js';


function App() {
  return (
   <div>
   <h1>Device Detection Example</h1>
   <DeviceBasedComponent />
   </div>
  );
}

export default App;
