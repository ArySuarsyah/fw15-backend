/* eslint-disable no-undef */
const fs = require('fs');

const fileRemover = (file) => {
  if (file) {
    fs.unlink(`upload/${file.filename}`, (err) => {
      if (err) {
        throw Error(err.message);
      }
    });
  }
};


module.exports = fileRemover