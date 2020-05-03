/* eslint-disable no-loop-func */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const Add = require('../../src/commands/add');
const Views = require('../../src/views');

describe('add', () => {
  it('should return name', () => {
    expect(Add.name).to.equal('add');
  });
  it('should return aliases', () => {
    expect(Add.aliases).to.deep.equal(['a']);
  });
  it('should return usage', () => {
    expect(Add.usage).to.equal('"<key>" "<value>" --includes? --ignoreCase?');
  });
  describe('#execute', () => {
    let username;
    let user;
    let member;
    let send;
    let channel;
    let message;
    const argsList = [
      'hello world',
      '"hello" world',
      'hello "world"',
      '"hello" "world" --notIncludes',
      '"hello" "world" --notIgnoreCase',
      '"hello" "world" --notIncludes --notIgnoreCase',
      '"he"llo" ""world"',
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
        const ViewsSpy = sinon.spy(Views);

        Add.execute(message, argsList[i]);

        expect(send.calledOnce).to.be.true;
        expect(ViewsSpy.usage.calledOnce).to.be.true;
      });
    }
  });
});
