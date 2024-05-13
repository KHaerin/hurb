import React, { useState } from 'react';
import ColorsDrop from './colorsDrop';

export default function SizeColorSection({ sizes, handleSizeChange, handleQuantityChange, handleImgChange}) {
    const [selectedColor, setSelectedColor] = useState('');
    const [sizeData, setSizeData] = useState({});

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const sizeColors ={
        backgroundColor: "#FFFFFF",
    }

    console.log('sizeData:', sizeData); // Debugging statement

    return (
        <div className="row p-4 w-50 mb-3" style={sizeColors}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-auto">
                        <div className="input-group mb-3">
                            <select
                                className="form-select"
                                value={selectedColor}
                                onChange={(e) => handleColorChange(e.target.value)}
                            >
                                <option value="">Select a color</option>
                                <ColorsDrop onSelectColors={setSelectedColor} />
                            </select>
                        </div>
                    </div>
                </div>
                {sizes.map((size, index) => (
                    <div className="row d-flex align-items-center" id="color-size-fields" key={index}>
                        <div className="col-lg-2">
                            <div className="form-check d-flex gap-2">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    onChange={() => handleSizeChange(size)}
                                    id={size}
                                    checked={!!sizeData[size]} // Use !! to convert undefined/null to false
                                />
                                <label htmlFor={size} className="form-check-label">
                                    {size === 'XS' && 'Extra Small'}
                                    {size === 'S' && 'Small'}
                                    {size === 'M' && 'Medium'}
                                    {size === 'L' && 'Large'}
                                    {size === 'XL' && 'Extra Large'}
                                    {size === 'XXL' && size}
                                    {size === 'XXXL' && size}
                                </label>
                            </div>
                        </div>
                        {sizeData[size] && (
                            <>
                                <div className="col-auto">
                                    <div className="form-floating mb-3">
                                        <input
                                            type="number"
                                            className="form-control form-control-sm"
                                            value={sizeData[size].quantity || ''}
                                            onChange={(e) => handleQuantityChange(size, e.target.value)}
                                            placeholder="Quantity"
                                        />
                                        <label htmlFor={`quantity-${size}`}>Stock</label>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                ))}
                <div className="row">
                    <div className="col mt-5">
                        <input
                            className="form-control mb-3"
                            onChange={(e) => handleImgChange(e.target.files[0])}
                            name="product_img"
                            type="file"
                            id="formFile"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
