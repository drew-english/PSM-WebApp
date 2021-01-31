import CreateNode from './common/CustomNodeFactory';
import { NameToSVG } from './common/CustomNodeImages';
import { PortModelAlignment } from '@projectstorm/react-diagrams'

// creates all custom nodes in the given diagram engine
function CreateAllCustomNodes(DiagramEngine) {
    // all nodes to test functionality
    CreateNode({
        name: 'generator',
        size: 65,
        svg: NameToSVG['generator'],
        svgSelected: NameToSVG['generatorSelected'],
        ports: {
            [PortModelAlignment.LEFT]: 1,
            [PortModelAlignment.RIGHT]: 1
        }
    }, DiagramEngine);
    
    CreateNode({
        name: 'load',
        size: 25,
        svg: NameToSVG['load'],
        svgSelected: NameToSVG['loadSelected'],
        ports: {
            [PortModelAlignment.LEFT]: 1,
            [PortModelAlignment.RIGHT]: 1
        }
    }, DiagramEngine);
    
    CreateNode({
        name: 'transformer',
        size: {height: 65, width: 28}, // width / height = .4375
        svg: NameToSVG['transformer'],
        svgSelected: NameToSVG['transformerSelected'],
        ports: {
            [PortModelAlignment.LEFT]: 1,
            [PortModelAlignment.RIGHT]: 1
        }
    }, DiagramEngine);

    CreateNode({
        name: 'bus',
        size: {height: 65, width: 4.8}, // width / height = .075
        svg: NameToSVG['bus'],
        svgSelected: NameToSVG['busSelected'],
        ports: {
            [PortModelAlignment.LEFT]: 1,
            [PortModelAlignment.RIGHT]: 1
        }
    }, DiagramEngine);
}

export default CreateAllCustomNodes;