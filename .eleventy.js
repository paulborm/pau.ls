require("dotenv").config();
const htmlmin = require("html-minifier");
const dayjs = require("dayjs");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("src/static/photos/**/*.(jpg|jpeg)");
  eleventyConfig.addPassthroughCopy("src/static/css");
  eleventyConfig.addPassthroughCopy("src/static/icon");
  eleventyConfig.addPassthroughCopy({ "src/static/favicon": "/" });

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
    return dayjs(value).format("DD/MM/YYYY"); // display
  });

  return {
    dir: {
      input: "src",
    },
  };
};
