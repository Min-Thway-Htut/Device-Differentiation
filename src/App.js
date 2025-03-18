import logo from './logo.svg';
import './App.css';
import './components/Button.js';
import FloatingButtons from './components/Button.js';
import ImageComparison from './components/ImageSlider.js';

function App() {
  return (
   <div>
    <ImageComparison />
   <FloatingButtons />
   </div>
  );
}

export default App;
