import React from 'react'
import Helmet from 'react-helmet'
import errorImg from '../../img/error.svg'
export default function NotFound() {
  return (
    <>
    <Helmet>
      <title>Not Found</title>
    </Helmet>
      <div className="d-flex justify-content-center py-5">
      <img src={errorImg} alt="error 404" />
      </div>
    </>
  )
}
