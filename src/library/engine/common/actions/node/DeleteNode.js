import Action from '../Action';

// action for node deletion
class DeleteNodeAction extends Action {
    Node;
    
    constructor(engine, node){
        super(engine);

        this.Node = node;
    }
    
    undo() {
        this.Engine.getModel().addNode(this.Node);
    }

    redo() {
        this.Engine.getModel().removeNode(this.Node);
    }
}

export default DeleteNodeAction;