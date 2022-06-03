const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const map = new Map();

const createFile = ({ filePath, alt, caption }) => {
  const fileBuffer = fs.readFileSync(filePath);
  const hash = crypto.createHash("md5").update(fileBuffer).digest("hex");

  return {
    id: hash,
    url: path.relative("src", filePath),
    alt,
    caption,
  };
};

const getAllFiles = function (dirPath, root, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = [];

  files.forEach(function (file) {
    const filePath = path.resolve(dirPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, root, arrayOfFiles);
      map.set(file, arrayOfFiles);
    } else {
      if ([".jpg", ".jpeg"].includes(path.extname(filePath))) {
        const metadata = {
          alt: "",
          caption: "",
        };

        files.forEach((file) => {
          if (
            [".json"].includes(path.extname(file)) &&
            path.basename(file, path.extname(file)) === path.basename(filePath)
          ) {
            const fileMetadata = require(path.resolve(dirPath, file)) || {};
            metadata.alt = fileMetadata.alt;
            metadata.caption = fileMetadata.caption;
          }
        });

        arrayOfFiles.push(
          createFile({
            filePath,
            ...metadata,
          })
        );
      }
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

/*

[
  [
    "2022-06-03",
    [
      {
        "url": "static/photos/2022-05-26/...",
        "alt": "",
        "caption": "something somethin lorem ipsum"
      }
    ]
  ]
]

*/
