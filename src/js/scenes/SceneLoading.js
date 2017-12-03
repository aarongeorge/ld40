/**
 * SceneLoading
 */

// Dependencies
import experience, {assetLoader, audioManager, eventEmitter, sceneManager} from '../experience';
import {Scene} from 'ag2d';
import * as Game from '../dirk/Game';

// Scenes
import SceneStart from './SceneStart';
import SceneOne from './SceneOne';

// Class: SceneLoading
class SceneLoading extends Scene {

    // Constructor
    constructor () {

        // Set name of scene
        super('SceneLoading');
    }

    // Method: render
    render () {

        // Yellow background
        experience.context.fillStyle = '#FFFF00';
        experience.context.fillRect(0, 0, experience.size.width, experience.size.height);

        // Scene name
        experience.context.textAlign = 'center';
        experience.context.textBaseline = 'middle';
        experience.context.font = '10px sans-serif';
        experience.context.strokeStyle = 'black';
        experience.context.lineWidth = 1;
        experience.context.lineJoin = 'round';
        experience.context.strokeText('Please wait, we are loading...', experience.size.width / 2, experience.size.height / 2);
        experience.context.fillStyle = 'white';
        experience.context.fillText('Please wait, we are loading...', experience.size.width / 2, experience.size.height / 2);
    }

    // Method: enter
    enter () {

        // Scene hasn't been entered before
        if (this.enterCount === 0) {

            // Listener for `assetLoader` loaded
            eventEmitter.addListener('assetLoader:loaded', () => {

                // Add `sandstorm` to `audioManager`
                audioManager.add(assetLoader.assets.sandstorm);

                /**
                 * Scene Manager setup
                 */

                // Add `SceneStart` to `sceneManager`
                sceneManager.add(new SceneStart());

                // Add `SceneOne` to `sceneManager`
                sceneManager.add(new SceneOne());

                Game.init().then(() => {
                    // Go to `SceneStart`
                    sceneManager.goTo('SceneStart');
                });
            }, 1);

            // Call `loadAssets`
            assetLoader.loadAssets(() => {

                // Emit loaded
                eventEmitter.emit('assetLoader:loaded');
            });
        }
    }
}

// Export `SceneLoading`
export default SceneLoading;
