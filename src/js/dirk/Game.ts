import MovementHeatMap from "./MovementHeatMap";
import DancerManager from "./DancerManager";
import Dancer from "./Dancer";
import {StageEntryPoint} from "./Types";
import StageEntryMap from "./StageEntryMap";
import BandPlacementMap from "./BandPlacementMap";
import BandManager from "./BandManager";
import { sceneManager } from "../experience";

// Controls all the game logic
// Owns a DancerEmitter
export let width: number = 256;
export let height: number = 256;
export let movementHeatMap: MovementHeatMap;
export let stageEntryMap: StageEntryMap;
export let bandMap: BandPlacementMap;
export let bandManager: BandManager;
export let crowdExcitementFactor: number = 1;
export let dancerManager: DancerManager;
// 0.1 means each player will decide to attack on average once every 10 seconds
export let chanceOfAttack: number = 0.1;
export let sceneOne: any;

export function init(): Promise<any> {
    dancerManager = new DancerManager();
    return preload();
}

function preload(): Promise<void> {
    return Promise.all([
        loadHeatmap(),
        loadEntryPoints(),
        loadBandMap()
    ]).then(initBandManager)
    
}

function initBandManager(): Promise<void> {
    bandManager = new BandManager();
    return Promise.resolve();
}

function loadHeatmap(): Promise<null> {
    return new Promise((resolve, reject) => {
        movementHeatMap = new MovementHeatMap("/img/heatmap.png");
        movementHeatMap.addEventListener("loadingComplete", function() {
            resolve();
        });
    });
}

function loadEntryPoints(): Promise<null> {
    return new Promise((resolve, reject) => {
        stageEntryMap = new StageEntryMap("/img/entry-points.png");
        stageEntryMap.addEventListener("loadingComplete", function() {
            resolve();
        });
    });
}

function loadBandMap(): Promise<null> {
    return new Promise((resolve, reject) => {
        bandMap = new BandPlacementMap("/img/band-placement.png");
        bandMap.addEventListener("loadingComplete", function() {
            resolve();
        });
    });
}

export function update(delta: number) {
    dancerManager.update(delta);
    bandManager.update(delta);
}

export function render() {
    bandManager.render();
    dancerManager.render();
}

export function start() {
    var lastTime = Date.now()/1000;
    setInterval(() => {
        var newDate = Date.now()/1000;
        update(newDate-lastTime);
        lastTime = newDate;
    }, 16.666666667);
}

export function setSceneOne(s) {
    sceneOne = s;
}