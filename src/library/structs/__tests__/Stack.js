import '@testing-library/jest-dom';
import Stack from '../Stack';

// tests stack parameters
test('Stack max size', () => {
    expect(() => { new Stack(-1) }).toThrow(Error);

    expect(() => { new Stack({ object: 39 }) }).toThrow(TypeError);

    let stack = new Stack(3);
    stack.push('test');
    stack.push(20);
    stack.push(25);
    stack.push(30);
    expect(stack.Stack).toEqual([20, 25, 30]);
});

// test stack functions
test('Stack functionality', () => {
    let stack = new Stack();

    stack.push(20);
    expect(stack.peek()).toEqual(20);
    expect(stack.pop()).toEqual(20);
    
    stack.push(25);
    stack.push(30);
    stack.clear();
    expect(stack.isEmpty()).toEqual(true);
});