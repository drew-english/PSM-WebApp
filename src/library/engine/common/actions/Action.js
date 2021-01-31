// abstract base class of an action taken on the engine
class Action {
    Engine;

    constructor(engine) {
        if(new.target === Action)
            throw new Error("Cannot create instance of abstract class Action");

        this.Engine = engine;
    }

    // tells the engine how to undo the action
    undo() {
        throw new Error("Undo function must be overwritten in child class");
    }

    // tells the engine how to redo the action
    redo() {
        throw new Error("Redo function must be overwritten in child class");
    }
}

export default Action;