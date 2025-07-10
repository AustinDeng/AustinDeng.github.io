import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  // "/demo/",
  "/document/",
  {
    text: "Posts",
    icon: "pen-to-square",
    prefix: "/game/",
    children: [
      {
        text: "游戏杂谈",
        icon: "pen-to-square",
        prefix: "",
        children: [
          { text: "塞尔达：旷野之息", icon: "material-symbols:videogame-asset-outline", link: "塞尔达：旷野之息" },
        ],
      },
      // {
      //   text: "Apple",
      //   icon: "pen-to-square",
      //   prefix: "apple/",
      //   children: [
      //     { text: "Apple1", icon: "pen-to-square", link: "1" },
      //     { text: "Apple2", icon: "pen-to-square", link: "2" },
      //     "3",
      //     "4",
      //   ],
      // },
      // {
      //   text: "Banana",
      //   icon: "pen-to-square",
      //   prefix: "banana/",
      //   children: [
      //     {
      //       text: "Banana 1",
      //       icon: "pen-to-square",
      //       link: "1",
      //     },
      //     {
      //       text: "Banana 2",
      //       icon: "pen-to-square",
      //       link: "2",
      //     },
      //     "3",
      //     "4",
      //   ],
      // },
      // { text: "Cherry", icon: "pen-to-square", link: "cherry" },
      // { text: "Dragon Fruit", icon: "pen-to-square", link: "dragonfruit" },
      // "tomato",
      // "strawberry",
    ],
  },
  // {
  //   text: "V2 Docs",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/",
  // },
]);
