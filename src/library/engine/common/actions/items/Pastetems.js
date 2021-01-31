import { NodeModel } from '@projectstorm/react-diagrams';
import Action from '../Action';

// action for moving one or many objects on the canvas
class PasteItemsAction extends Action {
    Items;
    
    constructor(engine, items){
        super(engine);

        this.Items = items;
    }

    undo() {
        let model = this.Engine.getModel();
        this.Items.forEach(item => {
            if(item instanceof NodeModel)
                model.removeNode(item);
            else
                model.removeLink(item);
        });
    }

    redo() {
        let model = this.Engine.getModel();
        this.Items.forEach(item => {
            if(item instanceof NodeModel)
                model.addNode(item);
            else
                model.addLink(item);
        });
    }
}

export default PasteItemsAction;