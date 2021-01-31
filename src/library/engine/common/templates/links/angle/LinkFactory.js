import { RightAngleLinkFactory } from '@projectstorm/react-diagrams';
import AngleLinkModel from './LinkModel';

// generates new angle link models
class AngleLinkFactory extends RightAngleLinkFactory {
    generateModel() {
        return new AngleLinkModel();
    }
}

export default AngleLinkFactory;