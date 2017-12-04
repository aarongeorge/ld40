/**
 * Sprite Sheets: W
 */

// Dependencies
import {SpriteSheet} from 'ag2d';
import {assetLoader} from '../experience';

// Class: spriteSheet
export default class Keys extends SpriteSheet {
    constructor () {
        super({
            'columns': 4,
            'frameHeight': 24,
            'frameWidth': 24,
            'image': assetLoader.assets.wSpriteSheet.element,
            'name': 'wSpriteSheet',
            'rows': 1
        });
    }
}
