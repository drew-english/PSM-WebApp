import React from 'react';
import { PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';

const PortSize = 16;

// styling of the ports shown on the node model
const Port = styled.div`
    width: ${PortSize}px;
    height: ${PortSize}px;
    z-index: 10;
    background: rgba(0, 0, 0, 0);
    border-radius: ${PortSize / 2}px;
    cursor: pointer;
    &:hover {
        background: rgba(0, 0, 0, .75);
    }
`;

class NodeWidgetTemplate extends React.Component {
	// svg image of the custom node
	// must be svg imported as a react component
	NodeSVG;
	NodeSelectedSVG;
	
	constructor(svg, svgSelected, size) {
		super();
		
		// make class abstract
        if (new.target === NodeWidgetTemplate)
            throw new TypeError("Cannot construct abstract class NodeWidetTemplate");

		this.NodeSVG = svg;
		this.NodeSelectedSVG = svgSelected;
	}
	
	// conditonally returns the image for a node based on if it is selected or not
	renderNode() {
		if(this.props.node.isSelected() && this.NodeSelectedSVG) {
			return <this.NodeSelectedSVG height={this.props.node.Height}/>
		}
		else
			return <this.NodeSVG height={this.props.node.Height}/>
	}

	// returns a div containing a single port
	renderPort(leftPos, topPos, port, key) {
		return (
			<div key={key}>
				<PortWidget
				style={{
					left: leftPos,
					top: topPos,
					position: 'absolute'
				}}
				port={port}
				engine={this.props.engine}>
				<Port />
				</PortWidget>
			</div>
		)
	}
	
	// renders all ports based on the ones previously added to the node
	renderAllPorts() {
		let ports = this.props.node.getPorts();
		let updatePortPos = this.props.node.PortsUpdated; // set to true after incrementLeftRightPorts is called
		let portCounts = this.props.node.PortCountObj;

		this.Refs = [];

		// only allow for one port on top and bottom (do not see a use for more at this time)
		if(portCounts[PortModelAlignment.TOP] > 1 || portCounts[PortModelAlignment.TOP] < 0)
			throw new Error('Invalid number of ports for node top.');
		if(portCounts[PortModelAlignment.BOTTOM] > 1 || portCounts[PortModelAlignment.BOTTOM] < 0)
			throw new Error('Invalid number of ports for node bottom.');

		let portElements = Object.keys(ports).map(portName => {
			let [side, num] = portName.split(/-/);
			let leftPos, topPos;

			topPos = (this.props.node.Height / (portCounts[side] + 1)) * (Number(num) + 1) - (PortSize / 2);
			switch(side) {
				case PortModelAlignment.LEFT:
					leftPos = -(PortSize / 2);
					break;
				case PortModelAlignment.RIGHT:
					leftPos = this.props.node.Width - (PortSize / 2);
					break;
				case PortModelAlignment.TOP:
					leftPos = (this.props.node.Width / 2) - (PortSize / 2);
					topPos = -PortSize / 2;
					break;
				case PortModelAlignment.BOTTOM:
					leftPos = (this.props.node.Width / 2) - (PortSize / 2);
					topPos = this.props.node.Height - (PortSize / 2);
					break;
				default:
					throw new Error(`Unknown side for port: ${portName}`);
			}

			if(updatePortPos)
				ports[portName].reportedPosition = false; // tells the port widget to update the port position on the node
			
			return this.renderPort(leftPos, topPos, ports[portName], portName);
		});
		
		this.props.node.PortsUpdated = false;
		return portElements;
	}
    
	render() {
		return (
			<div>
				{this.renderNode()}
				{this.renderAllPorts()}
			</div>
		);
	}
}

export default NodeWidgetTemplate;