const SocialMedia = () => {
    return <ul>
        <li>
            <a href="src/components/social/SocialMedia">
                <span aria-hidden="true"
                      className="fa-brands fa-linkedin"></span><span
                className="sr-only">LinkedIn</span></a>
        </li>
        <li>
            <a href="src/components/social/SocialMedia">
                <span aria-hidden="true" className="fa-brands fa-github"></span>
                <span className="sr-only">Github</span></a>
        </li>
        <li>
            <a href="mailto:asqatqazet@gmail.com">
                <span aria-hidden="true" className="fas fa-at"></span>
                <span className="sr-only">Email</span>
            </a>
        </li>

    </ul>
}

export default SocialMedia