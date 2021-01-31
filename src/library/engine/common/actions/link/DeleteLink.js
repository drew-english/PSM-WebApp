import Action from '../Action';

// action for node creation
class DeleteLinkAction extends Action {
    Link;
    
    constructor(engine, link){
        super(engine);

        this.Link = link;
    }
    
    undo() {
        this.Engine.getModel().addLink(this.Link);
    }

    redo() {
        this.Engine.getModel().removeLink(this.Link);
    }
}

export default DeleteLinkAction;