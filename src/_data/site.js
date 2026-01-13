module.exports = () => {
  return {
    url: "https://pau.ls",
    title: "Aus der Zeit gestohlene Erinnerungen und Geschichten | Paul Borm",
    nav: [
      {
        title: "Paul Borm",
        href: "/",
        isHome: true,
      },
      {
        title: "fotos",
        href: "/fotos/",
      },
    ],
    currentDate: () => {
      // You can have a JavaScript function here!
      return new Date().getFullYear();
    },
  };
};
