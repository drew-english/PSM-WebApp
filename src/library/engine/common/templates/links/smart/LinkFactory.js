import { PathFindingLinkFactory } from '@projectstorm/react-diagrams';
import SmartLinkModel from './LinkModel';

// generates smart link models
class SmartLinkFactory extends PathFindingLinkFactory {
    generateModel() {
        return new SmartLinkModel();
    }
}

export default SmartLinkFactory;