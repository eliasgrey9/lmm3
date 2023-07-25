import React, { useState, useEffect } from "react";
import Circle from "react-circle";

const CircleProgress = ({ percentage }) => {
  const [progress, setProgress] = useState(0);

  // Update the progress whenever the percentage prop changes
  useEffect(() => {
    setProgress(percentage);
  }, [percentage]);

  return (
    <div>
      <Circle
        animate={true} // Boolean: Animated/Static progress
        animationDuration="1s" //String: Length of animation
        responsive={true} // Boolean: Make SVG adapt to parent size
        size={150} // Number: Defines the size of the circle.
        lineWidth={14} // Number: Defines the thickness of the circle's stroke.
        progress={percentage} // Number: Update to change the progress and percentage.
        progressColor="#5b68ef" // String: Color of "progress" portion of circle.
        bgColor="whitesmoke" // String: Color of "empty" portion of circle.
        textColor="#5b68ef" // String: Color of percentage text color.
        textStyle={{
          font: "bold 4rem Helvetica, Arial, sans-serif", // CSSProperties: Custom styling for percentage.
        }}
        percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
        roundedStroke={true} // Boolean: Rounded/Flat line ends
        showPercentage={true} // Boolean: Show/hide percentage.
        showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
      />
    </div>
  );
};

export default CircleProgress;
