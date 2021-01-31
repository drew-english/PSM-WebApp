import { RightAngleLinkModel, PointModel } from '@projectstorm/react-diagrams';

// custom link model used to tap into the functions to fire custom events
class AngleLinkModel extends RightAngleLinkModel {
    constructor() {
        super({
            color: '#151515'
        });
    }
    
    pointCopy(points) {
        var newPoints = [];
        for(var i = 0; i < points.length; i++) {
            let newPoint = new PointModel({
                link: this,
                position: {
                    x: points[i].getX(),
                    y: points[i].getY()
                }
            });

            newPoints.push(newPoint);
        }

        return newPoints;
    }
    
    addPoint(pointModel, index) {
        var prevPoints = this.pointCopy(this.getPoints());
        
        super.addPoint(pointModel, index);

        var newPoints = []; // built after user is finished dragging
        
        // fire custom event notifying of a point creation
        let event = {
            prevPoints: prevPoints,
            newPoints: newPoints,
            link: this,
            isCreated: true,
            linkType: 'angle'
        }
        this.getParentCanvasModel().fireEvent(event, 'pointsUpdated');
    }
}

export default AngleLinkModel;