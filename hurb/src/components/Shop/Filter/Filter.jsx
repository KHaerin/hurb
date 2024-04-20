import Black from '../../color-images/black.jpg';
import Red from '../../color-images/red.jpg';
import Grey from '../../color-images/grey.jpeg';
import Navy from '../../color-images/navy blue.jpg';
import White from '../../color-images/white.jpg';
import './filter.css';

export default function Filter({ isVisible, products, onCategorySelect }){

    const uniqueSubCategories = [...new Set(products.map(product => product.product_sub_category))];

    const handleSubCategoryClick = (subCategory) => {
        if (subCategory === "/shop") {
            // Pass down null or an empty string to indicate all items are selected
            onCategorySelect("Men's Collection", 'All Items');
        } else {
            onCategorySelect("Men's Collection", subCategory);
        }
    };

    return(
        <>
        <div className={`filter-section ${isVisible ? 'visible' : 'hidden'}`}>
            <div className="row">
                <div className="col-auto" id="item-category">
                    <nav className="nav d-flex flex-column">
                        <a href="/shop" id="shop-category" onClick={() => handleSubCategoryClick("/shop")} className='nav-link'>All</a>
                    {uniqueSubCategories.map((subCategory, index) => (
                            <a 
                                href={`#${subCategory}`} 
                                id="shop-category" 
                                className="nav-link" 
                                key={index} 
                                onClick={() => handleSubCategoryClick(subCategory)}
                            >
                                {subCategory}
                            </a>
                        ))}
                    </nav>
                    <hr className="border border-dark border-1 opacity-40" />
                </div>
            </div>
            <div className="row row-cols-1" id="gender">
                <div className="col">
                    <h3>Gender</h3>
                </div>
                <div className="col-auto">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="uniCheck" defaultChecked/>
                        <label htmlFor="uniCheck" className="form-check-label">Unisex</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="menCheck" />
                        <label htmlFor="menCheck" className="form-check-label">Men</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="womenCheck" />
                        <label htmlFor="womenCheck" className="form-check-label">Women</label>
                    </div>
                    <hr className="border border-dark border-1 opacity-40" />
                </div>
            </div>
            <div className="row row-cols-1" id="shop-by-price">
                <div className="col">
                    <h3>Shop By Price</h3>
                </div>
                <div className="col-auto">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="under3kCheck" />
                        <label htmlFor="under3kCheck" className="form-check-label">Under $3,000</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="3kTo6kCheck" />
                        <label htmlFor="3kTo6kCheck" className="form-check-label">$3,000 - $6,000</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="6kTo11kCheck" />
                        <label htmlFor="6kTo11kCheck" className="form-check-label">$6,001 - $11,119</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="over12kCheck" />
                        <label htmlFor="over12kCheck" className="form-check-label">Over $12,000</label>
                    </div>
                    <hr className="border border-dark border-1 opacity-40" />
                </div>
            </div>
            <div className="row row-cols-1" id="colours">
                <div className="col">
                    <h3>Colours</h3>
                </div>
                <div className="col-auto d-flex gap-4">
                    <input type="radio" className="btn-check" name="options-base" id="option1" autoComplete="off" defaultChecked />
                    <label htmlFor="option1" className="btn color-radio"><img src={Black} alt="" id="color-radio-img" /></label>

                    <input type="radio" className="btn-check" name="options-base" id="option2" autoComplete="off" />
                    <label htmlFor="option2" className="btn color-radio"><img src={White} alt="" id="color-radio-img" /></label>

                    <input type="radio" className="btn-check" name="options-base" id="option3" autoComplete="off" />
                    <label htmlFor="option3" className="btn color-radio"><img src={Red} alt="" id="color-radio-img" /></label>
                </div>
            </div>
        </div>
        </>
    );
}