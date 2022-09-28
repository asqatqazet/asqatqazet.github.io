import {Component} from "react";
import ContentItem from "../projectitem/ProjectItem";

export class ContentWithImage extends Component {
    render() {
        const {title,contentItems} = this.props
        return <section id="projects">
            <h2>{title}</h2>
            {
                contentItems && contentItems.map(
                    (project, index) => <ContentItem key={index} {...project} index={index}/>
                )
            }
        </section>
    }
}