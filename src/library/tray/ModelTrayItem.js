import React from 'react';
import styled from '@emotion/styled';

const TrayItem = styled.div`
    width: 70px;
    margin-bottom: 5px;
`;

class ModelTrayItem extends React.Component {
    dragStart = (event) => {
        event.dataTransfer.setData('CustomNode', this.props.nodeName)
    }
    
    render() {
        return(
            <TrayItem
            draggable={true}
            onDragStart={this.dragStart}>
                <this.props.svg width='70px' height='70px'/>
            </TrayItem>  
        );
    }
}

export default ModelTrayItem;