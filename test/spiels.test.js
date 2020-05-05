/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const Spiels = require('../src/spiels');
const Mongo = require('../src/mongo');

describe('spiels', () => {
  describe('#find', () => {
    it('should return value null and error true when db returns error', async () => {
      const mongoStub = sinon.stub(Mongo, 'connect').returns({ error: true });

      const result = await Spiels.find(1, '');

      expect(mongoStub.calledOnce).to.be.true;
      expect(result.error).to.be.equal(true);
      expect(result.value).to.be.equal(null);
    });
    it('should return value null and error false when guild does not exist', async () => {
      const mongoStub = sinon.stub(Mongo, 'connect').returns({ error: false });

      const result = await Spiels.find(1, '');

      expect(mongoStub.calledOnce).to.be.true;
      expect(result.error).to.be.equal(false);
      expect(result.value).to.be.equal(null);
    });
  });
});
