import Dancer from "./Dancer";
import * as Game from "./Game";
import experience, {assetLoader, keyManager} from "../experience";
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
    attackingW: boolean = false;
    attackingA: boolean = false;
    attackingS: boolean = false;
    attackingD: boolean = false;
    
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
        this.attackingW = false;
        this.attackingA = false;
        this.attackingS = false;
        this.attackingD = false;
        this.dancers.forEach(dancer => {
            if (dancer.isAttacking()) {
                switch (dancer.bandMemberToAttack.name) {
                    case "guitarMan":
                        Game.sceneOne.keys.s.visible = true;
                        this.attackingS = true;
                        break;
                    case "singer": 
                        Game.sceneOne.keys.a.visible = true;
                        this.attackingA = true;
                        break;
                    case "bass":
                        Game.sceneOne.keys.d.visible = true;
                        this.attackingD = true;
                        break;
                    case "drummer":
                        Game.sceneOne.keys.w.visible = true;
                        this.attackingW = true;
                        break;
                }
            }
        });
    }

    private killFirst(name: string) {
        for (var i = 0; i < this.dancers.length; i++) {
            var dancer = this.dancers[i];
            if (dancer.bandMemberToAttack.name == name && dancer.isAttacking()) {
                dancer.kill();
                break;
            }
        }
    }

    private killAttackers() {
        if (keyManager.isDown(87) && this.attackingW) {
            this.killFirst("drummer");
        }
        if (keyManager.isDown(65) && this.attackingA) {
            this.killFirst("singer");
        }
        if (keyManager.isDown(83) && this.attackingS) {
            this.killFirst("guitarMan");
        }
        if (keyManager.isDown(68) && this.attackingD) {
            this.killFirst("bass");
        }
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
        this.killAttackers();

        this.dancers.forEach(dancer => {
            if (!dancer.isAttacking()) {
                dancer.update(delta);
            }
        });
    }

    render() {
        this.dancers.sort((a: Dancer, b: Dancer) => a.position.y - b.position.y);

        this.dancers.forEach(dancer => {
            if (dancer.isAttacking()) {
                let randX = (Math.random()*2 << 0) - 1;
                let randY = (Math.random()*2 << 0) - 1;
                dancer.animation.render(experience.context, dancer.position.x+randX, dancer.position.y+randY, 32, 32, 32, 32);   
            }
            else {
                dancer.animation.render(experience.context, dancer.position.x, dancer.position.y, 32, 32, 32, 32);
            }
        });
    }
}