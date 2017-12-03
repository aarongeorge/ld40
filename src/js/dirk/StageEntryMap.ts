///<reference path="./png.js.d.ts" />

import * as PNGReader from "png.js";
import {Point, Vector, EventEmitter, HeatmapPoint} from "./Types";

export default class StageEntryMap extends EventEmitter {
    filename: string;
    bytes: any;
    png: any;
    isLoaded: boolean = false;
    points: Point[] = [];

    constructor(filename: string) {
        super();
        this.filename = filename;
        this.loadPoints();
    }

    loadPoints() {
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
                    var point = { x: x - 16, y: y - 32 };
                    this.points.push(point);
                }
            }
        }
        this.isLoaded = true;
        this.emit("loadingComplete");
    }
}