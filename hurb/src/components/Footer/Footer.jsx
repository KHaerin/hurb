export default function Footer(){
    return(
        <>
        <hr className="border border-secondary border-2 opacity-100"/>
        <footer>
            <div className="container-fluid mb-5">
                <div className="row d-flex justify-content-evenly">
                    <div className="col-auto d-flex flex-column">
                        <span className="mb-5 mt-4"> Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.</span>
                        <span> Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.</span>
                    </div>

                    <div className="col-auto mt-3">
                        <div className="details mb-2">
                            <label htmlFor="">Email: </label>
                            <a href="#"> BCC1@gmail.com</a>
                        </div>

                        <div className="details mb-2">
                            <label htmlFor="">Instagram: </label>
                            <span> Lorem ipsum dolor sit amet consectetur.</span>
                        </div>

                        <div className="details mb-2">
                            <label htmlFor="">Facebook: </label>
                            <span> Lorem ipsum dolor sit amet consectetur.</span>
                        </div>

                        <div className="details mb-2">
                            <label htmlFor="">WhatsApp: </label>
                            <span> Lorem ipsum dolor sit amet consectetur.</span>
                        </div>
                    </div>

                    <div className="col-auto d-flex  flex-column justify-content-center align-items-center">
                            <h1>Business Name</h1>
                            <button className="btn btn-primary">contact us</button>
                    </div>
                </div>
               
            </div>
        </footer>
        </>
    )
}