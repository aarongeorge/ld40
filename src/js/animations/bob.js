/**
 * Animations: Bob
 */

// Dependencies
import {Animation} from 'ag2d';
import experience from '../experience';

// Class: Bob
const Bob = class extends Animation {
    constructor (spriteSheet) {
        super({
            'context': experience.context,
            'fps': 5,
            'frames': [
                0,
                1
            ],
            'loop': true,
            'loopType': 'normal',
            'name': 'bob',
            spriteSheet
        });
    }
};

// Export `Bob`
export default Bob;
