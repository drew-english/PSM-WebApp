import Action from '../Action';

// action for point deletion on a curved link
class CurvedDeletePointAction extends Action {
    Point;
    
    constructor(engine, point){
        super(engine);

        this.Point = point;
    }
    
    undo() {
        this.Engine.getModel().getLink(this.Point.parent.options.id).addPoint(this.Point);
    }

    redo() {
        this.Engine.getModel().getLink(this.Point.parent.options.id).removePoint(this.Point);
    }
}

export default CurvedDeletePointAction;