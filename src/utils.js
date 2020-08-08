const fs = require("fs");
const lodash = require("lodash");

const writeData = function (filePath, data) {
  try {
    const jsonString = JSON.stringify(data);
    fs.writeFileSync(__dirname + filePath, jsonString);
  } catch (err) {
    console.log(`Error while write data from ${filePath}`);
    console.log(err);
  }
};

const readData = function (filePath) {
  try {
    const jsonString = fs.readFileSync(__dirname + filePath, "utf8");
    const feedbacks = JSON.parse(jsonString);
    return feedbacks;
  } catch (err) {
    console.log(`Error while reading data from ${filePath}`);
    console.log(err);
    return null;
  }
};

const saveData = function (dataToSave, filePath) {
  writeData(filePath, {
    leaderboard: dataToSave,
  });
};

module.exports = {
  saveData,
  readData,
};
