import CurvedLinkModel from './templates/links/curved/LinkModel';
import AngleLinkModel from './templates/links/angle/LinkModel';
import SmartLinkModel from './templates/links/smart/LinkModel';

import CurvedLinkFactory from './templates/links/curved/LinkFactory';
import AngleLinkFactory from './templates/links/angle/LinkFactory';
import SmartLinkFactory from './templates/links/smart/LinkFactory';

// gives the class for a link model based on a string key
export const NameToLinkModel = {
    "curved": CurvedLinkModel,
    "angle": AngleLinkModel,
    "smart": SmartLinkModel
}

// compile exports into a single place
export {
    CurvedLinkFactory,
    AngleLinkFactory,
    SmartLinkFactory
}