import createEngine, {
    DiagramModel
} from '@projectstorm/react-diagrams';

import {
    NameToLinkModel,
    CurvedLinkFactory,
    AngleLinkFactory,
    SmartLinkFactory
} from './common/CustomLinks';

import Stack from '../structs/Stack';
import CreateAllCustomNodes from './CustomNodes';
import UndoRedoAction from './common/actions/UndoRedo';
import CopyPasteAction from './common/actions/CopyPaste';
import InitActionListeners from './common/actions/InitListeners';

class DiagramEngine {
    DefaultLinkType = "curved";
    
    Engine;
    CustomNodes = {};

    UndoStack = new Stack(20);
    RedoStack = new Stack(20);

    ModelListeners = [];
    StateListeners = [];
    
    constructor() {
        // create new engine and register a new model
        this.Engine = createEngine({ registerDefaultZoomCanvasAction: false }); // disable scroll to zoom
        let newModel = new DiagramModel();
        this.Engine.setModel(newModel);

        // Setup custom link factories
        this.registerLinkFactory(CurvedLinkFactory);
        this.registerLinkFactory(AngleLinkFactory);
        this.registerLinkFactory(SmartLinkFactory);

        // set default link type
        this.setNewLinkType(this.DefaultLinkType);
        
        // initialize the custom nodes
        CreateAllCustomNodes(this);

        // initialize the action listeners for undo redo funcitonality
        InitActionListeners(this, this.UndoStack, this.RedoStack);

        // register custom actions
        this.Engine.getActionEventBus().registerAction(new UndoRedoAction(this, this.UndoStack, this.RedoStack));       
        this.Engine.getActionEventBus().registerAction(new CopyPasteAction(this));
    }

    registerNodeFactory(factory) {
        this.Engine.getNodeFactories().registerFactory(new factory());
    }

    registerLinkFactory(factory) {
        this.Engine.getLinkFactories().registerFactory(new factory());
    }

    registerPortFactory(factory) {
        this.Engine.getPortFactories().registerFactory(new factory());
    }

    registerCustomNode(nodeName, nodeModel) {
        this.CustomNodes[nodeName] = nodeModel;
    }

    getCustomNodes() {
        return this.CustomNodes;
    }

    getEngine() {
        return this.Engine;
    }

    // adds a given node at a given point
    createCustomNode(nodeName, point) {
        let newNode = new this.CustomNodes[nodeName]();
        newNode.setPosition(point);
        this.Engine.getModel().addNode(newNode);
    }

    // returns a JSON string representing the current model state
    serialize() {
        return JSON.stringify(this.Engine.getModel().serialize());
    }

    // loads information from JSON string into a new model
    deserialize(data) {
        let newModel = new DiagramModel();
        newModel.deserializeModel(JSON.parse(data), this.Engine);
        this.Engine.setModel(newModel);

        // register model listeners to new model and clear working history
        this.registerAllModelListeners();
        this.UndoStack.clear();
        this.RedoStack.clear();

        // set default link type
        this.setNewLinkType(this.DefaultLinkType);

        this.Engine.fireEvent({}, "modelUpdated");
    }

    // sets the type to be used to create new links
    setNewLinkType = (name) => {
        this.Engine.getModel().getOptions()["NewLinkType"] = NameToLinkModel[name];
    }

    // registers a listener with the model
    registerModelListener(listener) {
        this.ModelListeners.push(listener); // add to model listener list 
        this.Engine.getModel().registerListener(listener); // register with model
    }

    // registers all previously registered listeners with the model
    registerAllModelListeners() {
        this.ModelListeners.forEach(l => {
            this.Engine.getModel().registerListener(l);
        });
    }

    // clears all the listeners from the model
    deregisterAllModelListeners() {
        this.Engine.getModel().clearListeners();
    }

    // registers a listener with the state machine
    registerStateListener(listener) {
        this.StateListeners.push(listener); // add to state listener list
        this.Engine.getStateMachine().registerListener(listener); // register with state machine
    }
}

export default DiagramEngine;