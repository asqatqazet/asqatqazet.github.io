import {Component} from "react";

export class Intro extends Component {
    render() {
        return <section id="intro">
            <p className="name">Hi, my name is <span>Asihati (Asqat) Hazaiti</span></p>
            <h3> I create software systems.</h3>
            <p>I'm a software engineer specializing in Backend Development, Machine Learning and Data Analysis, User
                Authorization & Authentication
                ,Security And Networking technologies.</p>
            <p>Previously, I worked at <a href="src/components/introduction/Intro" target="_blank"> Thoughtworks</a>.</p>
            <p>Currently, I'm studying at <a href="src/components/introduction/Intro"
                                             target="_blank"> Universität Hamburg</a>.
            </p>
            <p>
               I am a problem solver, enthusiast in cultural exchanges. Quick learner, skilled team player,
can work well independently to handle tasks and always ready to go beyond basic solutions.
My interests lie in data and genetics, applying computational methods to various areas of biology,
such as genetic basis of diseases, drug discovery and evolution.
            </p>
        </section>
    }
}