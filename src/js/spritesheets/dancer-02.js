/**
 * Sprite Sheets: Dancer 02
 */

// Dependencies
import {SpriteSheet} from 'ag2d';
import {assetLoader} from '../experience';

// Class: spriteSheet
export default class Dancer02 extends SpriteSheet {
    constructor () {
        super({
            'columns': 5,
            'frameHeight': 32,
            'frameWidth': 32,
            'image': assetLoader.assets.dancer02SpriteSheet.element,
            'name': 'dancer02',
            'rows': 1
        });
    }
}
