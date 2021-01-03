import {expect} from "chai";
import {describe, it} from "mocha";
import EchartsPlugin, {Defaults} from "../src/markdown-it-plugin-echarts";

const MarkdownIt = require("markdown-it");

const MarkdownTemplate = (source: string, tag='echarts') => `# Markdown header
Some *Markdown* text before the code fences.
\`\`\`${tag}
${source}
\`\`\``

const basicYaml = `xAxis:
  type: category
  data:
    - Mon
    - Tue
    - Wed
    - Thu
    - Fri
    - Sat
    - Sun
yAxis:
  type: value
series:
  - data:
      - 120
      - 200
      - 150
      - 80
      - 70
      - 110
      - 130
    type: bar
    showBackground: true
    backgroundStyle:
      color: 'rgba(180, 180, 180, 0.2)'
`

const basicExpected = (w: number, h: number) => `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" style="user-select: none; " width="${w}" height="${h}"><g><rect width="${w}" height="${h}" x="0" y="0" id="0" style="fill: transparent;"></rect></g><g><path d="M 80 530.5 L 720 530.5" fill="none" stroke="#E0E6F1" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-miterlimit="10"></path><path d="M 80 412.5 L 720 412.5" fill="none" stroke="#E0E6F1" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-miterlimit="10"></path><path d="M 80 295.5 L 720 295.5" fill="none" stroke="#E0E6F1" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-miterlimit="10"></path><path d="M 80 177.5 L 720 177.5" fill="none" stroke="#E0E6F1" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-miterlimit="10"></path><path d="M 80 60.5 L 720 60.5" fill="none" stroke="#E0E6F1" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-miterlimit="10"></path><path d="M 80 530.5 L 720 530.5" fill="none" stroke="#6E7079" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="round" stroke-miterlimit="10"></path><path d="M 80.5 530 L 80.5 535" fill="none" stroke="#6E7079" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-miterlimit="10"></path><path d="M 171.5 530 L 171.5 535" fill="none" stroke="#6E7079" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-miterlimit="10"></path><path d="M 263.5 530 L 263.5 535" fill="none" stroke="#6E7079" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-miterlimit="10"></path><path d="M 354.5 530 L 354.5 535" fill="none" stroke="#6E7079" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-miterlimit="10"></path><path d="M 445.5 530 L 445.5 535" fill="none" stroke="#6E7079" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-miterlimit="10"></path><path d="M 537.5 530 L 537.5 535" fill="none" stroke="#6E7079" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-miterlimit="10"></path><path d="M 628.5 530 L 628.5 535" fill="none" stroke="#6E7079" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-miterlimit="10"></path><path d="M 720.5 530 L 720.5 535" fill="none" stroke="#6E7079" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-miterlimit="10"></path><text xml:space="preserve" style="font: sans-serif 12px normal normal normal 12px;" fill="#6E7079" fill-opacity="1" stroke="none" transform="matrix(1,0,0,1,72,530)" dominant-baseline="central" text-anchor="end" x="0" y="0">0</text><text xml:space="preserve" style="font: sans-serif 12px normal normal normal 12px;" fill="#6E7079" fill-opacity="1" stroke="none" transform="matrix(1,0,0,1,72,412.5)" dominant-baseline="central" text-anchor="end" x="0" y="0">50</text><text xml:space="preserve" style="font: sans-serif 12px normal normal normal 12px;" fill="#6E7079" fill-opacity="1" stroke="none" transform="matrix(1,0,0,1,72,295)" dominant-baseline="central" text-anchor="end" x="0" y="0">100</text><text xml:space="preserve" style="font: sans-serif 12px normal normal normal 12px;" fill="#6E7079" fill-opacity="1" stroke="none" transform="matrix(1,0,0,1,72,177.5)" dominant-baseline="central" text-anchor="end" x="0" y="0">150</text><text xml:space="preserve" style="font: sans-serif 12px normal normal normal 12px;" fill="#6E7079" fill-opacity="1" stroke="none" transform="matrix(1,0,0,1,72,60)" dominant-baseline="central" text-anchor="end" x="0" y="0">200</text><text xml:space="preserve" style="font: sans-serif 12px normal normal normal 12px;" fill="#6E7079" fill-opacity="1" stroke="none" transform="matrix(1,0,0,1,125.7143,538)" dominant-baseline="central" text-anchor="middle" x="0" y="6">Mon</text><text xml:space="preserve" style="font: sans-serif 12px normal normal normal 12px;" fill="#6E7079" fill-opacity="1" stroke="none" transform="matrix(1,0,0,1,217.1429,538)" dominant-baseline="central" text-anchor="middle" x="0" y="6">Tue</text><text xml:space="preserve" style="font: sans-serif 12px normal normal normal 12px;" fill="#6E7079" fill-opacity="1" stroke="none" transform="matrix(1,0,0,1,308.5714,538)" dominant-baseline="central" text-anchor="middle" x="0" y="6">Wed</text><text xml:space="preserve" style="font: sans-serif 12px normal normal normal 12px;" fill="#6E7079" fill-opacity="1" stroke="none" transform="matrix(1,0,0,1,400,538)" dominant-baseline="central" text-anchor="middle" x="0" y="6">Thu</text><text xml:space="preserve" style="font: sans-serif 12px normal normal normal 12px;" fill="#6E7079" fill-opacity="1" stroke="none" transform="matrix(1,0,0,1,491.4286,538)" dominant-baseline="central" text-anchor="middle" x="0" y="6">Fri</text><text xml:space="preserve" style="font: sans-serif 12px normal normal normal 12px;" fill="#6E7079" fill-opacity="1" stroke="none" transform="matrix(1,0,0,1,582.8571,538)" dominant-baseline="central" text-anchor="middle" x="0" y="6">Sat</text><text xml:space="preserve" style="font: sans-serif 12px normal normal normal 12px;" fill="#6E7079" fill-opacity="1" stroke="none" transform="matrix(1,0,0,1,674.2857,538)" dominant-baseline="central" text-anchor="middle" x="0" y="6">Sun</text><path d="M 94.1714 60 L 157.2571 60 L 157.2571 530 L 94.1714 530 L 94.1714 60" fill="rgba(180, 180, 180, 0.2)" fill-opacity="1" stroke="none"></path><path d="M 185.6 60 L 248.6857 60 L 248.6857 530 L 185.6 530 L 185.6 60" fill="rgba(180, 180, 180, 0.2)" fill-opacity="1" stroke="none"></path><path d="M 277.0286 60 L 340.1143 60 L 340.1143 530 L 277.0286 530 L 277.0286 60" fill="rgba(180, 180, 180, 0.2)" fill-opacity="1" stroke="none"></path><path d="M 368.4571 60 L 431.5429 60 L 431.5429 530 L 368.4571 530 L 368.4571 60" fill="rgba(180, 180, 180, 0.2)" fill-opacity="1" stroke="none"></path><path d="M 459.8857 60 L 522.9714 60 L 522.9714 530 L 459.8857 530 L 459.8857 60" fill="rgba(180, 180, 180, 0.2)" fill-opacity="1" stroke="none"></path><path d="M 551.3143 60 L 614.4 60 L 614.4 530 L 551.3143 530 L 551.3143 60" fill="rgba(180, 180, 180, 0.2)" fill-opacity="1" stroke="none"></path><path d="M 642.7429 60 L 705.8286 60 L 705.8286 530 L 642.7429 530 L 642.7429 60" fill="rgba(180, 180, 180, 0.2)" fill-opacity="1" stroke="none"></path><path d="M 94.1714 530 L 157.2571 530 L 157.2571 248 L 94.1714 248 L 94.1714 530" fill="#5470c6" fill-opacity="1" stroke="none"></path><path d="M 185.6 530 L 248.6857 530 L 248.6857 60 L 185.6 60 L 185.6 530" fill="#5470c6" fill-opacity="1" stroke="none"></path><path d="M 277.0286 530 L 340.1143 530 L 340.1143 177.5 L 277.0286 177.5 L 277.0286 530" fill="#5470c6" fill-opacity="1" stroke="none"></path><path d="M 368.4571 530 L 431.5429 530 L 431.5429 342 L 368.4571 342 L 368.4571 530" fill="#5470c6" fill-opacity="1" stroke="none"></path><path d="M 459.8857 530 L 522.9714 530 L 522.9714 365.5 L 459.8857 365.5 L 459.8857 530" fill="#5470c6" fill-opacity="1" stroke="none"></path><path d="M 551.3143 530 L 614.4 530 L 614.4 271.5 L 551.3143 271.5 L 551.3143 530" fill="#5470c6" fill-opacity="1" stroke="none"></path><path d="M 642.7429 530 L 705.8286 530 L 705.8286 224.5 L 642.7429 224.5 L 642.7429 530" fill="#5470c6" fill-opacity="1" stroke="none"></path></g></svg>\n`;

