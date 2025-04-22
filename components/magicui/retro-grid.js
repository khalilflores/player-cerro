var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import { cn } from "../lib/utils.ts";
export function RetroGrid(_a) {
    var className = _a.className, _b = _a.angle, angle = _b === void 0 ? 65 : _b, _c = _a.cellSize, cellSize = _c === void 0 ? 60 : _c, _d = _a.opacity, opacity = _d === void 0 ? 0.5 : _d, _e = _a.lightLineColor, lightLineColor = _e === void 0 ? "gray" : _e, _f = _a.darkLineColor, darkLineColor = _f === void 0 ? "gray" : _f, props = __rest(_a, ["className", "angle", "cellSize", "opacity", "lightLineColor", "darkLineColor"]);
    var gridStyles = {
        "--grid-angle": "".concat(angle, "deg"),
        "--cell-size": "".concat(cellSize, "px"),
        "--opacity": opacity,
        "--light-line": lightLineColor,
        "--dark-line": darkLineColor,
    };
    return (React.createElement("div", __assign({ className: cn("pointer-events-none absolute size-full overflow-hidden [perspective:200px]", "opacity-[var(--opacity)]", className), style: gridStyles }, props),
        React.createElement("div", { className: "absolute inset-0 [transform:rotateX(var(--grid-angle))]" },
            React.createElement("div", { className: "animate-grid [background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw] dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]" })),
        React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-black" })));
}
