import './filter.css';
import {useNavigate} from 'react-router-dom';
export default function Filter({ isVisible, products, onCategorySelect }){
    const navigate = useNavigate();
    const uniqueSubCategories = [...new Set(products.map(product => product.product_sub_category))];

    const handleSubCategoryClick = (subCategory) => {
        if (subCategory === "All Items") {
            // For "All" category, navigate to the default shop route
            navigate('/shop');
            
        } else {
            // For other categories, update the selected category state and URL
            onCategorySelect("Men's Collection", subCategory);
            navigate(`/shop#${subCategory}`);
        }
    };

    return(
        <>
        <div className={`filter-section ${isVisible ? 'visible' : 'hidden'}`}>
            <div className="row">
                <div className="col-auto" id="item-category">
                    <nav className="nav d-flex flex-column">
                        <a href="/shop" id="shop-category" onClick={() => handleSubCategoryClick("All Items")} className='nav-link'>All</a>
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
            {/* <div className="row row-cols-1" id="gender">
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
            </div> */}
            <div className="row row-cols-1" id="shop-by-price">
                <div className="col">
                    <h3>Sort By</h3>
                </div>
                <div className="col-auto">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="under3kCheck" />
                        <label htmlFor="under3kCheck" className="form-check-label">Highest</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="3kTo6kCheck" />
                        <label htmlFor="3kTo6kCheck" className="form-check-label">Lowest To Highest</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="3kTo6kCheck" />
                        <label htmlFor="3kTo6kCheck" className="form-check-label">Newest Arrival</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="3kTo6kCheck" />
                        <label htmlFor="3kTo6kCheck" className="form-check-label">Popular Items</label>
                    </div>
                    <hr className="border border-dark border-1 opacity-40" />
                </div>
            </div>
        </div>
        </>
    );
}