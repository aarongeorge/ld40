import Dancer from "./Dancer";
import * as Game from "./Game";
import experience, {assetLoader} from "../experience";
import {Animation, SpriteSheet} from "ag2d";

export function randomAnimation() {
    var animations = [
        {
            'context': experience.context,
            'fps': 5,
            'frames': [
                0,
                1
            ],
            'animate': true,
            'loop': true,
            'loopType': 'normal',
            'name': 'bob',
            spriteSheet: new SpriteSheet({
                columns: 2,
                frameHeight: 32,
                frameWidth: 32,
                image: assetLoader.assets["dancer01SpriteSheet"].element,
                name: "dancer01SpriteSheet",
                rows: 1
            })
        },
        {
            'context': experience.context,
            'fps': 8,
            'frames': [
                0,
                1,
                2,
                3,
                4
            ],
            'animate': true,
            'loop': true,
            'loopType': 'normal',
            'name': 'jig',
            spriteSheet: new SpriteSheet({
                columns: 5,
                frameHeight: 32,
                frameWidth: 32,
                image: assetLoader.assets["dancer02SpriteSheet"].element,
                name: "dancer02SpriteSheet",
                rows: 1
            })
        }
    ];
    var animation = new Animation(animations[(Math.random() * animations.length << 0)]);
    animation.animate = true;
    return animation;
}

export default class DancerManager {
    dancers: Dancer[];
    // Avg 1 every emitRate seconds
    emitRate: number;
    
    constructor() {
        this.dancers = [];
        this.emitRate = 1;
    }

    private emit() {
        // Create a new guy somewhere below the screen
        var startXPos = Math.random() * (Game.width - 32);
        var startYPos = Game.height + 32;
        var dancer = new Dancer(Game.movementHeatMap);
        dancer.position.x = startXPos;
        dancer.position.y = startYPos;
        dancer.start();
        this.dancers.push(dancer);
    }

    private checkForAttackers() {
        Game.sceneOne.keys.w.visible = false;
        Game.sceneOne.keys.a.visible = false;
        Game.sceneOne.keys.s.visible = false;
        Game.sceneOne.keys.d.visible = false;
        this.dancers.forEach(dancer => {
            if (dancer.isAttacking()) {
                switch (dancer.bandMemberToAttack.name) {
                    case "guitarMan":
                        Game.sceneOne.keys.s.visible = true;
                        break;
                    case "singer": 
                        Game.sceneOne.keys.a.visible = true;
                        break;
                    case "bass":
                        Game.sceneOne.keys.d.visible = true;
                        break;
                    case "drummer":
                        Game.sceneOne.keys.w.visible = true;
                        break;
                }
            }
        });
    }

    increaseEmitRate() {
        this.emitRate += 5;
    }

    update(delta: number) {
        var emitChance = 1/this.emitRate * delta;
        var dieRoll = Math.random();
        if (dieRoll < emitChance) {
            this.emit();
        }

        this.checkForAttackers();

        this.dancers.forEach(dancer => {
            dancer.update(delta);
        });
    }

    render() {
        this.dancers.sort((a: Dancer, b: Dancer) => a.position.y - b.position.y);

        this.dancers.forEach(dancer => {
            // Get frame
            // Put frame in context

            dancer.animation.render(experience.context, dancer.position.x, dancer.position.y, 32, 32, 32, 32);
        });
    }
}