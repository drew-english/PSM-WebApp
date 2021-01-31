import {
    Action,
    InputType
} from '@projectstorm/react-canvas-core';

// action triggered when user presses Ctrl+Z or Ctrl+Y, calls undo or redo based on user input
class UndoRedoAction extends Action {
    UndoStack;
    RedoStack;
    Engine;

    constructor(engine, undoStack, redoStack) {
        super({
            type: InputType.KEY_DOWN,
            fire: ({event}) => {
                if(event.keyCode === 90 && event.ctrlKey) { // test for Ctrl+Z
                    this.undo();
                } 
                if(event.keyCode === 89 && event.ctrlKey) { // test for Ctrl+Y
                    this.redo();
                }              
            }
        })

        this.Engine = engine;
        this.UndoStack = undoStack;
        this.RedoStack = redoStack;
    }

    undo() {
        if(!this.UndoStack.isEmpty()) {
            let action = this.UndoStack.pop();
            this.Engine.deregisterAllModelListeners(); // de-register listeners so they do not fire in the next step
            action.undo();
            this.engine.repaintCanvas(); // force canvas to update
            this.Engine.registerAllModelListeners();
            this.RedoStack.push(action);
        }
    }

    redo() {
        if(!this.RedoStack.isEmpty()) {
            let action = this.RedoStack.pop();
            this.Engine.deregisterAllModelListeners(); // de-register listeners so they do not fire in the next step
            action.redo();
            this.engine.repaintCanvas(); // force canvas to update
            this.Engine.registerAllModelListeners();
            this.UndoStack.push(action);
        }
    }
}

export default UndoRedoAction;