import React from 'react';

class TestLinkType extends React.Component {
    constructor(props) {
        super();

        this.state = {
            value: props.engine.DefaultLinkType
        }

        props.engine.getEngine().registerListener({
            modelUpdated: (event) => {
                this.setState({ value: props.engine.DefaultLinkType });
            }
        });
    }
    
    handleTypeChange = (event) => {
        this.props.engine.setNewLinkType(event.target.value);
        this.setState({ value: event.target.value });
    }
    
    render() {
        return(
            <>
            <select name="linkType" onChange={this.handleTypeChange} value={this.state.value}>
                <option value={"curved"}>Curved</option>
                <option value={"smart"}>Smart</option>
                <option value={"angle"}>Angle</option>
            </select>
            </>
        );
    }
}

export default TestLinkType;