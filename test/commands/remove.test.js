/* eslint-disable no-loop-func */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const Remove = require('../../src/commands/remove');
const Views = require('../../src/views');

describe('remove', () => {
  it('should return name', () => {
    expect(Remove.name).to.equal('remove');
  });
  it('should return aliases', () => {
    expect(Remove.aliases).to.deep.equal(['r']);
  });
  it('should return usage', () => {
    expect(Remove.usage).to.equal('"<key>"|<index>');
  });
  describe('#matches', () => {
    const invalidArgs = [
      'hello',
      '"hello',
      'hello"',
      '"hel"lo"',
      '-1',
    ];
    for (i in invalidArgs) {
      it(`should return null when args: ${invalidArgs[i]} does not match pattern`, () => {
        const { match, type } = Remove.matches(invalidArgs[i]);
        expect(match).to.be.null;
        expect(type).to.be.null;
      });
    }
    const validArgs = [
      {
        args: '"hello"',
        value: 'hello',
        type: 'key',
      },
      {
        args: '1',
        value: '1',
        type: 'index',
      },
    ];
    for (i in validArgs) {
      it(`should return value and type when args: ${validArgs[i].args} matches pattern`, () => {
        const { match, type } = Remove.matches(validArgs[i].args);
        expect(match).to.be.equal(validArgs[i].value);
        expect(type).to.be.equal(validArgs[i].type);
      });
    }
  });
  describe('#execute', () => {
    let username;
    let user;
    let guild;
    let id;
    let member;
    let send;
    let channel;
    let message;
    beforeEach(() => {
      sinon.restore();
      username = sinon.spy();
      user = { username };
      id = sinon.spy();
      guild = { id };
      member = { user, guild };
      send = sinon.spy();
      channel = { send };
      message = { channel, member };
    });
    it('should show usage when args is invalid', () => {
      sinon.stub(Remove, 'matches').returns({ match: null });
      const viewsSpy = sinon.spy(Views, 'usage');

      Remove.execute(message, '');

      expect(send.calledOnce).to.be.true;
      expect(viewsSpy.calledOnce).to.be.true;
    });
    it('should show error when removing has error', async () => {
      const matchesStub = sinon.stub(Remove, 'matches').returns({ match: true });
      const viewsSpy = sinon.spy(Views, 'error');

      await Remove.execute(message, '');

      expect(matchesStub.calledOnce).to.be.true;
      expect(send.calledOnce).to.be.true;
      expect(viewsSpy.calledOnce).to.be.true;
    });
    it('should show warning when removing failed', async () => {
      const matchesStub = sinon.stub(Remove, 'matches').returns({ match: true });
      const removeStub = sinon.stub(Remove, 'remove').returns({ removed: false, error: false });
      const viewsSpy = sinon.spy(Views, 'warning');

      await Remove.execute(message, '');

      expect(matchesStub.calledOnce).to.be.true;
      expect(removeStub.calledOnce).to.be.true;
      expect(send.calledOnce).to.be.true;
      expect(viewsSpy.calledOnce).to.be.true;
    });
    it('should show ok', async () => {
      const matchesStub = sinon.stub(Remove, 'matches').returns({ match: true });
      const removeStub = sinon.stub(Remove, 'remove').returns({ removed: true, error: false });
      const viewsSpy = sinon.spy(Views, 'ok');

      await Remove.execute(message, '');

      expect(matchesStub.calledOnce).to.be.true;
      expect(removeStub.calledOnce).to.be.true;
      expect(send.calledOnce).to.be.true;
      expect(viewsSpy.calledOnce).to.be.true;
    });
  });
});
