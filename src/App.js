import logo from './logo.svg';
import './App.css';
import './components/Button.js';
import FloatingButtons from './components/Button.js';
import ImageComparison from './components/ImageSlider.js';
import DeviceBasedComponent from './components/DeviceDetect.js';


function App() {
  return (
   <div>
   <DeviceBasedComponent />
   </div>
  );
}

export default App;
