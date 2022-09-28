const ProjectItem = (props) => {
    let {projectTag, title, desc, techStacks, image, index} = props
    return <article className={index % 2 === 0 ? "" : "reverse"}>
        <div className="text">
            <h4>{projectTag}</h4>
            <h3>{title}</h3>
            <p className="blackbox" dangerouslySetInnerHTML={{__html: desc}}></p>
            <h4>Technologies used include:</h4>
            <ul>{
                techStacks && techStacks.map(
                    (techStack,index)=> <li key={index}>{techStack}</li>
                )
            }
            </ul>
        </div>
        <img src={image}
             alt="Screenshot of the Wall of Wonder."/>
    </article>
}

export default ProjectItem