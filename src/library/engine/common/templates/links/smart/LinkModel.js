import { PathFindingLinkModel } from '@projectstorm/react-diagrams';

// custom link model used to tap into the functions to fire custom events
class SmartLinkModel extends PathFindingLinkModel {
    constructor() {
        super({
            color: '#151515'
        });
    }
}

export default SmartLinkModel;