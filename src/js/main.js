/**
 * Page: ag2dPage
 */

// Dependencies
import experience, {assetLoader, sceneManager, keyManager} from './experience';

// Scenes
import SceneMobileInteraction from './scenes/SceneMobileInteraction';
import SceneLoading from './scenes/SceneLoading';

/**
 * Asset Loader setup
 */
assetLoader.addAssets([
    {
        'name': 'dancer01SpriteSheet',
        'path': '{{envPath}}/img/spritesheet-dancer-01.png',
        'type': 'image'
    },
    {
        'name': 'dancer02SpriteSheet',
        'path': '{{envPath}}/img/spritesheet-dancer-02.png',
        'type': 'image'
    }
]);

/**
 * Scene Manager setup
 */

// Add `SceneMobileInteraction` to `sceneManager`
sceneManager.add(new SceneMobileInteraction());

// Add `SceneLoading` to `sceneManager`
sceneManager.add(new SceneLoading());

/**
 * Configure experience
 */
experience.configure({
    'canvas': document.querySelector('canvas'),
    'fps': 120,
    'backgroundColour': '#000000',
    'imageSmoothing': false,
    'size': {
        'height': 256,
        'width': 256
    }
});

experience.debug = false;
experience.resizeCanvas(window.innerWidth, window.innerHeight);

/**
 * Bind event listeners
 */

// Add keydown listener
window.addEventListener('keydown', (e) => {
    keyManager.keyDown(e);
});

// Add keyup listener
window.addEventListener('keyup', (e) => {
    keyManager.keyUp(e);
});

// Go to `SceneMobileInteraction`
sceneManager.goTo('SceneMobileInteraction');

// Call `start`
experience.start();
