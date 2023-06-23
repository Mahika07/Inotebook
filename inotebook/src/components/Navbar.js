import { React, useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";

const Navbar = (props) => {

    const [user, setUser] = useState([]);
    let location = useLocation();
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("UserDeatils"));
        if (items) {
            setUser(items);
        }
    }, [location]);
    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("UserDeatils")
        props.showAlert("successfully logged out", "dark")
    }

    return (




        <>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'rgb(233 184 233)' }}>
                <div className="container-fluid">

                    <a className="navbar-brand" >iNoteBook</a>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>


                        </ul>

                    </div>

                    {!localStorage.getItem("token") ? <div className="gap-2 d-flex justify-content-end">
                        <Link className="btn btn-dark me-md-2" to="/login" role="button">Login</Link>
                        <Link className="btn btn-dark me-md-2" to="/signup" role="button">Sign up</Link>

                    </div> : <div className="gap-4 d-flex justify-content-end">
                        <div>   <img src={user.avatar} alt="avatar"
                            className="imground img-fluid" /></div>
                        <div>  <Link className="btn btn-dark my-2" to="/login" onClick={handleLogout} role="button">Logout</Link></div>


                    </div>}
                </div>
            </nav>
        </>
    )
}

export default Navbar
