import { defineUserConfig } from "vuepress";
// import { shikiPlugin } from '@vuepress/plugin-shiki'

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "邓某的杂货铺",
  // title: "",
  description: "My Blog",

  theme,

  // plugins: [
  //   shikiPlugin({
  //     // 配置项
  //     langs: ['ts', 'json', 'vue', 'md', 'bash', 'diff'],
  //   }),
  // ],
  

  // Enable it with pwa
  // shouldPrefetch: false,
  
});


