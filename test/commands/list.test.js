/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const List = require('../../src/commands/list');
const Views = require('../../src/views');
const Spiels = require('../../src/spiels');

describe('list', () => {
  it('should return name', () => {
    expect(List.name).to.be.equal('list');
  });
  it('should return aliases', () => {
    expect(List.aliases).to.deep.equal(['l']);
  });
  it('should return usage', () => {
    expect(List.usage).to.be.equal('');
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
    it('should show error when listing failed', async () => {
      const spielsStub = sinon.stub(Spiels, 'list').returns({ error: true, mappings: [] });
      const viewsSpy = sinon.spy(Views, 'error');

      await List.execute(message);

      expect(spielsStub.calledOnce).to.be.true;
      expect(send.calledOnce).to.be.true;
      expect(viewsSpy.calledOnce).to.be.true;
    });
  });
});
