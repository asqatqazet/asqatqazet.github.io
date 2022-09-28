import {Intro} from "../../components/introduction/Intro";
import {ContentWithImage} from "../../components/projects/ContentWithImage";
import Contact from "../../components/contact/Contact";
import withBottomLineGradient from "../../components/hoc/withBottomLineGradient";
import RenderBackground from "../../components/renderbackground/RenderBackground";
import projects from "../../data/projects.json"

let BottomLinedGradientBackground = withBottomLineGradient(
    RenderBackground
);

const Home = () => {
    return <>
        <BottomLinedGradientBackground
            renderContent={() => <Intro/>}
        />
        <BottomLinedGradientBackground
            backgroundColor={'var(--dkblue)'}
            renderContent={
                () => <ContentWithImage
                    title="Projects I'm Proud of"
                    contentItems={projects}
                />
            }
        />
        <BottomLinedGradientBackground
            backgroundColor={'var(--plum)'}
            renderContent={() => <Contact/>}
        />
    </>
}

export default Home