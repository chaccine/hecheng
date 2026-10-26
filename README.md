# 元件合成

一款手机竖屏的合成小游戏：同级电子元件碰在一起就会合成更高级的元件，从电阻一路合成到 CPU。

在线试玩：https://chaccine.github.io/hecheng/

## 玩法
- 点击或左右拖动瞄准，松手让元件落下。
- 合成链：电阻 → 电容 → 电感 → 二极管 → 三极管 → MOSFET → 运放 → 单片机 → FPGA → CPU。
- 元件在红色警戒线以上停留 2 秒，游戏结束。
- 最高分和元件图鉴保存在本机浏览器里。

## 技术
纯 HTML / CSS / JavaScript，物理引擎使用本地附带的 [Matter.js](https://brm.io/matter-js/)（MIT 许可），无需服务器。
