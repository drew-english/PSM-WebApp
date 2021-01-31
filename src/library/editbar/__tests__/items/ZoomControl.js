import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import DiagramEngine from '../../../engine/DiagramEngine';
import ZoomControl from '../../items/ZoomControl';

const engine = new DiagramEngine();

// Tests the ZoomControl EditBar item for rendering without errors
test('ZoomControl Renders', () => {
    render(<ZoomControl engine={engine.getEngine()}/>);
});

// tests ZoomControl functionality
test('ZoomControl zoom change functionality', () => {
    render(<ZoomControl engine={engine.getEngine()}/>);

    let zc = new ZoomControl({engine: engine.getEngine()});
    let ZoomLevels = zc.ZoomLevels;

    fireEvent.change(screen.getByRole('combobox'), { target: { value: ZoomLevels[0] } });
    expect(Number(engine.getEngine().getModel().getZoomLevel())).toEqual(ZoomLevels[0]);
    
    fireEvent.change(screen.getByRole('combobox'), { target: { value: ZoomLevels[1] } });
    expect(Number(engine.getEngine().getModel().getZoomLevel())).toEqual(ZoomLevels[1]);
    
    fireEvent.change(screen.getByRole('combobox'), { target: { value: ZoomLevels[2] } });
    expect(Number(engine.getEngine().getModel().getZoomLevel())).toEqual(ZoomLevels[2]);
    
    fireEvent.change(screen.getByRole('combobox'), { target: { value: ZoomLevels[3] } });
    expect(Number(engine.getEngine().getModel().getZoomLevel())).toEqual(ZoomLevels[3]);
    
    fireEvent.change(screen.getByRole('combobox'), { target: { value: ZoomLevels[4] } });
    expect(Number(engine.getEngine().getModel().getZoomLevel())).toEqual(ZoomLevels[4]);
    
    fireEvent.change(screen.getByRole('combobox'), { target: { value: ZoomLevels[5] } });
    expect(Number(engine.getEngine().getModel().getZoomLevel())).toEqual(ZoomLevels[5]);
    
    fireEvent.change(screen.getByRole('combobox'), { target: { value: ZoomLevels[6] } });
    expect(Number(engine.getEngine().getModel().getZoomLevel())).toEqual(ZoomLevels[6]);
    
    fireEvent.change(screen.getByRole('combobox'), { target: { value: ZoomLevels[7] } });
    expect(Number(engine.getEngine().getModel().getZoomLevel())).toEqual(ZoomLevels[7]);
    
});