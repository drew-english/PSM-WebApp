import Action from '../Action';

// action for node creation
class CreateLinkAction extends Action {
    Link;
    
    constructor(engine, link){
        super(engine);

        this.Link = link;
    }
    
    undo() {
        this.Engine.getModel().removeLink(this.Link);
    }

    redo() {
        this.Engine.getModel().addLink(this.Link);
    }
}

export default CreateLinkAction;