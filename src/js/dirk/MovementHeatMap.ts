///<reference path="./png.js.d.ts" />

import * as PNGReader from "png.js";
import {Point, Vector, EventEmitter, HeatmapPoint} from "./Types";

export default class MovementHeatMap extends EventEmitter {
    filename: string;
    bytes: any;
    png: any;
    randomTown: HeatmapPoint[] = [];
    isLoaded: boolean = false;

    constructor(filename: string) {
        super();
        this.filename = filename;
        this.loadHeatMap();
    }

    loadHeatMap() {
        var oReq = new XMLHttpRequest();
        oReq.open("GET", this.filename, true);
        oReq.responseType = "arraybuffer";
        let self = this;
        oReq.onload = function (oEvent) {
            var reader = new PNGReader(oReq.response);
            reader.parse(function(err:any, png:any) {
                if (err) {
                    throw err;
                }
                self.png = png;
                self.loaded();
            });
        };
        oReq.send(null);
    }

    loaded() {
        // Any pixel that has a red component, add to the array of positions
        for (var y = 0; y < this.png.getHeight(); y++) {
            for (var x = 0; x < this.png.getWidth(); x++) {
                var pixel = this.png.getPixel(x, y);
                var alpha = pixel[3];
                if (alpha != 0) {
                    var point = { x, y, factor: alpha / 255 };
                    this.randomTown.push(point);
                }
            }
        }
        this.isLoaded = true;
        this.emit("loadingComplete");
    }

    selectAtRandom(): Point {
        if (!this.isLoaded) {
            throw "Heatmap asset not loaded";
        }

        // Select a random sample of points
        var sample = [];
        var total = 0;
        for (var i = 0; i < 100; i++) { 
            var index = Math.random()*this.randomTown.length;
            var randomPoint = this.randomTown[Math.floor(index)];
            sample.push(randomPoint);
            total += randomPoint.factor;
        }
        var target = Math.random() * total;

        var depth = 0;
        var chosenIndex;
        for (var i = 0; i < sample.length; i++) {
            var s = sample[i];
            depth += s.factor;
            if (depth > target) {
                chosenIndex = i;
                break;
            }
        }
        return sample[chosenIndex];
    }
}