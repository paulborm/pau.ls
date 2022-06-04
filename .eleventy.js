require("dotenv").config();
const htmlmin = require("html-minifier");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("src/static/photos/**/*.(jpg|jpeg)");
  eleventyConfig.addPassthroughCopy("src/static/css");
  eleventyConfig.addPassthroughCopy("src/static/icon");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      const minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  // Universal filters (Adds to Liquid, Nunjucks, and Handlebars)
  // Example: Input should look this `2022-05-22`
  eleventyConfig.addFilter("formatLocaleDate", function (value) {
    // Note: Randomly chose "es" as the locale as it supports `dd/mm/yyyy` LOL
    return Intl.DateTimeFormat("es", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }).format(new Date(value));
  });

  return {
    dir: {
      input: "src",
    },
  };
};
