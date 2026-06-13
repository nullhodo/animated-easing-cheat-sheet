export interface Easing {
    name: string;
    category: string;
    func: (x: number) => number;
    formulaStr: string;
}

const PI = Math.PI;
const c1 = 1.70158;
const c2 = c1 * 1.525;
const c3 = c1 + 1;
const c4 = (2 * PI) / 3;
const c5 = (2 * PI) / 4.5;
const n1 = 7.5625;
const d1 = 2.75;

function easeOutBounce(x: number): number {
    if (x < 1 / d1) {
        return n1 * x * x;
    } else if (x < 2 / d1) {
        let t = x - 1.5 / d1;
        return n1 * t * t + 0.75;
    } else if (x < 2.5 / d1) {
        let t = x - 2.25 / d1;
        return n1 * t * t + 0.9375;
    } else {
        let t = x - 2.625 / d1;
        return n1 * t * t + 0.984375;
    }
}

export const easings: Easing[] = [
    // In Functions
    {
        name: "easeInSine",
        category: "In",
        func: (x) => 1 - Math.cos((x * PI) / 2),
        formulaStr: "return 1 - Math.cos((t * Math.PI) / 2);"
    },
    {
        name: "easeInQuad",
        category: "In",
        func: (x) => x * x,
        formulaStr: "return t * t;"
    },
    {
        name: "easeInCubic",
        category: "In",
        func: (x) => x * x * x,
        formulaStr: "return t * t * t;"
    },
    {
        name: "easeInQuart",
        category: "In",
        func: (x) => x * x * x * x,
        formulaStr: "return t * t * t * t;"
    },
    {
        name: "easeInQuint",
        category: "In",
        func: (x) => x * x * x * x * x,
        formulaStr: "return t * t * t * t * t;"
    },
    {
        name: "easeInExpo",
        category: "In",
        func: (x) => (x === 0 ? 0 : Math.pow(2, 10 * x - 10)),
        formulaStr: "return t === 0 ? 0 : Math.pow(2, 10 * t - 10);"
    },
    {
        name: "easeInCirc",
        category: "In",
        func: (x) => 1 - Math.sqrt(1 - Math.pow(x, 2)),
        formulaStr: "return 1 - Math.sqrt(1 - Math.pow(t, 2));"
    },
    {
        name: "easeInBack",
        category: "In",
        func: (x) => c3 * x * x * x - c1 * x * x,
        formulaStr: "const c1 = 1.70158;\nconst c3 = c1 + 1;\nreturn c3 * t * t * t - c1 * t * t;"
    },
    {
        name: "easeInElastic",
        category: "In",
        func: (x) =>
            x === 0
                ? 0
                : x === 1
                  ? 1
                  : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4),
        formulaStr: "const c4 = (2 * Math.PI) / 3;\nreturn t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);"
    },
    {
        name: "easeInBounce",
        category: "In",
        func: (x) => 1 - easeOutBounce(1 - x),
        formulaStr: "return 1 - easeOutBounce(1 - t); // See easeOutBounce"
    },

    // Out Functions
    {
        name: "easeOutSine",
        category: "Out",
        func: (x) => Math.sin((x * PI) / 2),
        formulaStr: "return Math.sin((t * Math.PI) / 2);"
    },
    {
        name: "easeOutQuad",
        category: "Out",
        func: (x) => 1 - (1 - x) * (1 - x),
        formulaStr: "return 1 - (1 - t) * (1 - t);"
    },
    {
        name: "easeOutCubic",
        category: "Out",
        func: (x) => 1 - Math.pow(1 - x, 3),
        formulaStr: "return 1 - Math.pow(1 - t, 3);"
    },
    {
        name: "easeOutQuart",
        category: "Out",
        func: (x) => 1 - Math.pow(1 - x, 4),
        formulaStr: "return 1 - Math.pow(1 - t, 4);"
    },
    {
        name: "easeOutQuint",
        category: "Out",
        func: (x) => 1 - Math.pow(1 - x, 5),
        formulaStr: "return 1 - Math.pow(1 - t, 5);"
    },
    {
        name: "easeOutExpo",
        category: "Out",
        func: (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x)),
        formulaStr: "return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);"
    },
    {
        name: "easeOutCirc",
        category: "Out",
        func: (x) => Math.sqrt(1 - Math.pow(x - 1, 2)),
        formulaStr: "return Math.sqrt(1 - Math.pow(t - 1, 2));"
    },
    {
        name: "easeOutBack",
        category: "Out",
        func: (x) => 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2),
        formulaStr: "const c1 = 1.70158;\nconst c3 = c1 + 1;\nreturn 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);"
    },
    {
        name: "easeOutElastic",
        category: "Out",
        func: (x) =>
            x === 0
                ? 0
                : x === 1
                  ? 1
                  : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1,
        formulaStr: "const c4 = (2 * Math.PI) / 3;\nreturn t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;"
    },
    {
        name: "easeOutBounce",
        category: "Out",
        func: easeOutBounce,
        formulaStr: "const n1 = 7.5625;\nconst d1 = 2.75;\nif (t < 1 / d1) {\n    return n1 * t * t;\n} else if (t < 2 / d1) {\n    return n1 * (t -= 1.5 / d1) * t + 0.75;\n} else if (t < 2.5 / d1) {\n    return n1 * (t -= 2.25 / d1) * t + 0.9375;\n} else {\n    return n1 * (t -= 2.625 / d1) * t + 0.984375;\n}"
    },

    // InOut Functions
    {
        name: "easeInOutSine",
        category: "InOut",
        func: (x) => -(Math.cos(PI * x) - 1) / 2,
        formulaStr: "return -(Math.cos(Math.PI * t) - 1) / 2;"
    },
    {
        name: "easeInOutQuad",
        category: "InOut",
        func: (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2),
        formulaStr: "return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;"
    },
    {
        name: "easeInOutCubic",
        category: "InOut",
        func: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
        formulaStr: "return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;"
    },
    {
        name: "easeInOutQuart",
        category: "InOut",
        func: (x) => (x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2),
        formulaStr: "return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;"
    },
    {
        name: "easeInOutQuint",
        category: "InOut",
        func: (x) =>
            x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2,
        formulaStr: "return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;"
    },
    {
        name: "easeInOutExpo",
        category: "InOut",
        func: (x) =>
            x === 0
                ? 0
                : x === 1
                  ? 1
                  : x < 0.5
                    ? Math.pow(2, 20 * x - 10) / 2
                    : (2 - Math.pow(2, -20 * x + 10)) / 2,
        formulaStr: "return t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2;"
    },
    {
        name: "easeInOutCirc",
        category: "InOut",
        func: (x) =>
            x < 0.5
                ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
                : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2,
        formulaStr: "return t < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;"
    },
    {
        name: "easeInOutBack",
        category: "InOut",
        func: (x) =>
            x < 0.5
                ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
                : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2,
        formulaStr: "const c1 = 1.70158; const c2 = c1 * 1.525;\nreturn t < 0.5 ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2 : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;"
    },
    {
        name: "easeInOutElastic",
        category: "InOut",
        func: (x) =>
            x === 0
                ? 0
                : x === 1
                  ? 1
                  : x < 0.5
                    ? -(
                          Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)
                      ) / 2
                    : (Math.pow(2, -20 * x + 10) *
                          Math.sin((20 * x - 11.125) * c5)) /
                          2 +
                      1,
        formulaStr: "const c5 = (2 * Math.PI) / 4.5;\nreturn t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2 : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2 + 1;"
    },
    {
        name: "easeInOutBounce",
        category: "InOut",
        func: (x) =>
            x < 0.5
                ? (1 - easeOutBounce(1 - 2 * x)) / 2
                : (1 + easeOutBounce(2 * x - 1)) / 2,
        formulaStr: "return t < 0.5 ? (1 - easeOutBounce(1 - 2 * t)) / 2 : (1 + easeOutBounce(2 * t - 1)) / 2;"
    }
];
