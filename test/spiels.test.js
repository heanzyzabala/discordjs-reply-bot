/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const Spiels = require('../src/spiels');
const Mongo = require('../src/mongo');

describe('spiels', () => {
  describe('#find', () => {
    let close;
    let client;
    let collection;
    let findOne;
    let spiel;
    let mappings;
    let db;
    beforeEach(() => {
      sinon.restore();
      close = sinon.spy();
      client = { close };
      collection = { findOne };
      db = { collection() { return collection; } };
    });
    it('should return value: null, error: true when db returns error', async () => {
      const mongoStub = sinon.stub(Mongo, 'connect').returns({ client, error: true });

      const { value, error } = await Spiels.find(1, '');

      expect(mongoStub.calledOnce).to.be.true;
      expect(value).to.be.equal(null);
      expect(error).to.be.equal(true);
    });
    it('should return value: null, error: false when guild does not exist', async () => {
      const mongoStub = sinon.stub(Mongo, 'connect').returns({ db, client, error: false });
      findOne = sinon.stub().returns({ spiel: null });
      collection = { findOne };
      db = { collection() { return collection; } };

      const { value, error } = await Spiels.find(1, '');

      expect(mongoStub.calledOnce).to.be.true;
      expect(findOne.calledOnce).to.be.true;
      expect(value).to.be.equal(null);
      expect(error).to.be.equal(false);
      expect(close.calledOnce).to.be.true;
    });
    it('should return value: null, error: false when mapping does not exist', async () => {
      const mongoStub = sinon.stub(Mongo, 'connect').returns({ db, client, error: false });
      mappings = [
        {
          key: 'key',
          criteria: {
            format: 'ignoreCase',
            match: 'exact',
          },
        },
      ];
      spiel = { mappings };
      findOne = sinon.stub().returns({ spiel });
      collection = { findOne };
      db = { collection() { return collection; } };

      const { value, error } = await Spiels.find(1, '');

      expect(mongoStub.calledOnce).to.be.true;
      expect(findOne.calledOnce).to.be.true;
      expect(value).to.be.equal(null);
      expect(error).to.be.equal(false);
      expect(close.calledOnce).to.be.true;
    });
  });
});
