/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const Find = require('../src/find');
const Views = require('../src/views');
const Spiels = require('../src/spiels');

describe('find', () => {
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
      author = 'author';
      message = { channel, author, member };
    });
    it('should show error when finding failed', async () => {
      const spielsStub = sinon.stub(Spiels, 'find').returns({ error: true });
      const viewSpy = sinon.spy(Views, 'error');

      await Find.execute(message);

      expect(spielsStub.calledOnce).to.be.true;
      expect(viewSpy.calledOnce).to.be.true;
    });
    it('should send reply', async () => {
      const spielsStub = sinon.stub(Spiels, 'find').returns({ value: 'value', error: false });

      await Find.execute(message);

      expect(spielsStub.calledOnce).to.be.true;
      expect(send.calledOnce).to.be.true;
      expect(send.calledWith('author, value'));
    });
  });
});
