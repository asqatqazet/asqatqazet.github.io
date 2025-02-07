import {Link, NavLink} from "react-router-dom";
import {HashLink} from "react-router-hash-link";

const NavBar = () => {

    return <nav>
        <ul>
            <li>
                <h1>
                    <Link to="/">
                        <span className="fa-solid fa-moon"></span>
                        <span>Asqat</span>
                    </Link>
                </h1>
            </li>

            <li>
                <HashLink to="/#projects">

                    <span>
                        Projects
                    </span>

                </HashLink>
            </li>
            <NavLink to="/about" style={({isActive}) => {
                return isActive ? {display: 'none'} : {}
            }}>
                <li>

                    <span>
                        About
                    </span>
                </li>

            </NavLink>

            <li>
                <HashLink to="/#contact">
                    <span>Contact</span>
                </HashLink>
            </li>
            <li>
                <a href="https://www.linkedin.com/in/asqat/">
                    <span aria-hidden="true" className="fa-brands fa-linkedin"></span>
                    <span className="sr-only">LinkedIn</span>
                </a>
            </li>
            <li>
                <a href="https://github.com/asqatqazet"><span aria-hidden="true" className="fa-brands fa-github"></span><span
                    className="sr-only">Github</span></a>
            </li>
            <li>
                <a href="Asihat_Hazaiti_Dec_2024_Res_CV.pdf" className="button">Resumé</a>
            </li>
        </ul>
    </nav>
}

export default NavBar

