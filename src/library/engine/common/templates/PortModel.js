import { PortModel } from '@projectstorm/react-diagrams'

// defines the default port model, links with node model
class PortModelTemplate extends PortModel {
    constructor(alignment, nodeName, portName) {
        super({
            type: nodeName,
            name: portName,
            alignment: alignment
        });
    }

    // create a new link, type is based on the current selected type for the model
    createLinkModel() {
        let model = this.getParent().getParent().getParent();
        return new (model.getOptions()["NewLinkType"])();
    }

    addLink(linkModel) {
        // makes sure new links start near the mouse
        if(linkModel.points[1].getX() === 0 && linkModel.points[1].getY() === 0)
            linkModel.points[1].setPosition(this.getPosition().x, this.getPosition().y);
        
        super.addLink(linkModel);
    }
    
}

export default PortModelTemplate;