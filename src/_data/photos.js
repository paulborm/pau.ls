const fs = require("fs");
const path = require("path");

const map = new Map();

const getAllFiles = function (dirPath, root, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, root, arrayOfFiles);
      map.set(file, arrayOfFiles);
    } else {
      const filePath = path.relative("src", `${dirPath}/${file}`);
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
};

module.exports = async function (config) {
  await getAllFiles(
    `${config.eleventy.env.root}/src/static/photos`,
    config.eleventy.env.root
  );

  // Note: Reverse to get the latest date first
  return Array.from(map).reverse();
};
