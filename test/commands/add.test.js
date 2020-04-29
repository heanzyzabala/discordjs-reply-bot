/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const Chai = require('chai');
const Sinon = require('sinon');
const Assert = require('assert');
const expect = Chai.expect;

const Add = require('../../src/commands/add');
const Views = require('../../src/views');

describe('add', () => {
  describe('#execute', () => {
    it('should return when args does not match pattern', () => {
      const username = Sinon.spy();
      const user = { username };
      const member = { user };
      const send = Sinon.spy();
      const channel = { send };
      const message = { channel, member };

      const ViewsSpy = Sinon.spy(Views);

      Add.execute(message, 'asdfghjkl');

      expect(send.calledOnce).to.be.true;
      expect(ViewsSpy.usage.calledOnce).to.be.true;
    });
  });
});
