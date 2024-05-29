import React from 'react'

function NotAdmin() {
  return (
    <>
        <div className="container-fluid">
            <div className="row">
                <div className="col d-flex justify-content-center align-items-center">
                    <h1>Unauthorized Access!</h1>   
                </div> 
            </div>
            <div className="row">
              <div className="col d-flex justify-content-center align-items-center">
                  <a href="/">Return</a>
                </div>
            </div>
        </div>
    </>
  )
}

export default NotAdmin