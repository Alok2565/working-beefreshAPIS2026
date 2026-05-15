import React from 'react'

function Page404Error() {
    return (
        <>
            <div className="d-flex flex-column align-items-center justify-content-center vh-100">
                <h1 className="display-1 fw-bold text-danger">404</h1>
                <h2 className="mb-3">Page Not Found</h2>
                <p className="text-muted">Oops! The page you're looking for doesn't exist.</p>
                <a href="/" className="btn btn-primary">
                    Go Home
                </a>
            </div>
        </>
    )
}

export default Page404Error
