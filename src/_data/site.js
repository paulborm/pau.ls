module.exports = () => {
  return {
    url: "https://pau.ls",
    title: "Everyday photos — Paul Borm",
    currentDate: () => {
      // You can have a JavaScript function here!
      return new Date().getFullYear();
    },
  };
};
