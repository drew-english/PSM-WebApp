// svg images should be created on a 200px by 200px canvas, taking up as much room as possible
import { ReactComponent as GeneratorBlack } from '../../../resources/images/Generator-black.svg';
import { ReactComponent as GeneratorBlue } from '../../../resources/images/Generator-blue.svg';
import { ReactComponent as TransformerBlack } from '../../../resources/images/Transformer-black.svg';
import { ReactComponent as TransformerBlue } from '../../../resources/images/Transformer-blue.svg';
import { ReactComponent as LoadBlack } from '../../../resources/images/Load-black.svg';
import { ReactComponent as LoadBlue } from '../../../resources/images/Load-blue.svg';
import { ReactComponent as BusBlack } from '../../../resources/images/Bus-black.svg';
import { ReactComponent as BusBlue } from '../../../resources/images/Bus-blue.svg';

// stores react component images to be easily accessbile in other parts of the app
const NameToSVG = {
    'generator': GeneratorBlack,
    'generatorSelected': GeneratorBlue,
    'transformer': TransformerBlack,
    'transformerSelected': TransformerBlue,
    'load': LoadBlack,
    'loadSelected': LoadBlue,
    'bus': BusBlack,
    'busSelected': BusBlue
};

export {
    NameToSVG
};