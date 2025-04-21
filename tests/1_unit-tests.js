const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  // Whole number input test
  test('Whole number input', done => {
    assert.equal(convertHandler.getNum('5gal'), 5);
    done();
  });

  // Decimal input test
  test('Decimal input', done => {
    assert.equal(convertHandler.getNum('3.5kg'), 3.5);
    done();
  });

  // Fractional input test
  test('Fractional input', done => {
    assert.equal(convertHandler.getNum('1/2mi'), 0.5);
    done();
  });

  // Fractional with decimal input test
  test('Fractional with dec', done => {
    assert.equal(convertHandler.getNum('3/4.5km'), 0.6666666666666666);
    done();
  });

  // Invalid double fraction input test
  test('Invalid double frac', done => {
    assert.equal(convertHandler.getNum('1/2/3gal'), 'invalid number');
    done();
  });

  // Default no input number test
  test('Default no input num', done => {
    assert.equal(convertHandler.getNum('kg'), 1);
    done();
  });

  // Valid unit test
  test('Valid unit', done => {
    ['gal', 'L', 'mi', 'KM', 'lbs', 'KG'].forEach(u => {
      const out = convertHandler.getUnit('1' + u);
      if (u.toLowerCase() === 'l') assert.equal(out, 'L');
      else assert.equal(out, u.toLowerCase());
    });
    done();
  });

  // Invalid unit test
  test('Invalid unit', done => {
    assert.equal(convertHandler.getUnit('123abc'), 'invalid unit');
    done();
  });

  // Return unit test
  test('Return unit', done => {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');   // gal -> L
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');   // L -> gal
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');   // mi -> km
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');   // km -> mi
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');  // lbs -> kg
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');  // kg -> lbs
    done();
  });

  // Spell out unit test
  test('Spell out unit', done => {
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.equal(convertHandler.spellOutUnit('L'), 'liters');
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
    done();
  });

  // Unit conversion test
  test('Unit conversion', done => {
    // Allow 1e-5 tolerance
    const δ = 1e-5;
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, δ);
    assert.approximately(convertHandler.convert(1, 'l'), 0.264172, δ);
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, δ);
    assert.approximately(convertHandler.convert(1, 'km'), 0.621371, δ);
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, δ);
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, δ);
    done();
  });
});
