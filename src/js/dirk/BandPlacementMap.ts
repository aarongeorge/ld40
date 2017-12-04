///<reference path="./png.js.d.ts" />

import * as PNGReader from "png.js";
import {Point, Vector, EventEmitter, HeatmapPoint} from "./Types";

export default class BandPlacementMap extends EventEmitter {
    filename: string;
    bytes: any;
    png: any;
    isLoaded: boolean = false;
    points: Point[] = [];

    singerPoint: Point;
    bassPoint: Point;
    guitarmanPoint: Point;
    drummerPoint: Point;

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
                switch (true) {
                    case pixel[0] == 255 && pixel[1] == 255 && pixel[2] == 0 && pixel[3] == 255:
                        // Yellow - singer
                        this.singerPoint = {x: x - 16, y: y - 32};
                        break;
                    case pixel[0] == 99 && pixel[1] == 4 && pixel[2] == 96 && pixel[3] == 255:
                        // Purple - drummer
                        this.drummerPoint = {x: x - 16, y: y - 32};
                        break;
                    case pixel[0] == 98 && pixel[1] == 58 && pixel[2] == 20 && pixel[3] == 255:
                        // Brown - aron
                        this.guitarmanPoint = {x: x - 16, y: y - 32};
                        break;
                    case pixel[0] == 255 && pixel[1] == 0 && pixel[2] == 0 && pixel[3] == 255:
                        // Red - bass
                        this.bassPoint = {x: x - 16, y: y - 32};
                        break;
                }
                
                var alpha = pixel[3];
                if (alpha != 0) {
                    var point = { x: x - 16, y: y - 32 };
                    this.points.push(point);
                }
            }
        }
        if (!this.singerPoint || !this.bassPoint || !this.guitarmanPoint || !this.drummerPoint) throw "Couldn't find all band members in band map";
        this.isLoaded = true;
        this.emit("loadingComplete");
    }
}