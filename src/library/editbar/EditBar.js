import React from 'react';
import styled from '@emotion/styled';
import ZoomControl from './items/ZoomControl';
import TestSerialize from './items/TestSerialize';
import TestLinkType from './items/TestLinkType';
import AddPorts from './items/AddPorts';

const BarContainer = styled.div`
    width: 100%;
    height: 40px;
    background: rgb(50, 50, 50);
    display: flex;
    color: white;
`;

class EditBar extends React.Component {
    render() {
        return(
            <BarContainer>
                <ZoomControl engine={this.props.engine.getEngine()}/>
                <TestSerialize engine={this.props.engine}/>
                <TestLinkType engine={this.props.engine}/>
                <AddPorts engine={this.props.engine}/>
            </BarContainer>
        );
    }
}

export default EditBar;