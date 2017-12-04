/**
 * Animations: W
 */

// Dependencies
import {Animation} from 'ag2d';
import experience from '../experience';

// Class: W
const W = class extends Animation {
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
            'name': 'w',
            spriteSheet
        });
    }
};

// Export `W`
export default W;
