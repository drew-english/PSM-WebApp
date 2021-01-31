import { NodeModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import PortModelTemplate from './PortModel';

// defines the model name and the ports on the model
class NodeModelTemplate extends NodeModel {
    PortCountObj;
    PortsUpdated = false;
    Height;
    Width;
    
    constructor(name, ports, size) {
        // make class abstract
        if (new.target === NodeModelTemplate)
            throw new TypeError('Unable to create instance of abstract class NodeModelTemplate');

        super({
            type: name
        });

        // add ports to model
        Object.keys(ports).forEach(alignment => {
            this.initPorts(name, alignment, ports[alignment]);
        });
        this.PortCountObj = ports;

        // configure size
		if(typeof(size) == 'number')
        this.Height = this.Width = size;
        else {
            this.Height = size.height;
            this.Width = size.width;
        }
    }

    initPorts(nodeName, alignment, count) {
        for(var i = 0; i < count; i++)
            this.addPort(new PortModelTemplate(alignment, nodeName, `${alignment}-${i}`));            
    }

    incrementPort(alignment) {
        this.addPort(new PortModelTemplate(
            [alignment],
            this.options.type,
            `${alignment}-${this.PortCountObj[alignment]}`
        ));

        this.PortCountObj[alignment]++;
        this.PortsUpdated = true;
        
        // resize node when adding additional ports
        if(this.PortCountObj[alignment] > 2) {
            this.Height += 20;
        }

        this.getParentCanvasModel().fireEvent({
            node: this,
            alignment: alignment,
            isCreated: true
        }, 'portsUpdated');
    }    

    decrementPort(alignment) {
        // do not decrement if there is only 1 port left
        if(this.PortCountObj[alignment] === 1)
            return;

        // resize node when removing ports
        if(this.PortCountObj[alignment] > 2) {
            this.Height -= 20;
        }

        this.PortCountObj[alignment]--;
        let targetPort = this.getPort(`${alignment}-${this.PortCountObj[alignment]}`); 
        
        // remove all links on the port
        Object.keys(targetPort.getLinks()).forEach(linkName => {
            targetPort.getLinks()[linkName].remove();
        });
        
        this.removePort(targetPort);
        
        this.PortsUpdated = true;

        this.getParentCanvasModel().fireEvent({
            node: this,
            alignment: alignment,
            isCreated: false
        }, 'portsUpdated');
    }

    incrementLeftPorts() {
        this.incrementPort(PortModelAlignment.LEFT);
    }

    incrementRightPorts() {
        this.incrementPort(PortModelAlignment.RIGHT);
    }

    decrementLeftPorts() {
        this.decrementPort(PortModelAlignment.LEFT);
    }

    decrementRightPorts() {
        this.decrementPort(PortModelAlignment.RIGHT);
    }

    setSelected(selected) {
        super.setSelected(selected);
        this.getParentCanvasModel().fireEvent({ type: this.options.type, selected: selected }, 'nodeSelectionChange');
    }
}

export default NodeModelTemplate;