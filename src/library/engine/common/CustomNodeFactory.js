import NodeFactoryTemplate from './templates/NodeFactory';
import NodeModelTemplate from './templates/NodeModel';
import NodeWidgetTemplate from './templates/NodeWidget';
import PortFactoryTemplate from './templates/PortFactory';
import { PortModelAlignment } from '@projectstorm/react-diagrams';

// Creates a new node model based on passed in options
function CreateNode(options, DiagramEngine) {
    // error checking of option values
    if(!options.name)
        throw new Error("Must include name in node options");
    
    if(!options.svg)
        throw new Error("Must include svg object in node options");

    if(typeof(options.svg) !== 'object')
        throw new Error("Node svg must be of type ReactComponent");

    // default values for missing options
    if(!options.size)
        options.size = 50;

    if(!options.ports)
        options.ports = [
            PortModelAlignment.LEFT,
            PortModelAlignment.TOP,
            PortModelAlignment.RIGHT,
            PortModelAlignment.BOTTOM
        ];

    class CustomNodeModel extends NodeModelTemplate {
        constructor() {
            super(options.name, options.ports, options.size);
        }
    }

    class CustomNodeWidget extends NodeWidgetTemplate {
        constructor() {
            super(options.svg, options.svgSelected);
        }
    }

    class CustomNodeFactory extends NodeFactoryTemplate {
        constructor() {
            super(CustomNodeWidget, CustomNodeModel, options.name);
        }
    }

    // associated port factory (only used in deserialization)
    class CustomPortFactory extends PortFactoryTemplate {
        constructor() {
            super(options.name);
        }
    }

    // registers the factories with the engine
    DiagramEngine.registerNodeFactory(CustomNodeFactory);
    DiagramEngine.registerPortFactory(CustomPortFactory);

    // registers the node model in the engine with its name
    DiagramEngine.registerCustomNode(options.name, CustomNodeModel);

    // returns the model to be used in other places
    return CustomNodeModel;
}

export default CreateNode;