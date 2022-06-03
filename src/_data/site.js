module.exports = () => {
  return {
    url: "https://pau.ls",
    title: "Everyday photos — Paul Borm",
    nav: [
      {
        title: "Paul Borm",
        href: "/",
        isHome: true,
      },
      {
        title: "photos",
        href: "/photos/",
      },
    ],
    currentDate: () => {
      // You can have a JavaScript function here!
      return new Date().getFullYear();
    },
  };
};
