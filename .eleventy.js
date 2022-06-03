const htmlmin = require("html-minifier");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("src/static/photos/**/*");
  eleventyConfig.addPassthroughCopy("src/static/css");
  eleventyConfig.addPassthroughCopy("src/static/icon");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

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

  return {
    dir: {
      input: "src",
    },
  };
};
