export default function dropColor({ onSelectColors, selectedColors, allSelectedColors }){

    const handleColorChange = (e) => {
        onSelectColors(e.target.value);
    };

    const colorOptions = ["Blue", "Purple", "Black", "White", "Pink", "Green", "Yellow", "Red", "Orange"];
    const defaultStyle = {
        color: '#000000',
    };
    const disabledStyle = {
        color: '#808080', 
    };
    return(
        <>
        {colorOptions.map((color, index) => (
                <option 
                    key={index} 
                    value={color} 
                    style={allSelectedColors.includes(color) && selectedColors !== color ? disabledStyle : defaultStyle}
                    disabled={allSelectedColors.includes(color) && selectedColors !== color} 
                >
                    {color}
                </option>
            ))}
    </>
    )
}


// import React, { useState, useEffect } from "react";

// export default function DropColor({ onSelectColors, selectedColor, allSelectedColors }) {
//   const handleColorChange = (e) => {
//     onSelectColors(e.target.value);
//   };

//   const colorOptions = ["Blue", "Purple", "Black", "White", "Pink", "Green", "Yellow", "Red", "Orange"];

//   const [disabledColors, setDisabledColors] = useState([]);

//   useEffect(() => {
//     // Filter out the selected color and set other selected colors as disabled
//     const newDisabledColors = allSelectedColors.filter(color => color !== selectedColor);
//     setDisabledColors(newDisabledColors);
//   }, [selectedColor, allSelectedColors]);

//   const defaultStyle = {
//     color: '#000000',
//   };
//   const disabledStyle = {
//     color: '#808080',
//   };

//    useEffect(() => {
//     console.log('all: ', allSelectedColors);
//     console.log('select: ', selectedColor);
//     console.log('on select: ', onSelectColors)
//     console.log('disabled: ', disabledColors)
//   }, [])

//   return (
//     <>
//       {colorOptions.map((color, index) => (
//         <option
//           key={index}
//           value={color}
//           style={disabledColors.includes(color) ? disabledStyle : defaultStyle}
//           disabled={disabledColors.includes(color)}
//           onChange={handleColorChange}
//         >
//           {color}
//         </option>
//       ))}
//     </>
//   );
// }



// //  useEffect(() => {
// //     console.log('all: ', allSelectedColors);
// //     console.log('select: ', selectedColor);
// //     console.log('on select: ', onSelectColors)
// //     console.log('disabled: ', disabledColors)
// //   }, [])