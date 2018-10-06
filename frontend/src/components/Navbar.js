import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" href="/" to="/">Redux Node Auth</Link>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <Link className="nav-link" href="/" to="/">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link className="nav-link" href="/register" to="/register">Register</Link>
                        </li>
                        <li class="nav-item">
                            <Link className="nav-link" href="/login" to="/login">Login</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;