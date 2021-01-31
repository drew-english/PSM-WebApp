import React from 'react';
import styled from '@emotion/styled';

const DropDownWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

const DropDownContent = styled.div`
    position: absolute;
    background-color: rgb(50, 50, 50);
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
`;

class AddPorts extends React.Component {
    Engine;
    SelectedBusses = [];
    
    constructor(props) {
        super();

        this.state = {
            disabled: true,
            itemsHidden: true
        }

        this.Engine = props.engine;

        this.Engine.registerModelListener({
            nodeSelectionChange: ({type, selected}) => {
                this.handleNodeSelectionChange(type, selected);
            }
        });
    }

    // update selected busses if a new one is selected or deselected
    handleNodeSelectionChange(type, selected) {
        if(type === 'bus' && selected === true) {
            let selectedItems = this.Engine.getEngine().getModel().getSelectedEntities();
            this.SelectedBusses = [];

            selectedItems.forEach(item => {
                if(item.options.type === 'bus') {
                    this.SelectedBusses.push(item);
                }
            });

            this.setState({ disabled: false });
        }
        else if(selected === false) {
            this.SelectedBusses = [];
            this.setState({ disabled: true, itemsHidden: true });
        }
    }

    addLeftClick = () => {
        this.SelectedBusses.forEach(busNode => {
            busNode.incrementLeftPorts();
        });
        this.Engine.getEngine().repaintCanvas();
    }

    addRightClick = () => {
        this.SelectedBusses.forEach(busNode => {
            busNode.incrementRightPorts();
        });
        this.Engine.getEngine().repaintCanvas();
    }

    removeLeftClick = () => {
        this.SelectedBusses.forEach(busNode => {
            busNode.decrementLeftPorts();
        });
        this.Engine.getEngine().repaintCanvas();
    }

    removeRightClick = () => {
        this.SelectedBusses.forEach(busNode => {
            busNode.decrementRightPorts();
        });
        this.Engine.getEngine().repaintCanvas();
    }

    changePortClick = () => {
        this.setState((prevState) => ({ itemsHidden: !prevState.itemsHidden }));
    }
    
    render() {
        return(
            <DropDownWrapper>
                <button disabled={this.state.disabled} onClick={this.changePortClick} style={{height: '40px'}}>
                    Change Ports
                </button>
                <DropDownContent hidden={this.state.itemsHidden}>
                    <button onClick={this.addLeftClick}>Add Left Port</button>
                    <button onClick={this.addRightClick}>Add Right Port</button>
                    <button onClick={this.removeLeftClick}>Remove Left Port</button>
                    <button onClick={this.removeRightClick}>Remove Right Port</button>
                </DropDownContent>
            </DropDownWrapper>
            
        );
    }
}

export default AddPorts;