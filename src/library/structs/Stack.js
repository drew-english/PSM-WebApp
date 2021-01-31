// custom stack class since JS does not have one
// allows for easier maintanence of stack objects
class Stack { 
    Stack;
    MaxSize;
    
    constructor(maxSize = 20) {
        this.Stack = [];

        // type check
        if(typeof(maxSize) !== 'number')
            throw new TypeError("maxSize Must be a number");

        // valid size check
        if(maxSize <= 0)
            throw new Error("Max stack size must be greater than 0.");

        this.MaxSize = maxSize;
    }

    push(val) {
        this.Stack.push(val);

        if(this.MaxSize && this.Stack.length > this.MaxSize)
            this.Stack.shift(); // remove value from begginning of the list
    }

    pop() {
        return this.Stack.pop();
    }

    peek() {
        return this.Stack[this.Stack.length - 1];
    }

    isEmpty() {
        return this.Stack.length === 0;
    }

    clear() {
        this.Stack = [];
    }
}

export default Stack;