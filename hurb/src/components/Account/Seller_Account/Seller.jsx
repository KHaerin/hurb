import {Link} from 'react-router-dom';
import SellerMenu from './SellerMenu';

export default function Seller(){
    return(
        <>
        <div className="container-fluid" id="account-container">
            <div className="row gap-5">
               <SellerMenu></SellerMenu>
                <div className="col">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="header bg-secondary d-flex justify-content-center p-2">
                                    <h1>Dashboard</h1>
                                </div>
                            </div>
                            <div className="row mb-5">
                                    <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <h1>table</h1>
                                        </div>
                                        <div className="col d-flex justify-content-end gap-5">
                                            <h1>total sales</h1>
                                            <h1>avg. order value</h1>
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div className="col d-flex justify-content-end gap-5">
                                        <h1>order sessions</h1>
                                            <h1>conversion rate</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <h1>Selling Products</h1>
                                </div>
                                <div className="col">
                                    <h1>
                                        Top Products
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </div>
        </>
    )
}