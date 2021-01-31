import Action from '../Action';

// action for point creation on an angle link
class AngleCreatePointAction extends Action {
    PrevPoints;
    NewPoints;
    Link;
    
    constructor(engine, prevPoints, newPoints, link){
        super(engine);

        this.PrevPoints = prevPoints;
        this.NewPoints = newPoints;
        this.Link = link;
    }

    updateLinkPoints(points) {
        this.Link.setPoints(points);
    }
    
    undo() {
        this.updateLinkPoints(this.PrevPoints);
        this.Link.setFirstAndLastPathsDirection();
    }

    redo() {
        this.updateLinkPoints(this.NewPoints);
        this.Link.setFirstAndLastPathsDirection();
    }
}

export default AngleCreatePointAction;