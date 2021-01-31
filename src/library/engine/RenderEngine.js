import React from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import '../../resources/styles/RenderEngine.css'

class RenderEngine extends React.Component {
    minZoom = 65;
    maxZoom = 175;
    CurrentModel;
    Engine;

    constructor(props) {
        super();

        this.state = {
            offsetX: 0,
            offsetY: 0,
            zoom: props.engine.getEngine().getModel().getZoomLevel()
        }

        this.Engine = props.engine;

        // listen for model update
        this.Engine.getEngine().registerListener({
            modelUpdated: (event) => {
                this.registerNewModel()
            }
        })
    }

    // registers new model after component is mounted so setState can be called
    componentDidMount() {
        this.registerNewModel(); // register current model
    }

    // handles the case of a new model being registered with the engine
    registerNewModel = () => {
        let currentModel = this.Engine.getEngine().getModel();

        this.Engine.registerModelListener({
            eventDidFire: ({ offsetX, offsetY, zoom }) => {
                // update grid offset values
                this.setState({ offsetX: offsetX, offsetY: offsetY });
                
                // keeps zoom level at min and max zoom if zoom changed                
                if (zoom !== this.state.zoom) {
                    if (zoom < this.minZoom) {
                        zoom = this.minZoom;
                        currentModel.setZoomLevel(zoom);
                    }
                    else if (zoom > this.maxZoom) {
                        zoom = this.maxZoom;
                        currentModel.setZoomLevel(zoom);
                    }

                    // update grid zoom value
                    this.setState({zoom: zoom});
                }
            }
        })

        this.setState({ zoom: currentModel.getZoomLevel() });
    }

    render() {
		return (
            <div className='Canvas' 
            style={{backgroundPosition: `${this.state.offsetX}px ${this.state.offsetY}px`,
            backgroundSize: `${this.state.zoom / 1.25 - 20}px ${this.state.zoom / 1.25 - 20}px`}}
            >
                <CanvasWidget className='Engine' engine={this.Engine.getEngine()}/>
            </div>
		);
	}
}

export default RenderEngine;