import { DefaultLinkModel } from '@projectstorm/react-diagrams';

// custom link model used to tap into the functions to fire custom events
class CurvedLinkModel extends DefaultLinkModel {
    constructor() {
        super({
            type: 'curved',
            color: '#151515'
        });
    }

    addPoint(pointModel, index) {
        super.addPoint(pointModel, index);

        // fire custom event notifying of a point creation
        let event = {
            point: pointModel,
            isCreated: true,
            linkType: 'curved'
        }
        this.getParentCanvasModel().fireEvent(event, 'pointsUpdated');
    }

    removePoint(pointModel) {
        super.removePoint(pointModel);

        // fire custom event notifying of a point deletion
        let event = {
            point: pointModel,
            isCreated: false,
            linkType: 'curved'
        }
        this.getParentCanvasModel().fireEvent(event, 'pointsUpdated');
    }
}

export default CurvedLinkModel;