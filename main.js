// @ts-check

/**
 * Copied from seaborn: https://github.com/mwaskom/seaborn/blob/bfbd6ad5b9717db42e302177d867b4a273df162b/seaborn/palettes.py#L905
 * Copyright (c) 2012-2021, Michael L. Waskom
 * BSD 3-Clause "New" or "Revised" License
 */
const cubehelix_palette = (/** @type {{ start: number, rot: number, gamma: number, hue: number, light: number, dark: number, reverse: boolean }} */{ start, rot, gamma, hue, light, dark, reverse }) => {
    const get_color_function = (/** @type {number} */p0, /** @type {number} */p1) => (/** @type {number} */x) => {
        if (reverse) { x = 1 - x }
        const xg = (dark + (light - dark) * x) ** gamma
        const a = hue * xg * (1 - xg) / 2
        const phi = 2 * Math.PI * (start / 3 + rot * x)
        return xg + a * (p0 * Math.cos(phi) + p1 * Math.sin(phi))
    }

    return (/** @type {number} */x) => `rgb(${get_color_function(-0.14861, 1.78277)(x) * 255}, ${get_color_function(-0.29227, -0.90649)(x) * 255}, ${get_color_function(1.97294, 0.0)(x) * 255})`
}

// sns.load_dataset("flights")
const flights = [
    [0.0154440151527524, 0.021235521882772446, 0.07915057986974716, 0.12934362888336182, 0.17760618031024933, 0.19305019080638885, 0.2664092779159546, 0.3474903404712677, 0.40733590722084045, 0.4555984437465668, 0.4942084848880768, 0.6042470932006836],
    [0.027027027681469917, 0.04247104376554489, 0.08880309015512466, 0.14671814441680908, 0.17760618031024933, 0.1621621549129486, 0.24903474748134613, 0.3339768350124359, 0.3803088665008545, 0.41312742233276367, 0.45945945382118225, 0.5540540814399719],
    [0.054054055362939835, 0.0714285746216774, 0.1428571492433548, 0.1718146651983261, 0.25482624769210815, 0.2528957426548004, 0.3146718144416809, 0.41119691729545593, 0.4864864945411682, 0.49806949496269226, 0.5830115675926208, 0.6081081032752991],
    [0.048262547701597214, 0.05984555929899216, 0.1138996109366417, 0.14864864945411682, 0.2528957426548004, 0.2374517321586609, 0.3185328245162964, 0.403474897146225, 0.4710424840450287, 0.4710424840450287, 0.5637065768241882, 0.6891891956329346],
    [0.03281853348016739, 0.04054053872823715, 0.13127413392066956, 0.1525096595287323, 0.24131274223327637, 0.2509652376174927, 0.3204633295536041, 0.41312742233276367, 0.4845559895038605, 0.5, 0.6100386381149292, 0.7104247212409973],
    [0.05984555929899216, 0.08687258511781693, 0.1428571492433548, 0.22007721662521362, 0.26833978295326233, 0.3088802993297577, 0.40733590722084045, 0.5212355256080627, 0.6138995885848999, 0.6389961242675781, 0.7104247212409973, 0.8320463299751282],
    [0.08494208753108978, 0.12741312384605408, 0.18339768052101135, 0.2432432472705841, 0.3088802993297577, 0.38223937153816223, 0.5019304752349854, 0.5965250730514526, 0.6969112157821655, 0.7471042275428772, 0.8571428656578064, 1.0],
    [0.08494208753108978, 0.12741312384605408, 0.18339768052101135, 0.2664092779159546, 0.3243243098258972, 0.36486485600471497, 0.46911197900772095, 0.5810810923576355, 0.700772225856781, 0.7741312980651855, 0.8783783912658691, 0.969111979007721],
    [0.0617760606110096, 0.10424710065126419, 0.15444014966487885, 0.20270270109176636, 0.2567567527294159, 0.2992278039455414, 0.40154439210891724, 0.4845559895038605, 0.5791505575180054, 0.5791505575180054, 0.69305020570755, 0.7799227833747864],
    [0.028957528993487358, 0.055984556674957275, 0.11196911334991455, 0.16795367002487183, 0.20656371116638184, 0.24131274223327637, 0.3281853199005127, 0.3899613916873932, 0.46911197900772095, 0.49227797985076904, 0.584942102432251, 0.6891891956329346],
    [0.0, 0.019305018708109856, 0.0810810774564743, 0.13127413392066956, 0.14671814441680908, 0.19111968576908112, 0.2567567527294159, 0.32239383459091187, 0.38803088665008545, 0.39768341183662415, 0.49806949496269226, 0.5521235466003418],
    [0.027027027681469917, 0.06949806958436966, 0.11969111859798431, 0.17374517023563385, 0.18725869059562683, 0.24131274223327637, 0.33590734004974365, 0.3899613916873932, 0.4478764533996582, 0.44980695843696594, 0.5810810923576355, 0.6332046389579773],
]

const getContext2d = (/** @type {HTMLCanvasElement} */canvas) => {
    return { canvas, ctx: canvas.getContext("2d") }
}

