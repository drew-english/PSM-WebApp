import { DefaultLinkFactory } from '@projectstorm/react-diagrams';
import CurvedLinkModel from './LinkModel';

// generates new curved link models
class CurvedLinkFactory extends DefaultLinkFactory {
    constructor() {
        super('curved');
    }

    generateModel() {
        return new CurvedLinkModel();
    }
}

export default CurvedLinkFactory;