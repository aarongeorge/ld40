/**
 * Animations: S
 */

// Dependencies
import {Animation} from 'ag2d';
import experience from '../experience';

// Class: S
const S = class extends Animation {
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
            'name': 's',
            spriteSheet
        });
    }
};

// Export `S`
export default S;
