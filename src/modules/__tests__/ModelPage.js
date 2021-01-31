import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ModelPage from '../ModelPage';

// test for rendering without errors
test('ModelPage Render', () => {
    render(<ModelPage/>);
});

// test tray item drop functionality (only functionality of the model page besides rendering components)
// test('ModelPage tray item drop', () => {
    
// });