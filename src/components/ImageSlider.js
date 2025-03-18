import { ImgComparisonSlider } from "@img-comparison-slider/react";


function ImageComparison() {
    return (   
        <ImgComparisonSlider>
        <img slot="first" src="" />
        <img slot="second" src="./original-image.jpg" />
      </ImgComparisonSlider>
    );
  }
  
export default ImageComparison;