import * as Game from "./Game";
import experience, {assetLoader} from "../experience";
import {Animation, SpriteSheet} from "ag2d";
import { Point } from "./Types";

interface BandMember {
    name: string;
    animation: any;
    position: Point;
}

export default class BandManager {
    bandMembers: BandMember[];

    constructor() {
        this.bandMembers = [
            {
                name: "guitarMan",
                animation: new Animation({
                    'context': experience.context,
                    'fps': 6,
                    'frames': [
                        0,
                        1
                    ],
                    'animate': true,
                    'loop': true,
                    'loopType': 'normal',
                    'name': 'guitarMan',
                    spriteSheet: new SpriteSheet({
                        columns: 2,
                        frameHeight: 32,
                        frameWidth: 32,
                        image: assetLoader.assets["guitarMan"].element,
                        name: "guitarMan",
                        rows: 1
                    })
                }),
                position: Game.bandMap.guitarmanPoint
            },
            {
                name: "singer",
                animation: new Animation({
                    'context': experience.context,
                    'fps': 4,
                    'frames': [
                        0,
                        1
                    ],
                    'animate': true,
                    'loop': true,
                    'loopType': 'normal',
                    'name': 'singer',
                    spriteSheet: new SpriteSheet({
                        columns: 4,
                        frameHeight: 32,
                        frameWidth: 32,
                        image: assetLoader.assets["singer"].element,
                        name: "singer",
                        rows: 1
                    })
                }),
                position: Game.bandMap.singerPoint
            },
            {
                name: "bass",
                animation: new Animation({
                    'context': experience.context,
                    'fps': 6,
                    'frames': [
                        0,
                        1
                    ],
                    'animate': true,
                    'loop': true,
                    'loopType': 'normal',
                    'name': 'bass',
                    spriteSheet: new SpriteSheet({
                        columns: 2,
                        frameHeight: 32,
                        frameWidth: 32,
                        image: assetLoader.assets["bass"].element,
                        name: "bass",
                        rows: 1
                    })
                }),
                position: Game.bandMap.bassPoint
            },
            {
                name: "drummer",
                animation: new Animation({
                    'context': experience.context,
                    'fps': 10,
                    'frames': [
                        0,
                        1
                    ],
                    'animate': true,
                    'loop': true,
                    'loopType': 'normal',
                    'name': 'drummer',
                    spriteSheet: new SpriteSheet({
                        columns: 2,
                        frameHeight: 32,
                        frameWidth: 32,
                        image: assetLoader.assets["drummer"].element,
                        name: "drummer",
                        rows: 1
                    })
                }),
                position: Game.bandMap.drummerPoint
            }
        ];
        this.bandMembers.forEach(member => {
            member.animation.animate = true;
        });
    }

    update(delta: number) {
        this.bandMembers.forEach(member => {
            member.animation.update(delta);
        });
    }

    render() {
        this.bandMembers.forEach(member => {
            member.animation.render(experience.context, member.position.x, member.position.y, 32, 32, 32, 32);
        });
    }
}