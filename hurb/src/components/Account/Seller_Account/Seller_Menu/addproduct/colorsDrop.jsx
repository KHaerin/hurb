export default function colorsDrop({ onSelectColors, selectedColors, allSelectedColors }){

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