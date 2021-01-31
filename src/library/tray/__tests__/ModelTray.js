import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import DiagramEngine from '../../engine/DiagramEngine';
import ModelTray from '../ModelTray';

let engine = new DiagramEngine();

// test for successful rendering
test('ModelTray Render', () => {
    render(<ModelTray customNodes={Object.keys(engine.getCustomNodes())}/>);
});


// functionality testing (drag and drop functionality is tested in the model page)
test('ModelTray functionality', () => {
    let modelTray = new ModelTray({ customNodes: Object.keys(engine.getCustomNodes()) });

    // make sure all custom nodes are added as tray items
    expect(modelTray.TrayItems.length).toEqual(Object.keys(engine.getCustomNodes()).length);
});