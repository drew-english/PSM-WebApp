import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import DiagramEngine from '../../../engine/DiagramEngine';
import TestLinkType from '../../items/TestLinkType';
import { NameToLinkModel } from '../../../engine/common/CustomLinks';

const engine = new DiagramEngine();

// Tests the TestLinkType EditBar item for rendering without errors
test('TestLinkType Renders', () => {
    render(<TestLinkType engine={engine}/>);
});

// ** functionality tests **
// tests defualt link type matches engine default
test('TestLinkType default type', () => {
    render(<TestLinkType engine={engine}/>);

    let options = screen.getAllByRole('option');

    let selectedOption;
    options.forEach(opt => {
        if(opt.hasAttribute('selected'))
            selectedOption = opt;
    });

    expect(selectedOption.textContent.toLowerCase()).toEqual(engine.DefaultLinkType);
});

// test updating link type is reflected in the engine
test('TestLinkType update type', () => {
    render(<TestLinkType engine={engine}/>);
    
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'smart' } });
    expect(engine.getEngine().getModel().getOptions()["NewLinkType"]).toEqual(NameToLinkModel['smart']);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'angle' } });
    expect(engine.getEngine().getModel().getOptions()["NewLinkType"]).toEqual(NameToLinkModel['angle']);
    
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'curved' } });
    expect(engine.getEngine().getModel().getOptions()["NewLinkType"]).toEqual(NameToLinkModel['curved']);
});