/**
 * Sprite Sheets: Dancer 01
 */

// Dependencies
import {SpriteSheet} from 'ag2d';
import {assetLoader} from '../experience';

// Class: spriteSheet
export default class Dancer01 extends SpriteSheet {
    constructor () {
        super({
            'columns': 2,
            'frameHeight': 32,
            'frameWidth': 32,
            'image': assetLoader.assets.guitarMan.element,
            'name': 'dancer01',
            'rows': 1
        });
    }
}
