import {Link} from 'react-router-dom';


export default function SellerMenu(){
    return(
        <>
         <div className="col-auto" id="dashboard-container">
                    <div className="container dashboard">
                        <div className="image-cont d-flex align-items-center gap-3 mb-4">
                            <img src="" alt="profile" className="d-flex" id="profile-picture" />
                            <span>name</span>
                        </div>
                        <hr className="border border-dark border-1 opacity-40" id="hr"/>
                        <div className="dashboard-menu">
                            <ul className="navbar-nav gap-2">
                                <li className="nav-item mb-4">
                                    <Link to="/seller" className="nav-link active">Dashboard</Link>
                                </li>
                                    
                                <li className="nav-item">
                                    <Link to="/seller/products" className="nav-link">Products</Link>
                                </li>

                                <li className="nav-item mb-5">
                                    <a href="" className="nav-link">Orders</a>
                                </li>

                                <li className="nav-item">
                                    <a href="" className="nav-link">Profile</a>
                                </li>

                                <li className="nav-item">
                                    <a href="" className="nav-link">Settings</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
        </>
    )
}