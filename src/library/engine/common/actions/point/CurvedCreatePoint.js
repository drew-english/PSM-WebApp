import Action from '../Action';

// action for point creation on a curved link
class CurvedCreatePointAction extends Action {
    Point;
    
    constructor(engine, point){
        super(engine);

        this.Point = point;
    }
    
    undo() {
        this.Engine.getModel().getLink(this.Point.parent.options.id).removePoint(this.Point);
    }

    redo() {
        this.Engine.getModel().getLink(this.Point.parent.options.id).addPoint(this.Point);
    }
}

export default CurvedCreatePointAction;