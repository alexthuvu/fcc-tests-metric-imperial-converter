'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      const input = req.query.input;
      // Handle missing or empty input
      if (!input || input.trim() === '') {
        return res.json({ error: 'invalid number and unit' });
      }

      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const returnNum = convertHandler.convert(initNum, initUnit);
      const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      // Error priority handling
      if (string === 'invalid number and unit') {
        return res.json({ error: 'invalid number and unit' });
      }
      if (string === 'invalid number') {
        return res.json({ error: 'invalid number' });
      }
      if (string === 'invalid unit') {
        return res.json({ error: 'invalid unit' });
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