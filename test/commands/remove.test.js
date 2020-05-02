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
});
