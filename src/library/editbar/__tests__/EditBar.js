import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import EditBar from '../EditBar';
import DiagramEngine from '../../engine/DiagramEngine';

const engine = new DiagramEngine();

// makes sure the editbar (and child items) renders without errors
test('EditBar Renders', () => {
    render(<EditBar engine={engine}/>);
});