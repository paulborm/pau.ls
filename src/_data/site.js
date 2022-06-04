module.exports = () => {
  return {
    url: "https://pau.ls",
    title: "Pauls Raum für Fotografie und kreatives 🤡 | Paul Borm",
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
