import React from 'react';
import DiagramEngine from '../library/engine/DiagramEngine';
import RenderEngine from '../library/engine/RenderEngine';
import ModelTray from '../library/tray/ModelTray';
import EditBar from '../library/editbar/EditBar';

class ModelPage extends React.Component {
    DiagramEngine;
    
    constructor(props) {
        super();

        this.DiagramEngine = props.engine ? props.engine : new DiagramEngine();
        // this.DiagramEngine = new DiagramEngine();
        document.body.style.overflow = 'hidden'; // stop scrolling on the page
    }

    // gets the nodeName from the event data, then creates the node in the engine
    trayItemDrop = (event) => {
        let nodeName = event.dataTransfer.getData('CustomNode');
        this.DiagramEngine.createCustomNode(nodeName, this.DiagramEngine.getEngine().getRelativeMousePoint(event));
        this.forceUpdate(); // updates the rendering to show the newly created node
    }
    
    // displays the tray on the left, canvas on the right, and editbar on top
    render() {
        return(
            <>
            <EditBar engine={this.DiagramEngine}/>
            <div style={{display: 'flex'}}
            onDrop={this.trayItemDrop}
            onDragOver={(event) => {event.preventDefault()}}
            >
                <ModelTray customNodes={Object.keys(this.DiagramEngine.getCustomNodes())}/>
                <RenderEngine engine={this.DiagramEngine}/>
            </div>
            </>
        );
    }
}

export default ModelPage;