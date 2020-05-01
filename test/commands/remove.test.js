const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const Add = require('../../src/commands/remove');
const Views = require('../../src/views');

describe('remove', () => {
  it('should return name', () => {
    expect(Add.name).to.equal('remove');
  });
});