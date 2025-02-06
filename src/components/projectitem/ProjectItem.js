const ProjectItem = (props) => {
    let {projectTag, title, desc, techStacks, image, index,techIntro } = props
    if (!techIntro) techIntro = "Technologies Used"
    return <article className={index % 2 === 0 ? "" : "reverse"}>
        <div className="text">
            <h4>{projectTag}</h4>
            <h3>{title}</h3>
            <p className="blackbox" dangerouslySetInnerHTML={{__html: desc}}></p>
            <h4>{techIntro}</h4>
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