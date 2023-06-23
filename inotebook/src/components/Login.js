import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {

    const [cred, setCred] = useState({ email: " ", password: "" })
    let navigate = useNavigate();
    const handlesubmit = async (e) => {
        e.preventDefault();
        const url = `api/auth/login`
        const response = await fetch(url, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',


            },
            body: JSON.stringify({ email: cred.email, password: cred.password })
        })
        const json = await response.json()
        if (json.success) {
            props.showAlert("logged in successfully", "success")
            localStorage.setItem("token", json.token)

            localStorage.setItem("UserDeatils", JSON.stringify(json.user))
            navigate("/")
        }
        else {
            props.showAlert("Invalid Credentials!", "danger")
        }
    }

    const onchange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='container my-5'>
                <form className='res_form' autoComplete='off' style={{ border: '6px solid #e9b8e9' }} onSubmit={handlesubmit}>

                    <div className="mb-3 my-3 mx-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control bgcolor" id="email" name='email' aria-describedby="emailHelp" value={cred.email} onChange={onchange} />

                    </div>
                    <div className="mb-3 my-3 mx-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control bgcolor" id="password" name='password' value={cred.password} onChange={onchange} />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary my-3" style={{ backgroundColor: 'black', width: '50%' }}>Login</button>

                    </div>

                </form>
            </div>
        </>
    )
}

export default Login
