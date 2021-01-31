import React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';

// defines for an engine what to do when creating a node model
class NodeFactoryTemplate extends AbstractReactFactory {
    NodeWidget;
    NodeModel;
    
    constructor(widget, model, name) {
        // make class abstract
        if(new.target === NodeFactoryTemplate)
            throw new TypeError("Cannot create instance of abstract class NodeFactoryTemplate")
        
        super(name);

        this.NodeWidget = widget;
        this.NodeModel = model;
    }    

    generateReactWidget(event) {
        return <this.NodeWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event) {
        return new this.NodeModel();
    }
}

export default NodeFactoryTemplate;