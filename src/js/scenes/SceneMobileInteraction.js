/**
 * SceneMobileInteraction
 */

// Dependencies
import experience, {audioManager, eventEmitter, sceneManager} from '../experience';
import {Scene} from 'ag2d';

// Create the Mobile Interaction Scene
class SceneMobileInteraction extends Scene {

    // Constructor
    constructor () {

        // Set name of scene
        super('SceneMobileInteraction');
    }

    // Method: render
    render () {

        // Red background
        experience.context.fillStyle = '#FF0000';
        experience.context.fillRect(0, 0, experience.size.width, experience.size.height);

        // Scene name
        experience.context.textAlign = 'center';
        experience.context.textBaseline = 'middle';
        experience.context.strokeStyle = 'black';
        experience.context.lineWidth = 1;
        experience.context.lineJoin = 'round';
        experience.context.strokeText('Tap to start', experience.size.width / 2, experience.size.height / 2);
        experience.context.fillStyle = 'white';
        experience.context.fillText('Tap to start', experience.size.width / 2, experience.size.height / 2);
    }

    // Method: enter
    enter () {

        // Scene hasn't been entered before
        if (this.enterCount === 0) {

            // Listener for `audioManager` context ready
            eventEmitter.addListener('audioManager:context ready', () => {

                // Go to `SceneLoading`
                sceneManager.goTo('SceneLoading');
            }, 1);

            // Call `init` on `audioManager`
            audioManager.init(() => {

                // Emit when context is ready
                eventEmitter.emit('audioManager:context ready');
            });
        }
    }
}

// Export `SceneMobileInteraction`
export default SceneMobileInteraction;
