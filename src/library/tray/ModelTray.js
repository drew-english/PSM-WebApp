import React from 'react';
import styled from '@emotion/styled';
import ModelTrayItem from './ModelTrayItem';
import { NameToSVG } from '../engine/common/CustomNodeImages';

const Tray = styled.div`
    width: 100px;
    background: rgb(50, 50, 50);
`;

const ItemList = styled.ul`
    padding-left: 10px;
    column-gap: 5px;
`;

const TrayHeader = styled.div`
    height: 40px;
    font-size: 20px;
    color: white;
    background: rgb(90, 90, 90);
    text-align: center;
`;

class ModelTray extends React.Component {
    TrayItems = [];
    
    constructor(props) {
        super();
        
        // creates list items for the custom node names passed in
        props.customNodes.forEach(nodeName => {
            this.TrayItems.push(
                <li key={nodeName} style={{listStyleType: 'none'}}>
                    <ModelTrayItem nodeName={nodeName} svg={NameToSVG[nodeName]}/>
                </li>
            )
        });
    }
    
    render() {
        return(
            <Tray>
                <TrayHeader>
                    <div style={{paddingTop: '10px'}}>Items</div>
                </TrayHeader>
                <ItemList>
                    {this.TrayItems}
                </ItemList>
            </Tray>
        );
    }
}

export default ModelTray;