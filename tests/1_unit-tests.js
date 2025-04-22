const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  // Test 1: Whole number input
  test('Whole number input', done => {
    assert.equal(convertHandler.getNum('5gal'), 5);
    done();
  });

  // Test 2: Decimal number input
  test('Decimal input', done => {
    assert.equal(convertHandler.getNum('3.5kg'), 3.5);
    done();
  });

  // Test 3: Fractional input
  test('Fractional input', done => {
    assert.equal(convertHandler.getNum('1/2mi'), 0.5);
    done();
  });

  // Test 4: Fractional input with decimal
  test('Fractional with decimal input', done => {
    assert.equal(convertHandler.getNum('3/4.5km'), 0.6666666666666666);
    done();
  });

  // Test 5: Invalid double fraction input
  test('Invalid double fraction input', done => {
    assert.equal(convertHandler.getNum('1/2/3gal'), 'invalid number');
    done();
  });

  // Test 6: Default to 1 when no numerical input is provided
  test('Default to 1 when no numerical input', done => {
    assert.equal(convertHandler.getNum('kg'), 1);
    done();
  });

  // Test 7: Valid unit - gallons
  test('Valid unit - gallons', done => {
    assert.equal(convertHandler.getUnit('1gal'), 'gal');
    done();
  });

  // Test 8: Valid unit - liters
  test('Valid unit - liters', done => {
    assert.equal(convertHandler.getUnit('1L'), 'L');
    done();
  });

  // Test 9: Valid unit - miles
  test('Valid unit - miles', done => {
    assert.equal(convertHandler.getUnit('1mi'), 'mi');
    done();
  });

  // Test 10: Valid unit - kilometers
  test('Valid unit - kilometers', done => {
    assert.equal(convertHandler.getUnit('1km'), 'km');
    done();
  });

  // Test 11: Valid unit - pounds
  test('Valid unit - pounds', done => {
    assert.equal(convertHandler.getUnit('1lbs'), 'lbs');
    done();
  });

  // Test 12: Valid unit - kilograms
  test('Valid unit - kilograms', done => {
    assert.equal(convertHandler.getUnit('1kg'), 'kg');
    done();
  });

  // Test 13: Invalid unit
  test('Invalid unit', done => {
    assert.equal(convertHandler.getUnit('123abc'), 'invalid unit');
    done();
  });

  // Test 14: Return unit for gallons
  test('Return unit for gallons', done => {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    done();
  });

  // Test 15: Return unit for liters
  test('Return unit for liters', done => {
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    done();
  });

  // Test 16: Return unit for miles
  test('Return unit for miles', done => {
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    done();
  });

  // Test 17: Return unit for kilometers
  test('Return unit for kilometers', done => {
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    done();
  });

  // Test 18: Return unit for pounds
  test('Return unit for pounds', done => {
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    done();
  });

  // Test 19: Return unit for kilograms
  test('Return unit for kilograms', done => {
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
    done();
  });

  // Test 20: Spell out unit - gallons
  test('Spell out unit - gallons', done => {
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    done();
  });

  // Test 21: Spell out unit - liters
  test('Spell out unit - liters', done => {
    assert.equal(convertHandler.spellOutUnit('L'), 'liters');
    done();
  });

  // Test 22: Spell out unit - miles
  test('Spell out unit - miles', done => {
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
    done();
  });

  // Test 23: Spell out unit - kilometers
  test('Spell out unit - kilometers', done => {
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
    done();
  });

  // Test 24: Spell out unit - pounds
  test('Spell out unit - pounds', done => {
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    done();
  });

  // Test 25: Spell out unit - kilograms
  test('Spell out unit - kilograms', done => {
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
    done();
  });

  // Test 26: Convert gallons to liters
  test('Convert gallons to liters', done => {
    const δ = 1e-5;
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, δ);
    done();
  });

  // Test 27: Convert liters to gallons
  test('Convert liters to gallons', done => {
    const δ = 1e-5;
    assert.approximately(convertHandler.convert(1, 'L'), 0.264172, δ);
    done();
  });

  // Test 28: Convert miles to kilometers
  test('Convert miles to kilometers', done => {
    const δ = 1e-5;
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, δ);
    done();
  });

  // Test 29: Convert kilometers to miles
  test('Convert kilometers to miles', done => {
    const δ = 1e-5;
    assert.approximately(convertHandler.convert(1, 'km'), 0.621371, δ);
    done();
  });

  // Test 30: Convert pounds to kilograms
  test('Convert pounds to kilograms', done => {
    const δ = 1e-5;
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, δ);
    done();
  });

  // Test 31: Convert kilograms to pounds
  test('Convert kilograms to pounds', done => {
    const δ = 1e-5;
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, δ);
    done();
  });
});