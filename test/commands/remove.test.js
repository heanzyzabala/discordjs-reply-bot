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
    expect(Remove.aliases).to.deep.equal(['r'])
  });
  it('should return usage', () => {
    expect(Remove.usage).to.equal('"<key>"|<index>');
  });
  describe('#execute', () => {
    let username;
    let user;
    let member;
    let send;
    let channel;
    let message;
    const argsList = [
      'hello',
      '"hello',
      'hello"',
      '-1'
    ];
    for (i in argsList) {
      beforeEach(() => {
        sinon.restore();
        username = sinon.spy();
        user = { username };
        member = { user };
        send = sinon.spy();
        channel = { send };
        message = { channel, member };
      });
      it(`should return when args: ${argsList[i]} does not match pattern`, () => {
        const { matches, type } = Remove.matches(argsList[i]);
        expect(matches).to.be.null;
      });
    }
  })
});
