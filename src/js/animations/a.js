/**
 * Animations: A
 */

// Dependencies
import {Animation} from 'ag2d';
import experience from '../experience';

// Class: A
const A = class extends Animation {
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
            'name': 'a',
            spriteSheet
        });
    }
};

// Export `A`
export default A;
