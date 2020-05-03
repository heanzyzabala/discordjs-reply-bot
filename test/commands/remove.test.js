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
  describe('#matches', () => {
    const invalidArgs = [
      'hello',
      '"hello',
      'hello"',
      '"hel"lo"',
      '-1'
    ];
    for (i in invalidArgs) {
      it(`should return null when args: ${invalidArgs[i]} does not match pattern`, () => {
        const { matches, type } = Remove.matches(invalidArgs[i]);
        expect(matches).to.be.null;
        expect(type).to.be.null;
      });
    }
    const validArgs = [
      {
        args: '"hello"',
        type: 'key'
      },
      {
        args: '1',
        type: 'index'
      }
    ];
    for (i in validArgs) {
      it(`should return value and type when args: ${validArgs[i].args} matches pattern`, () => {
        const { matches, type } = Remove.matches(validArgs[i].args);
        expect(matches).to.not.be.null;
        expect(type).to.be.equal(validArgs[i].type);
      });
    }
  })
});
