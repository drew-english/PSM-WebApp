import {
    Action,
    InputType
} from '@projectstorm/react-canvas-core';

import { NodeModel, LinkModel } from '@projectstorm/react-diagrams';

// action triggered when user presses Ctrl+Z or Ctrl+Y, calls undo or redo based on user input
class CopyPasteAction extends Action {
    Engine;
    CopiedItems = [];
    BaseOffset = { x: 75, y: 75 }; // pasted item position offset
    OffsetIncrement = 25;
    CurrentOffset = this.BaseOffset;

    constructor(engine) {
        super({
            type: InputType.KEY_DOWN,
            fire: ({event}) => {
                if(event.keyCode === 67 && event.ctrlKey) { // test for Ctrl+C
                    this.copy();
                } 
                if(event.keyCode === 86 && event.ctrlKey) { // test for Ctrl+V
                    this.paste();
                }             
            }
        })

        this.Engine = engine;
    }

    // store selected items
    copy() {
        this.CopiedItems = this.engine.getModel().getSelectedEntities();
        this.CurrentOffset = this.BaseOffset; // reset pasted item offset
    }

    // create new versions of stored items then offset and add to the model
    paste() {
        this.Engine.deregisterAllModelListeners(); // stop events from firing while pasting

        let newItems = [];

        let itemMap = {};
        this.CopiedItems.forEach(item => {
            let newItem = item.clone(itemMap);

            // offset the node or link, then add to model
            if(newItem instanceof NodeModel) {
                newItem.setPosition(newItem.getX() + this.CurrentOffset.x, newItem.getY() + this.CurrentOffset.y);
                this.engine.getModel().addNode(newItem);
            } 
            else if (newItem instanceof LinkModel) {
				newItem.getPoints().forEach((p) => {
					p.setPosition(p.getX() + this.CurrentOffset.x, p.getY() + this.CurrentOffset.y);
				});
                this.engine.getModel().addLink(newItem);
			}
            newItems.push(newItem);
        });
        
        this.engine.repaintCanvas();

        // incrememnt offset (if user pastes multiple times then new items will not be on top of eachother)
        this.CurrentOffset.x += this.OffsetIncrement;
        this.CurrentOffset.y += this.OffsetIncrement;

        this.Engine.registerAllModelListeners(); // re-register event listeners

        // fire event to notify of newly pasted items
        this.engine.getModel().fireEvent({ items: newItems }, 'itemsPasted');
    }
}

export default CopyPasteAction;