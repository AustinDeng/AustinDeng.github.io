import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "游戏杂谈",
      icon: "material-symbols:videogame-asset-outline",
      prefix: "game/",
      link: "game/",
      children: "structure",
    },
    {
      text: "闲窗偶录",
      icon: "book",
      prefix: "essay/",
      link: "essay/",
      children: "structure",
    },
    {
      text: "邓某的书架",
      icon: "scroll",
      prefix: "redingnotes/",
      link: "redingnotes/",
      children: "structure",
    },
    // {
    //   text: "Demo",
    //   icon: "laptop-code",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },
    // {
    //   text: "Articles",
    //   icon: "book",
    //   prefix: "posts/",
    //   children: "structure",
    // },
    // "intro",
    // {
    //   text: "Slides",
    //   icon: "person-chalkboard",
    //   link: "https://ecosystem.vuejs.press/plugins/markdown/revealjs/demo.html",
    // },
  ],
  // "/demo/": [
  //   "",
  //   {
  //     text: "Demo",
  //     icon: "laptop-code",
  //     prefix: "demo/",
  //     link: "demo/",
  //     children: "structure",
  //   },
  //   {
  //     text: "Articles",
  //     icon: "book",
  //     prefix: "posts/",
  //     children: "structure",
  //   },
  //   "intro",
  //   {
  //     text: "Slides",
  //     icon: "person-chalkboard",
  //     link: "https://ecosystem.vuejs.press/plugins/markdown/revealjs/demo.html",
  //   },
  // ],
  // "/document/":"structure",
  "/document/":[
    "",
    {
      text: "HBase",
      icon: "database",
      prefix: "hbase/",
      link: "hbase/",
      children: "structure"
    },
    {
      text: "AI",
      icon: "computer",
      prefix: "ai/",
      link: "ai/",
      children: "structure"
    },
    {
      text: "算法",
      icon: "rainbow",
      prefix: "algorithm/",
      link: "algorithm/",
      children: "structure"
    },
    {
      text: "理财知识",
      icon: "key",
      prefix: "financial/",
      link: "financial/",
      children: "structure"
    },
    // {
    //   text: "document",
    //   link: "",
    //   children: "structure",
    // },
    // {
    //   text: "hadoop",
    //   icon: "book",
    //   // prefix: "demo/",
    //   link: "hadoop/",
    //   prefix: "hadoop/",
    //   children: "structure"
    // },
    // "example1",
    // "example2",
  ],
});
