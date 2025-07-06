import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "Demo",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "Articles",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    "intro",
    {
      text: "Slides",
      icon: "person-chalkboard",
      link: "https://ecosystem.vuejs.press/plugins/markdown/revealjs/demo.html",
    },
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
      text: "hbase",
      icon: "book",
      prefix: "hbase/",
      link: "hbase/",
      children: "structure"
    },
    {
      text: "document",
      link: "",
      children: "structure",
    },
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
