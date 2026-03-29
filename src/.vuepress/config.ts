import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "邓某的杂货铺",
  // title: "",
  description: "My Blog",

  theme,

  

  // Enable it with pwa
  // shouldPrefetch: false,
  
});


