import { DragDiagramItemsState, DefaultDiagramState, DragNewLinkState } from '@projectstorm/react-diagrams';

import CreateNodeAction from './node/CreateNode';
import DeleteNodeAction from './node/DeleteNode';
import MoveItemsAction from './items/MoveItems';
import CreateLinkAction from './link/CreateLink';
import DeleteLinkAction from './link/DeleteLink';
import CurvedCreatePointAction from './point/CurvedCreatePoint';
import CurvedDeletePointAction from './point/CurvedDeletePoint';
import AngleCreatePointAction from './point/AngleCreatePoint';
import PasteItemsAction from './items/Pastetems';
import CreatePortAction from './ports/CreatePort';
import DeletePortAction from './ports/DeletePort';

// template for steps to take on each action
function ActionListenerTemplate(args, obj, action) {
    args[1].push(new action(args[0], ...obj));
    args[2].clear(); // clear future work as new action has been taken
    // console.log(args[1]);
}

// stores the previous and current state of the diagram
var prevState;

const StateType = {
    [DefaultDiagramState]: 'default',
    [DragDiagramItemsState]: 'drag',
    [DragNewLinkState]: 'newLink'
}

// easier checking of state type
function GetStateType(state) {
    return StateType[state.constructor];
}

// information about the points being currently updated
var pointsUpdating = {};

// functions called at different stages in the creation of a point on a link
var pointAction = {
    Initialize: (event, args) => {
        var newArgs = [args];
        switch(event.linkType){
            case 'curved':
                newArgs.push([event.point]);
                newArgs.push(event.isCreated ? CurvedCreatePointAction : CurvedDeletePointAction);
                break;
            case 'angle':
                newArgs.push([event.prevPoints, event.newPoints, event.link]);
                newArgs.push(AngleCreatePointAction);
                break;
            default:
                throw new Error(`Unknown link type: ${event.linkType}`);
        }

        pointsUpdating = {
            state: true,
            type: event.linkType,
            args: newArgs
        }  
    },
    CreateAction: () => {
        switch(pointsUpdating.type){
            case 'curved':
                ActionListenerTemplate(...pointsUpdating.args);
                break;
            case 'angle':
                let link = pointsUpdating.args[1][2];
                let newNodes = link.pointCopy(link.getPoints());
                pointsUpdating.args[1][1] = [...newNodes];
                ActionListenerTemplate(...pointsUpdating.args);
                break;
            default:
                throw new Error(`Error finding action for link type: ${pointsUpdating.type}`);
        }
    }
}

// initialzes the listeners for actions and registers them with the engine
function InitActionListeners(engine, undoStack, redoStack) {
    let args = [engine.getEngine(), undoStack, redoStack];

    engine.registerModelListener({
        nodesUpdated: (event) => {
            ActionListenerTemplate(
                args,
                [event.node],
                event.isCreated ? CreateNodeAction : DeleteNodeAction
            );
        },
        linksUpdated: (event) => {
            ActionListenerTemplate(
                args,
                [event.link],
                event.isCreated ? CreateLinkAction : DeleteLinkAction
            );
        },
        pointsUpdated: (event) => {
            if(GetStateType(prevState) !== 'newLink') { // do not update points during new link creation
                pointAction.Initialize(event, args);        
            }
        },
        portsUpdated: (event) => {
            ActionListenerTemplate(
                args,
                [event.node, event.alignment],
                event.isCreated ? CreatePortAction : DeletePortAction
            );
        },
        itemsPasted: (event) => {
            ActionListenerTemplate(
                args,
                [event.items],
                PasteItemsAction
            );
        }
    });

    engine.registerStateListener({
        stateChanged: ({ newState }) => {
            // create new action for points after user is finished dragging them
            if(GetStateType(newState) === 'default' && pointsUpdating.state) {
                pointAction.CreateAction();
                pointsUpdating.state = false;
            }

            if(GetStateType(newState) === 'default' && GetStateType(prevState) === 'drag') {
                let numItems = Object.keys(newState.dragItems.initialPositions).length // 0 if dragging an existing link
                if(numItems > 0) { // stops moveItem action creation when dragging existing links
                    ActionListenerTemplate(
                        args,
                        [newState.dragItems.initialPositions],
                        MoveItemsAction 
                    );
                }
            }

            prevState = newState;
        }
    });
}

export default InitActionListeners;