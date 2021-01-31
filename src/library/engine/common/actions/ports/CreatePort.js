import Action from '../Action';
import { PortModelAlignment } from '@projectstorm/react-diagrams';

// action for port creation
class CreatePortAction extends Action {
    Node;
    Alignment;
    
    constructor(engine, node, alignment){
        super(engine);

        this.Node = node;
        this.Alignment = alignment;
    }
    
    undo() {
        switch(this.Alignment){
            case PortModelAlignment.LEFT:
                this.Node.decrementLeftPorts();
                break;
            case PortModelAlignment.RIGHT:
                this.Node.decrementRightPorts();
                break;
            default:
                throw new Error(`Invalid create port action alignment: ${this.Alignment}`);
        }
    }

    redo() {
        switch(this.Alignment){
            case PortModelAlignment.LEFT:
                this.Node.incrementLeftPorts();
                break;
            case PortModelAlignment.RIGHT:
                this.Node.incrementRightPorts();
                break;
            default:
                throw new Error(`Invalid create port action alignment: ${this.Alignment}`);
        }
    }
}

export default CreatePortAction;