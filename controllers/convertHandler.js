function ConvertHandler() {

  this.getNum = function(input) {
    input = input.trim();
    if (input.match(/^[a-zA-Z]+$/)) return 1;
    let result = input.split(/[a-zA-Z]/)[0].replace(/[^0-9.\/]/g, '');
    if (result.split('/').length > 2) return 'invalid number';

    if (result.includes('/')) {
      const [num, den] = result.split('/');
      if (!den || den === '0') return 'invalid number';
      result = parseFloat(num) / parseFloat(den);
    } else {
      result = parseFloat(result);
    }
    if (isNaN(result) || !isFinite(result) || result <= 0 || result < 0.00001 || result > 1000000) {
      return 'invalid number';
    }
    return result;
  };

  this.getUnit = function(input) {
    const m = input.match(/[a-zA-Z]+$/);
    if (!m) return 'invalid unit';
    const u = m[0].toLowerCase();
    const valid = ['gal','l','mi','km','lbs','kg'];
    if (!valid.includes(u)) return 'invalid unit';
    return u === 'l' ? 'L' : u;
  };

  this.getReturnUnit = function(initUnit) {
    const map = { gal:'l', l:'gal', mi:'km', km:'mi', lbs:'kg', kg:'lbs' };
    const key = initUnit.toLowerCase();
    if (!map[key]) return 'invalid unit';
    const ret = map[key];
    return ret === 'l' ? 'L' : ret;
  };

  this.spellOutUnit = function(unit) {
    const map = {
      gal:'gallons', l:'liters', mi:'miles',
      km:'kilometers', lbs:'pounds', kg:'kilograms'
    };
    const key = unit.toLowerCase();
    return map[key] || 'invalid unit';
  };

  this.convert = function(initNum, initUnit) {
    // FCC’s exact factors (and exact reciprocals for L↔gal and km↔mi)
    const rates = {
      gal: 3.78541,
      l:   1 / 3.78541,
      mi:  1.60934,
      km:  1 / 1.60934,
      lbs: 0.453592,
      kg:  1 / 0.453592  // precise FCC match
    };
    
    
    const key = initUnit.toLowerCase();
    const factor = rates[key];
    if (factor === undefined) return 'invalid unit';
    
    // always multiply, then round to 5 decimals
    const result = parseFloat((initNum * factor).toFixed(5));
    return result;
  };
  

  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    // Combined error first
    if (initNum === 'invalid number' && initUnit === 'invalid unit') 
      return 'invalid number and unit';
    if (initNum === 'invalid number') 
      return 'invalid number';
    if (initUnit === 'invalid unit') 
      return 'invalid unit';

    const inSpell  = this.spellOutUnit(initUnit);
    const outSpell = this.spellOutUnit(returnUnit);
    return `${initNum} ${inSpell} converts to ${returnNum} ${outSpell}`;
  };
}

module.exports = ConvertHandler;
