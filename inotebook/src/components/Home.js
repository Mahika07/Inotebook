import React from 'react'
import Addnote from './Addnote'
import Notes from './Notes'

const Home = (props) => {



    return (

        <>

            <div className='flexible my-3'>
                <Addnote showAlert={props.showAlert} />
                <Notes showAlert={props.showAlert} />
            </div>

        </>
    )
}

export default Home
