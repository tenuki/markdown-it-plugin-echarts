import type MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import {Options} from "markdown-it/lib";
import Renderer from "markdown-it/lib/renderer";

const yaml = require('js-yaml');
const echarts = require("echarts");
const {JSDOM} = require('jsdom');
const {createCanvas} = require('canvas')


export interface RenderInfo {
    width?: number,
    height?: number;
    lang?: string,
    token?: Token,
    chunks?: string[],
    code?: string,
    obj?: any,
    opts?: OnlineOptions,
}

export interface OnlineOptions {
    width?: number,
    height?: number;
    render_f?: (result: RenderInfo) => string;
}

export function render_default(render_info: RenderInfo): string {
    echarts.setCanvasCreator(() => {
        return createCanvas(render_info.width, render_info.height);
    });
    const {window} = new JSDOM();
    const document = window.document;
    global['window'] = window;
    global['navigator'] = window.navigator;
    global['document'] = document;

    document.clientWidth = render_info.width;
    document.clientHeight = render_info.height;

    const root = document.createElement('div');
    root.style.cssText = `width: ${render_info.width}px; height: ${render_info.height}px;`;
    const chart = echarts.init(root, null, {renderer: 'svg'});

    chart.setOption(render_info.obj);
    let result = root.querySelector('svg').outerHTML;
    result = result.replace('position: absolute; left: 0px; top: 0px;', '');
    // return outer(border(`${result}\n`, render_info));
    return `${result}\n`;
}


interface UserOpts {
    [name: string]: any;
}

const OptsValid: UserOpts = {
    width: true,
    height: true,
}

const OptsTypes: UserOpts = {
    width: "number",
    height: "number",
}

export
const Defaults : UserOpts = {
    width: 200*4,
    height: 200*3,
}

function optsFromString(opt: string, value: string): any {
    const optType = OptsTypes[opt];
    switch (optType) {
        case "string": {
            return value;
        }
        case "number": {
            return Number.parseInt(value);
        }
    }
    throw new Error("Opt have no type!: "+ opt);
}


function parseOpts(got: string[], opts: UserOpts): UserOpts  {
    const results: UserOpts = {};
    let pos;
    for (const found of got) {
        if(!found) continue
        pos = found.indexOf(":");
        if (-1 === pos)
            continue;
        const opt_found = found.slice(0, pos);
        for (const opt of Object.keys(opts)) {
            if (opt === opt_found) {
                results[opt] =  optsFromString(opt, found.slice(pos + 1));
                break;
            }
        }
    }
    return results;
}

// function border(x: string, render_info: RenderInfo) : string {
//     return `<div width="${render_info.width}px" style="border: 2px solid green">${x}</div>`;
// }
//
// function outer(x: string) : string {
//     return `<div width="100%" style="border: 2px solid darkred">${x}</div>`
// }

export const EchartsPlugin = (md: MarkdownIt, opts?: OnlineOptions) => {
    const tempFence = md.renderer.rules.fence!.bind(md.renderer.rules)!;

    md.renderer.rules.fence = (tokens: Token[], idx: number, options: Options, env: any, slf: Renderer) => {
        const token = tokens[idx];
        const chunks = (token.info || ``).match(/^(\S+)(\s+(.+))?/);
        if (!chunks || !chunks.length || (chunks[1] !== "echarts")) {
            return tempFence(tokens, idx, options, env, slf);
        }

        const codeopts = parseOpts(chunks[0].split(" "), OptsValid);

        const code = token.content;
        const renderinfo: RenderInfo = {
            ...Defaults,
            opts: {...opts},
            ...codeopts,
            chunks,
            token,
            lang: chunks[1],
            code: code,
        };
        let render_f = opts ? (opts.render_f ? opts.render_f : null) : null;
        if (render_f == null) {
            render_f = render_default;
        }

        // try yaml
        let obj: any = null;
        try {
            obj = yaml.safeLoad(code);
        } catch (err) {
            console.error("yaml parsing failed: " + (err.toString()));
            try {
                obj = JSON.parse(code);
            } catch (err) {
                console.error("json parsing failed: " + (err.toString()));
                obj = code;
            }
        }

        renderinfo.obj = obj;
        return render_f(renderinfo);
    };

    // const tempRender = md.renderer.render.bind(md.renderer);
    // md.renderer.render = (tokens: Token[], options: any, env: any) => {
    //     return `${tempRender(tokens, options, env)}`;
    // };
};
export default EchartsPlugin;
