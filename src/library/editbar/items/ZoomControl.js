import React from 'react';

class ZoomControl extends React.Component {
    ZoomLevels = [65, 80, 90, 100, 120, 140, 160, 175]
    
    constructor(props) {
        super();
        
        this.state = {
            zoomLevel: props.engine.getModel().getZoomLevel()
        }
    }

    handleZoomSelectChange = (event) => {
        this.props.engine.getModel().setZoomLevel(event.target.value);
        this.setState({zoomLevel: event.target.value});
    }
    
    render() {
        return(
            <>
            {/* <label for="zoom">Zoom:</label> */}
            <select name="zoom" value={this.state.zoomLevel} onChange={this.handleZoomSelectChange}>
                <option value={this.ZoomLevels[0]}>25%</option>
                <option value={this.ZoomLevels[1]}>50%</option>
                <option value={this.ZoomLevels[2]}>75%</option>
                <option value={this.ZoomLevels[3]}>100%</option>
                <option value={this.ZoomLevels[4]}>125%</option>
                <option value={this.ZoomLevels[5]}>150%</option>
                <option value={this.ZoomLevels[6]}>175%</option>
                <option value={this.ZoomLevels[7]}>200%</option>
            </select>
            </>
        );
    }
}

export default ZoomControl;