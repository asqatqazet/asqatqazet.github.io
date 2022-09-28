import {Component} from "react";

export class Intro extends Component {
    render() {
        return <section id="intro">
            <p className="name">Hi, my name is <span>Askhat</span></p>
            <h2> I create software systems.</h2>
            <p>I'm a developer specializing in backend , frontend , user authorization & authentication
                technologies.</p>
            <p>Currently, I'm working at <a href="src/components/introduction/Intro" target="_blank">Thoughtworks.</a>
            </p>
        </section>
    }
}