import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Footer from '../component/Footer'
import "../component/styles/Style.css"

const Layout = () => {
    return (
        <main>
            {/* <nav className='navbar navbar-expand-lg bg-body-tertiary'>
                <h6 className='Project'>Project </h6 >
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <li className=' Project'>Project</li>
                        <li className='VavRight'>
                            <li><input type="text" placeholder='Email' /></li>
                            <li><input type="text" placeholder='Password' /></li>
                            <li className='me-5'><button>Sign in</button></li>
                        </li>
                        <div />
                    </ul>
                </div>
            </nav> */}

            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <a class="Project" href="#">Project</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className='nav-item VavRight'>
                                <li className='nav-item'><input className='nav-item' type="text" placeholder='Email' /></li>
                                <li className='nav-item'><input className='nav-item' type="text" placeholder='Password' /></li>
                                <li className='nav-item me-5'><button className='nav-item'>Sign in</button></li>
                            </li>

                            {/* <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li> */}
                            {/* <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li> */}
                            {/* <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li> */}
                            {/* <li class="nav-item">
                                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>


            <Outlet />

            <Footer />
        </main>
    )
}

export default Layout