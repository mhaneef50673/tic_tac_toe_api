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
  const { playerOne, playerTwo, wonBy } = dataToSave;
  const existingData = readData(filePath);
  const { leaderboard: data } = existingData;
  const existingPlayerOneIndex = lodash.findIndex(data, (val) =>
    val.name === playerOne ? true : false
  );
  const existingPlayerTwoIndex = lodash.findIndex(data, (val) =>
    val.name === playerTwo ? true : false
  );
  if (existingPlayerOneIndex > -1) {
    const existingPlayerOneResult = data[existingPlayerOneIndex];
    existingPlayerOneResult.points =
      existingPlayerOneResult.points + (wonBy === playerOne ? 1 : 0);
    data[existingPlayerOneIndex] = existingPlayerOneResult;
  } else {
    data.push({
      name: playerOne,
      points: wonBy === playerOne ? 1 : 0,
    });
  }
  if (existingPlayerTwoIndex > -1) {
    const existingPlayerTwoResult = data[existingPlayerTwoIndex];
    existingPlayerTwoResult.points =
      existingPlayerTwoResult.points + (wonBy === playerTwo ? 1 : 0);
    data[existingPlayerTwoIndex] = existingPlayerTwoResult;
  } else {
    data.push({
      name: playerTwo,
      points: wonBy === playerTwo ? 1 : 0,
    });
  }
  writeData(filePath, {
    leaderboard: data,
  });
};

module.exports = {
  saveData,
  readData,
};
