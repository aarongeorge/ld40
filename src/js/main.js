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
    },
    {
        'name': 'guitar',
        'path': '{{envPath}}/img/spritesheet-bang-guitarist.png',
        'type': 'image'
    },
    {
        'name': 'hitMarker',
        'path': '{{envPath}}/img/hit-marker.png',
        'type': 'image'
    },
    {
        'name': 'notesBackground',
        'path': '{{envPath}}/img/background-notes.png',
        'type': 'image'
    },
    {
        'name': 'undies',
        'path': '{{envPath}}/img/undies.png',
        'type': 'image'
    },
    {
        'name': 'wSpriteSheet',
        'path': '{{envPath}}/img/spritesheet-w.png',
        'type': 'image'
    },
    {
        'name': 'aSpriteSheet',
        'path': '{{envPath}}/img/spritesheet-a.png',
        'type': 'image'
    },
    {
        'name': 'sSpriteSheet',
        'path': '{{envPath}}/img/spritesheet-s.png',
        'type': 'image'
    },
    {
        'name': 'dSpriteSheet',
        'path': '{{envPath}}/img/spritesheet-d.png',
        'type': 'image'
    },
    {
        'type': 'audio',
        'name': 'sandstorm',
        'sources': [
            {
                'type': 'audio/ogg',
                'path': '{{envPath}}/audio/sandstorm.ogg'
            },
            {
                'type': 'audio/mpeg',
                'path': '{{envPath}}/audio/sandstorm.mp3'
            }
        ]
    },
    {
        'name': 'stage',
        'path': '{{envPath}}/img/stage.png',
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
experience.context.font = '15px pixelmix';

/**
 * Bind event listeners
 */

// Add keydown listener
experience.canvas.addEventListener('keydown', (e) => {
    e.preventDefault();
    keyManager.keyDown(e);
});

// Add keyup listener
experience.canvas.addEventListener('keyup', (e) => {
    e.preventDefault();
    keyManager.keyUp(e);
});

// Go to `SceneMobileInteraction`
sceneManager.goTo('SceneMobileInteraction');

// Call `start`
experience.start();
