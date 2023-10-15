const path = require("path");
const fs = require("fs");
const { exit } = require("process");
const silenceMode = true;

const getExtensionFromFileName = function (fileName) {
  const fileNameSplited = fileName.split(".");

  return fileNameSplited.length > 1 ? fileNameSplited.pop() : false;
};

const removeExtensionFromFileName = function (fileName) {
  return fileName.split(".").slice(0, -1).join(".");
};

const capitalizeFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getCardName = function (cardName) {
  const fileNameSplited = cardName.split("-");
  return fileNameSplited.length > 1
    ? fileNameSplited.pop()
    : fileNameSplited[0];
};

const formatCardName = function (cardName) {
  cardName = cardName.trim();
  cardName = cardName.replace(/(\r\n|\n|\r)/gm, "");

  return capitalizeFirstLetter(cardName);
};

const formatCardTranslation = function (cardTranslation) {
  return cardTranslation ? formatCardName(cardTranslation) : cardTranslation;
};

const getCardNumber = function (cardName) {
  const fileNameSplited = cardName.split("-");
  const cardNumber =
    fileNameSplited.length > 1 ? parseFloat(fileNameSplited.shift()) : false;

  return cardNumber > 0 ? cardNumber : false;
};

String.prototype.nl2br = function () {
  return this.replace(/\n/g, "<br />");
};

const readFolder = async function (folder, parent) {
  const contents = [];

  const directoryPath = path.join(__dirname, folder);
  const folderFiles = fs.readdirSync(directoryPath);

  folderFiles.forEach(async function (fullName) {
    const fullPath = folder + "/" + fullName;

    // Directory / Folder
    if (fs.lstatSync(fullPath).isDirectory()) {
      const parentFullName = parent ? parent + "/" + fullName : fullName;
      const folderContents = await readFolder(fullPath, parentFullName);
      const folder = {
        type: "folder",
        name: fullName,
        parent: parentFullName,
        fullPath: fullPath,
        contents: folderContents,
      };

      contents.push(folder);
    }

    // File
    else {
      const fileName = removeExtensionFromFileName(fullName);
      const fileExtension = getExtensionFromFileName(fullName);

      const file = {
        type: "file",
        name: fileName,
        parent: parent,
        extension: fileExtension,
        fileName: fullName,
        fullPath: fullPath,
      };

      contents.push(file);
    }
  });

  return contents;
};

const readCategories = async function (folder, callback) {
  if (!fs.existsSync(folder)) {
    console.log(folder + " doesn't exists!");
    return false;
  }

  const contents = await readFolder(folder);

  const categoriesCards = readContents(contents);
  callback(categoriesCards.categories);
};

const readContents = (contents, parent) => {
  let cover = false;
  let categories = {};
  let cards = [];

  contents.forEach((content) => {
    content = readContent(content, parent);

    switch (content.type) {
      case "category":
        categories[content.name] = content;
        break;

      case "cover":
        cover = content;
        break;

      case "card":
        cards.push(content);
        break;
    }
  });

  return { cover, categories, cards };
};

const readContent = (content, parent) => {
  switch (content.type) {
    case "folder":
      const category = getCategory(content, parent);
      const folderContents = readContents(content.contents, content);
      category.cover = folderContents.cover;
      category.categories = folderContents.categories;
      category.cards = folderContents.cards;

      return category;
      break;
    case "file":
      const card = getCard(content, parent);

      return card;
      break;
  }

  return false;
};

const getCategory = (content, parent) => {
  return {
    type: "category",
    name: content.name,
    cover: false,
    parent: parent ? parent.parent : "",
  };
};

const getCard = (content, parent) => {
  if (content.extension == "txt") {
    const cardFileText = fs.readFileSync(content.fullPath, {
      encoding: "utf8",
      flag: "r",
    });
    const cardFileTextLines = cardFileText.split("\n");

    let cardName = getCardName(content.name);
    let cardQuestion = "";
    let cardAnswer = "";
    let cardOptions = [];
    if (cardFileTextLines.length > 1) 
    {
      cardQuestion = cardFileTextLines.shift();
      cardAnswer = cardFileTextLines.shift();
      cardOptions = cardFileTextLines;
    }

    const cardNumber = getCardNumber(content.name);
    const cardType =
      formatCardName(parent.name).toLowerCase() ==
      formatCardName(content.name).toLowerCase()
        ? "cover"
        : "card";
    const cardImage =
      findCardFile(content.name, parent, "jpg") ||
      findCardFile(content.name, parent, "png");
    const cardAudio =
      findCardFile(content.name, parent, "mp3") ||
      findCardFile(content.name, parent, "mpeg");

    return {
      type: cardType,
      name: formatCardName(cardName),
      number: cardNumber,
      category: parent ? parent.name : "",
      parent: content.parent,
      image: cardImage,
      audio: cardAudio,
      question: cardQuestion,
      answer: cardAnswer,
      options: cardOptions
    };
  }

  return false;
};

const findCardFile = (name, parent, extension) => {
  let file = false;

  if (parent && parent.contents)
    parent.contents.forEach((content) => {
      if (content.name === name && content.extension === extension)
        file = content;
    });

  return file.fileName;
};

const folder = process.argv[2] ? process.argv[2] : "./cards";
const categoriesJsonPath = folder + "/categories.json";

console.log("reading categories and cards...");

readCategories(folder, function (categories) {
  fs.writeFileSync(categoriesJsonPath, JSON.stringify(categories));
});
