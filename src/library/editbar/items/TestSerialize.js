import React from 'react';

class TestSerialize extends React.Component {
    handleClick = () => {
        let s = this.props.engine.serialize();
        this.props.engine.deserialize(s);
    }
    
    render() {
        return(
            <>
            <button onClick={this.handleClick}>
                Test Serialize
            </button>
            </>
        );
    }
}

export default TestSerialize;