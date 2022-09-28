import {Component} from "react";

class RenderBackground extends Component {

    render() {
        const {backgroundColor, renderContent} = this.props
        return <div style={{backgroundColor: `${backgroundColor}`}}>
            {renderContent()}
        </div>
    }
}

export default RenderBackground