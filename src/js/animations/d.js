/**
 * Animations: D
 */

// Dependencies
import {Animation} from 'ag2d';
import experience from '../experience';

// Class: D
const D = class extends Animation {
    constructor (spriteSheet) {
        super({
            'context': experience.context,
            'fps': 10,
            'frames': [
                0,
                1,
                2,
                3
            ],
            'loop': true,
            'loopType': 'wrap',
            'name': 'd',
            spriteSheet
        });
    }
};

// Export `D`
export default D;
