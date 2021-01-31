import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import DiagramEngine from '../../../engine/DiagramEngine';
import TestSerialize from '../../items/TestSerialize';

const engine = new DiagramEngine();

// Tests the TestSerialize EditBar item for rendering without errors
test('TestSerialize Renders', () => {
    render(<TestSerialize engine={engine}/>);
});

// Tests clicking the button will test serialization of the engine
test('TestSerialize click', () => {
    render(<TestSerialize engine={engine}/>);
    
    let modelUpdated = false;
    engine.getEngine().registerListener({
        modelUpdated: () => {
            modelUpdated = true;
        }
    });

    fireEvent.click(screen.getByText('Test Serialize'));

    expect(modelUpdated).toBe(true);
});