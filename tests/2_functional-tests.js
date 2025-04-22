'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const expect = chai.expect;
chai.use(chaiHttp);

suite('Functional Tests', function () {
  test('Convert 10L to gal', function (done) {
    chai.request(server)
      .get('/api/convert?input=10L')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('initNum', 10);
        expect(res.body).to.have.property('initUnit', 'L');
        expect(res.body).to.have.property('returnNum').that.is.closeTo(2.64172, 0.00001);
        expect(res.body).to.have.property('returnUnit', 'gal');
        expect(res.body).to.have.property('string');
        done();
      });
  });

  test('Convert invalid unit (32g)', function (done) {
    chai.request(server)
      .get('/api/convert?input=32g')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('error', 'invalid unit');
        done();
      });
  });

  test('Convert invalid number and unit (3/7.2/4kilomegagram)', function (done) {
    chai.request(server)
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('error', 'invalid number and unit');
        done();
      });
  });

  test('Convert invalid number only (3/7.2/4kg)', function (done) {
    chai.request(server)
      .get('/api/convert?input=3/7.2/4kg')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('error', 'invalid number');
        done();
      });
  });

  test('Convert with no number (kg)', function (done) {
    chai.request(server)
      .get('/api/convert?input=kg')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('initNum', 1);
        expect(res.body).to.have.property('initUnit', 'kg');
        expect(res.body).to.have.property('returnNum').that.is.closeTo(2.20462, 0.00001);
        expect(res.body).to.have.property('returnUnit', 'lbs');
        expect(res.body).to.have.property('string');
        done();
      });
  });
});