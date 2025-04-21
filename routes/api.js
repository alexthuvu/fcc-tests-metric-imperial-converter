'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  // Handle valid input, invalid number, invalid unit, etc.
  app.route('/api/convert')
  .get(function (req, res) {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    // Error priority handling
    if (string === 'invalid number and unit') {
      return res.send('invalid number and unit');  // Return a string instead of an object
    }
    if (string === 'invalid number') {
      return res.send('invalid number');
    }
    if (string === 'invalid unit') {
      return res.send('invalid unit');
    }

    // Valid conversion response
    return res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    });
  });

};
