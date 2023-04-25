import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'

export default function MyAccount() {
  return (
    <>
    <Helmet>
      <title>FreshCart my account</title>
    </Helmet>
      <div className="row py-5">
        <div className="col-12">
          <Link to={`/updateuserdata`}><button className='btn btn-success w-100 my-3'>Update user Data</button></Link>
        </div>
        <div className="col-12">
          <Link to={`/updatepassword`}><button className='btn btn-success w-100 my-3'>Update password</button></Link>
        </div>
      </div>
    </>
  )
}
