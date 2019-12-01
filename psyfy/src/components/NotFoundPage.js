import React from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
    return (
        <div style={{ minHeight: '100vh' }}>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>4<span></span>4</h1>
                    </div>
                    <div style={{ fontSize: 'calc(20px + 1.5vw)' }}>
                        <b className="text-bold-white">Oops! Page Not Found</b>
                    </div>
                    <div style={{ position: 'relative', top: '25px' }}>
                        <Link to="/">
                            <a href="#">
                                Back to Home Page
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NotFoundPage