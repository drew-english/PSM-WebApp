import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import { PortModelAlignment } from '@projectstorm/react-diagrams';
import PortModelTemplate from './PortModel';

// Only used in deserialization of models
class PortFactoryTemplate extends AbstractModelFactory {
    Name;
    Alignment;
    
    constructor(name) {
        super(name);

        this.Name = name;
        this.Alignment = PortModelAlignment.LEFT; // alignment does not seem to matter
    }
    
    generateModel() {
        return new PortModelTemplate(this.Alignment, this.Name);
    }
}

export default PortFactoryTemplate;