import Action from '../Action';

// action for moving one or many objects on the canvas
class MoveItemsAction extends Action {
    InitialPositions; // stores JSON of all items that were moved, along with their initial positions
    ItemIDs;
    
    constructor(engine, initialPositions){
        super(engine);

        this.InitialPositions = initialPositions;
        this.ItemIDs = Object.keys(initialPositions);
    }

    // swap the current position with the previous position of the item
    swapPosition(obj) {
        let tempPosition = obj.item.getPosition();
        obj.item.setPosition(obj.point.x, obj.point.y);
        obj.point = tempPosition;
    }

    undo() {
        // swaps position for all items in the move action
        this.ItemIDs.forEach(id => {
            this.swapPosition(this.InitialPositions[id]);
        });
        this.Engine.repaintCanvas();
    }

    redo() {
        // swaps position for all items in the move action
        this.ItemIDs.forEach(id => {
            this.swapPosition(this.InitialPositions[id]);
        });
        this.Engine.repaintCanvas();
    }
}

export default MoveItemsAction;