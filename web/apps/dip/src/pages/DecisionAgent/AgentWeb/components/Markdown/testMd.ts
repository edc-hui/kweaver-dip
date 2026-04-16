// @ts-nocheck
export const mdContent =
  '## 😲 md-editor-rt\n' +
  '\n' +
  'Markdown 编辑器，React 版本，使用 jsx 和 typescript 语法开发，支持切换主题、prettier 美化文本等。\n' +
  '\n' +
  '### 🤖 基本演示\n' +
  '\n' +
  '**加粗**，<u>下划线</u>，_斜体_，~~删除线~~，上标====^26^，下标~1~，`inline code`，[超链接](https://github.com/imzbf)\n' +
  '\n' +
  '> 引用：《I Have a Dream》\n' +
  '\n' +
  '1. So even though we face the difficulties of today and tomorrow, I still have a dream.\n' +
  '2. It is a dream deeply rooted in the American dream.\n' +
  '3. I have a dream that one day this nation will rise up.\n' +
  '\n' +
  '- [ ] 周五\n' +
  '- [ ] 周六\n' +
  '- [x] 周天\n' +
  '\n' +
  '## 🤗 代码演示\n' +
  '\n' +
  '```js\n' +
  "import { defineComponent, ref } from 'vue';\n" +
  "import { MdEditor } from 'md-editor-rt';\n" +
  "import 'md-editor-rt/lib/style.css';\n" +
  '\n' +
  'export default defineComponent({\n' +
  "  name: 'MdEditor',\n" +
  '  setup() {\n' +
  "    const text = ref('');\n" +
  '    return () => (\n' +
  '      <MdEditor modelValue={text.value} onChange={(v: string) => (text.value = v)} />\n' +
  '    );\n' +
  '  }\n' +
  '});\n' +
  '```\n' +
  '\n' +
  '## 🖨 文本演示\n' +
  '\n' +
  '依照普朗克长度这项单位，目前可观测的宇宙的直径估计值（直径约 930 亿光年，即 8.8 × 10<sup>26</sup> 米）即为 5.4 × 10<sup>61</sup>倍普朗克长度。而可观测宇宙体积则为 8.4 × 10<sup>184</sup>立方普朗克长度（普朗克体积）。\n' +
  '\n' +
  '## 📈 表格演示\n' +
  '\n' +
  '| 表头1  |  表头2   |  表头3 |\n' +
  '| :----- | :------: | -----: |\n' +
  '| 左对齐 | 中间对齐 | 右对齐 |\n' +
  '\n' +
  '## 📏 公式\n' +
  '\n' +
  '行内：$x+y^{2x}$\n' +
  '\n' +
  '$$\n' +
  '\\sqrt[3]{x}\n' +
  '$$\n' +
  '\n' +
  '## 🧬 图表\n' +
  '\n' +
  '```mermaid\n' +
  'flowchart TD\n' +
  '  Start --> Stop\n' +
  '```\n' +
  '\n' +
  '## 🪄 提示\n' +
  '\n' +
  '!!! note 支持的类型\n' +
  '\n' +
  'note、abstract、info、tip、success、question、warning、failure、danger、bug、example、quote、hint、caution、error、attention\n' +
  '\n' +
  '!!!\n' +
  '\n' +
  '## ☘️ 占个坑@！\n';
