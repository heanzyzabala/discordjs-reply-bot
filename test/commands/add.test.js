/*r eslint-disable no-loop-func */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const Add = require('../../src/commands/add');
const Views = require('../../src/views');
const Spiels = require('../../src/spiels');

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
  describe('#matches', () => {
    const invalidArgs = [
      'hello world',
      '"hello" world',
      'hello "world"',
      '"hello" "world" --notIncludes',
      '"hello" "world" --notIgnoreCase',
      '"hello" "world" --notIncludes --notIgnoreCase',
      '"hello" "world" --ignoreCase --includes',
      '"he"llo" ""world"',
    ];
    for (i in invalidArgs) {
      it(`should return null when args: ${invalidArgs[i]} does not match pattern`, () => {
        const { matches } = Add.matches(invalidArgs[i]);
        expect(matches).to.be.null;
      });
    }
    const validArgs = [
      '"hello" "world"',
      '"hello world" "hola mundo"',
      '"hello" "world" --includes',
      '"hello" "world" --ignoreCase',
      '"hello" "world" --includes --ignoreCase',
    ];
    for (i in validArgs) {
      it(`should return value when args: ${validArgs[i]} matches pattern`, () => {
        const { matches } = Add.matches(validArgs[i]);
        expect(matches).to.not.be.null;
      });
    }
  });
  describe('#map', () => {
    it('should successfuly map', () => {
      const matches = [ '', 'hello', 'world', '--includes', '--ignoreCase' ];

      const mapping = Add.map(matches);

      expect(mapping.key).to.be.equal('hello');
      expect(mapping.value).to.be.equal('world');
      expect(mapping.criteria.format).to.be.equal('ignoreCase');
      expect(mapping.criteria.match).to.be.equal('includes');
    });
    it('should return default criteria', () => {
      const matches = [ '', 'hello', 'world' ];

      const mapping = Add.map(matches);

      expect(mapping.criteria.format).to.be.equal('exact');
      expect(mapping.criteria.match).to.be.equal('caseSensitive');
    });
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
      const viewsSpy = sinon.spy(Views, 'usage'); 
      sinon.stub(Add, 'matches').returns({ matches: null })

      Add.execute(message, 'hello world');

      expect(send.calledOnce).to.be.true;
      expect(viewsSpy.calledOnce).to.be.true;
    });
    it('should show error when saving failed', async () => {
      const viewsSpy = sinon.spy(Views, 'error');
      const matchesStub = sinon.stub(Add, 'matches').returns({ matches: [] });
      const mapStub = sinon.stub(Add, 'map').returns({});
      const spielsStub = sinon.stub(Spiels, 'save').returns({ error: true });

      await Add.execute(message, '');

      expect(matchesStub.calledOnce).to.be.true;
      expect(mapStub.calledOnce).to.be.true;
      expect(spielsStub.calledOnce).to.be.true;
      expect(send.calledOnce).to.be.true;
      expect(viewsSpy.calledOnce).to.be.true;
    }); 
    it('should show error when limit reached', async () => { 
      const viewsSpy = sinon.spy(Views, 'warning');
      const matchesStub = sinon.stub(Add, 'matches').returns({ matches: [] });
      const mapStub = sinon.stub(Add, 'map').returns({});
      const spielsStub = sinon.stub(Spiels, 'save')
        .returns({ limit: { reached: true, count: 10 } });

      await Add.execute(message, '');

      expect(matchesStub.calledOnce).to.be.true; 
      expect(mapStub.calledOnce).to.be.true;
      expect(spielsStub.calledOnce).to.be.true;
      expect(send.calledOnce).to.be.true;
      expect(viewsSpy.calledOnce).to.be.true;
    });
    it('should show ok', async () => {
      const viewsSpy = sinon.spy(Views, 'ok');
      const matchesStub = sinon.stub(Add, 'matches').returns({ matches: [] });
      const mapStub = sinon.stub(Add, 'map').returns({});
      const spielsStub = sinon.stub(Spiels, 'save')
        .returns({ limit: { reached: false } });

      await Add.execute(message, '');

      expect(matchesStub.calledOnce).to.be.true;
      expect(mapStub.calledOnce).to.be.true;
      expect(spielsStub.calledOnce).to.be.true;
      expect(send.calledOnce).to.be.true;
      expect(viewsSpy.calledOnce).to.be.true;     
    })
  })
});
