# markdown-it-echarts

[![Actions Status](https://github.com/tenuki/markdown-it-plugin-echarts/workflows/On%20Commit%20Build%20and%20Tests/badge.svg)](https://github.com/tenuki/markdown-it-pikchr/actions)
[![Actions Status](https://github.com/tenuki/markdown-it-plugin-echarts/workflows/On%20new%20release%20Build%20and%20Tests/badge.svg)](https://github.com/tenuki/markdown-it-pikchr/actions)

### How to add Echarts support to Markdown-It

Use `markdown-it-echarts` as a regular plugin.

```sh
npm install markdown-it markdown-it-plantuml-online
```

Configure the markdown-it instance:

```javascript
// node.js, "classic" way:
var echarts = require('markdown-it-plugin-echarts');
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
    md.use(echarts);   // md.use(plantuml, {..})   with options
var result = md.render(aMarkdownDocument);
```

Document including an echart graphic options in json or yaml format, like this:

```echarts
xAxis:
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
```


----
Code based on: https://github.com/christianvoigt/argdown/tree/master/packages/argdown-markdown-it-plugin
