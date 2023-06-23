import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Signup = (props) => {

    const [cred, setCred] = useState({ name: "", email: " ", password: "" })
    const [avatar, setavatar] = useState("")

    let navigate = useNavigate();
    const settingprofile = (file) => {
        console.log(file)
        if (file === undefined) {


            return;
        }


        else {
            const data = new FormData();
            data.append("file", file[0]);
            data.append("upload_preset", "we1wwysc");
            data.append("cloud_name", "dcaalrmnb");
            axios.post("https://api.cloudinary.com/v1_1/dcaalrmnb/image/upload", data).then((res) => res.data)
                .then((data) => {
                    setavatar(data.url.toString());
                    console.log(data.url.toString());

                });
        }
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        const url = `api/auth/createuser`
        const response = await fetch(url, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',


            },
            body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password, avatar: avatar })
        })
        const json = await response.json()
        console.log(json, json.success)
        if (json.success) {
            props.showAlert("Sing up successfully", "success")
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
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control bgcolor" id="name" name='name' onChange={onchange} minLength={3} required />
                    </div>
                    <div className="mb-3 my-3 mx-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control bgcolor" id="email" name='email' aria-describedby="email" onChange={onchange} required />

                    </div>
                    <div className="mb-3 my-3 mx-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control bgcolor" id="password" name="password" onChange={onchange} minLength={5} required />
                    </div>
                    <div className="mb-3 my-3 mx-3" >
                        <label htmlFor="img" className="form-label">Choose Profile:</label>
                        <input type="file" id="avatar" className='form-control bgcolor' name="avatar" accept="image/*" onChange={(e) => { settingprofile(e.target.files) }} />

                    </div>
                    <div className="text-center">

                        <button type="submit" className="btn btn-primary my-3 " style={{ backgroundColor: 'black', width: '50%' }}>Sign Up</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup
