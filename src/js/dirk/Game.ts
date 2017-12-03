import MovementHeatMap from "./MovementHeatMap";
import DancerManager from "./DancerManager";
import Dancer from "./Dancer";
import {StageEntryPoint} from "./Types";

// Controls all the game logic
// Owns a DancerEmitter
export let width: number = 256;
export let height: number = 256;
export let movementHeatMap: MovementHeatMap;
export let crowdExcitementFactor: number = 1;
export let dancerManager: DancerManager;
// 0.1 means each player will decide to attack on average once every 10 seconds
export let chanceOfAttack: number = 0.1;

export let stageEntryPoints: StageEntryPoint[] = [];

export function init(): Promise<any> {
    dancerManager = new DancerManager();
    return preload();
}

function preload(): Promise<any[]> {
    return Promise.all([
        loadHeatmap()
    ]);
}

function loadHeatmap(): Promise<null> {
    return new Promise((resolve, reject) => {
        movementHeatMap = new MovementHeatMap("/img/heatmap.png");
        movementHeatMap.addEventListener("loadingComplete", function() {
            resolve();
        });
    });
}

export function update(delta: number) {
    dancerManager.update(delta);
}

export function start() {
    var lastTime = Date.now()/1000;
    setInterval(() => {
        var newDate = Date.now()/1000;
        update(newDate-lastTime);
        lastTime = newDate;
    }, 16.666666667);
}