describe("Basic testing", function () {
    const mdi = new MarkdownIt();
    mdi.use(EchartsPlugin);

    it("regular mode", function (done) {
        const result = mdi.render(MarkdownTemplate(basicYaml));
        expect(result.slice(result.indexOf("<svg"))).to.equals(basicExpected(Defaults.width, Defaults.height));
        done();
    });

    it("regular mode - width & height custom", function (done) {
        const width = 654;
        const height = 543;
        const result = mdi.render(MarkdownTemplate(basicYaml, `echarts width:${width} height:${height}`));
        const result_svg = result.slice(result.indexOf("<svg"));
        const expected2 = basicExpected(width,height);
        const expected = expected2.slice(0, expected2.indexOf(' x="0" y="0" '));
        expect(result_svg.slice(0, expected.length)).to.equals(expected);
        done();
    });

    it("regular mode - json input test", function (done) {
        const chart_options = `{"xAxis":{"type":"category","data":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},"yAxis":{"type":"value"},"series":[{"data":[120,200,150,80,70,110,130],"type":"bar","showBackground":true,"backgroundStyle":{"color":"rgba(180, 180,
 180, 0.2)"}}]}`
        const result = mdi.render(MarkdownTemplate(chart_options));
        expect(result.slice(result.indexOf("<svg"))).to.equals(basicExpected(Defaults.width, Defaults.height));
        done();
    })
});


