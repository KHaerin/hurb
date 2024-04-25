export default function colorsDrop({onSelectColors}){

    const handleColorChange = (e) => {
        onSelectColors(e.target.value);
    };

    return(
        <>
                   <option value="Blue">Blue</option>
                   <option value="Purple">Purple</option>
                   <option value="Black">Black</option>
                   <option value="White">White</option>
                   <option value="Pink">Pink</option>
                   <option value="Green">Green</option>
                   <option value="Yellow">Yellow</option>
                   <option value="Red">Red</option>
                   <option value="Orange">Orange</option>
        </>
    )
}