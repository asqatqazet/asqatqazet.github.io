import {Component} from "react";
import withBottomLineGradient from "../../components/hoc/withBottomLineGradient";
import RenderBackground from "../../components/renderbackground/RenderBackground";
import {ContentWithImage} from "../../components/projects/ContentWithImage";
import intro from "../../data/self-intro.json"
import me from "../../data/me.png"

//handle local image
intro[0].image = me

let BottomLinedGradientBackground = withBottomLineGradient(
    RenderBackground
);
intro[0].techIntro = "Languages I know";

export class About extends Component {

    render() {
        return <BottomLinedGradientBackground
            backgroundColor={'var(--dkblue)'}
            renderContent={() => <ContentWithImage
                title="About Asihati Hazaiti"
                contentItems={intro}
            />}
        />
    }
}