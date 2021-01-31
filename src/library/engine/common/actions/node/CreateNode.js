import Action from '../Action';

// action for node creation
class CreateNodeAction extends Action {
    Node;
    
    constructor(engine, node){
        super(engine);

        this.Node = node;
    }
    
    undo() {
        this.Engine.getModel().removeNode(this.Node);
    }

    redo() {
        this.Engine.getModel().addNode(this.Node);
    }
}

export default CreateNodeAction;