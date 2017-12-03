/**
 * Experience
 */

// Dependencies
import AG2D, {AnimationManager, AssetLoader, AudioManager, EventEmitter, EventHandler, KeyManager, SceneManager} from 'ag2d';

// Create instance of `AG2D`
const experience = new AG2D(document.querySelector('canvas'));

// Instantiate Modules
const animationManager = new AnimationManager();
const assetLoader = new AssetLoader();
const audioManager = new AudioManager();
const eventEmitter = new EventEmitter();
const eventHandler = new EventHandler();
const keyManager = new KeyManager();
const sceneManager = new SceneManager();

// Update
const update = (deltaTime) => {
    animationManager.update(deltaTime);
    sceneManager.update(deltaTime);
};

// Render
const render = () => {
    sceneManager.render();
};

// Stop
const stop = () => {
    audioManager.suspend();
    sceneManager.pause();
};

// Start
const start = () => {
    audioManager.resume();
    sceneManager.play();
};

// Bind the hooks
experience.hooks.bind('update', update);
experience.hooks.bind('render', render);
experience.hooks.bind('stop', stop);
experience.hooks.bind('start', start);

// Export `experience`
export default experience;

// Export modules
export {animationManager, assetLoader, audioManager, eventEmitter, eventHandler, keyManager, sceneManager};