const getParameters = () => ({
    start: +/** @type {HTMLInputElement} */(document.querySelector("#start")).value,
    rot: +/** @type {HTMLInputElement} */(document.querySelector("#rot")).value,
    gamma: +/** @type {HTMLInputElement} */(document.querySelector("#gamma")).value,
    hue: +/** @type {HTMLInputElement} */(document.querySelector("#hue")).value,
    light: +/** @type {HTMLInputElement} */(document.querySelector("#light")).value,
    dark: +/** @type {HTMLInputElement} */(document.querySelector("#dark")).value,
    reverse: /** @type {HTMLInputElement} */(document.querySelector("#reverse")).checked,
})

const draw = () => {
    const colorbar = getContext2d(document.querySelector("#colorbar-canvas"))
    const palette = cubehelix_palette(getParameters())
    for (let y = 0; y < colorbar.canvas.height; y++) {
        colorbar.ctx.fillStyle = palette(1 - y / (colorbar.canvas.height - 1))
        colorbar.ctx.fillRect(0, y, colorbar.canvas.width, 1)
    }

    const heatmap = getContext2d(document.querySelector("#heatmap-canvas"))
    const cellWH = [heatmap.canvas.width / flights[0].length, heatmap.canvas.height / flights.length]
    for (let y = 0; y < flights.length; y++) {
        for (let x = 0; x < flights[0].length; x++) {
            heatmap.ctx.fillStyle = palette(flights[y][x])
            heatmap.ctx.fillRect(cellWH[0] * x, cellWH[1] * y, cellWH[0], cellWH[1])
        }
    }

    const resolutionX = 2
    const resolutionY = 3
    for (const name of ["start", "gamma", "rot", "hue"]) {
        const { canvas, ctx } = getContext2d(document.querySelector(`#${name}-canvas`))
        const input = /** @type {HTMLInputElement} */(document.querySelector(`#range-${name}`))
        for (let x = 0; x < canvas.width; x += resolutionX) {
            const t = +input.min + (+input.max - +input.min) * (x / (canvas.width - 1))
            const palette2 = cubehelix_palette({ ...getParameters(), hue: 2, [name]: t })
            for (let y = 0; y < canvas.height; y += resolutionY) {
                ctx.fillStyle = palette2(1 - y / (canvas.height - 1))
                ctx.fillRect(x, y, resolutionX, resolutionY)
            }
        }
        ctx.fillStyle = "white"
        ctx.fillRect((+input.value - +input.min) / (+input.max - +input.min) * (canvas.width - 1), 0, 1, canvas.height)
    }

    {
        const url = new URL(location.href)
        url.search = "?" + new URLSearchParams(Object.entries(getParameters()).map(([k, v]) => [k, "" + v])).toString()
        history.replaceState({ path: url.href }, '', url.href);

        const p = getParameters();
        /** @type {HTMLInputElement} */(document.querySelector("#sns")).value = `\
import seaborn as sns
sns.color_palette('ch:start=${p.start},rot=${p.rot},gamma=${p.gamma},hue=${p.hue},light=${p.light},dark=${p.dark},reverse=${p.reverse ? "1" : "0"}', as_cmap=True)`
    }
}

{
    const search = new URLSearchParams(location.search)
    const start = search.get("start")
    const rot = search.get("rot")
    const gamma = search.get("gamma")
    const hue = search.get("hue")
    const light = search.get("light")
    const dark = search.get("dark")
    const reverse = search.get("reverse")
    if (start !== null && Number.isFinite(+start) &&
        rot !== null && Number.isFinite(+rot) &&
        gamma !== null && Number.isFinite(+gamma) &&
        hue !== null && Number.isFinite(+hue) &&
        light !== null && Number.isFinite(+light) &&
        dark !== null && Number.isFinite(+dark) &&
        reverse !== null && ["true", "false"].includes(reverse)) {
        /** @type {HTMLInputElement} */(document.querySelector("#range-start")).value = start;
        /** @type {HTMLInputElement} */(document.querySelector("#range-rot")).value = rot;
        /** @type {HTMLInputElement} */(document.querySelector("#range-gamma")).value = gamma;
        /** @type {HTMLInputElement} */(document.querySelector("#range-hue")).value = hue;
        /** @type {HTMLInputElement} */(document.querySelector("#range-light")).value = light;
        /** @type {HTMLInputElement} */(document.querySelector("#range-dark")).value = dark;
        /** @type {HTMLInputElement} */(document.querySelector("#reverse")).checked = reverse === "true";
    }
}

/** @type {NodeListOf<HTMLInputElement>} */(document.querySelectorAll("#table input[type='range']")).forEach((e) => {
    const update = () => {
        /** @type {HTMLInputElement} */(document.getElementById(e.id.replace("range-", ""))).value = "" + e.value
        draw()
    }
    update()
    e.addEventListener("input", () => { update() })
});
/** @type {NodeListOf<HTMLInputElement>} */(document.querySelectorAll("#table input[type='number']")).forEach((e) => e.addEventListener("input", () => {
    /** @type {HTMLInputElement} */(document.getElementById(`range-${e.id}`)).value = e.value
    draw()
}))
document.querySelector("#reverse").addEventListener("change", () => { draw() })
