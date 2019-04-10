const endorse = require('../../index');

describe("Run function suite test", function() {

  it("Should throw an error if form and rules objects are incompatible", function() {
    let form = { name: 'Vinicius' };
    let rules = { nome: ['required'] };

    expect(() => { endorse.run(form, rules) }).toThrow(); //  takes a function and calls it itself
  })

});

/*
 * Test alphabetic validator results
 */
describe("Alphanumeric validator", function() {
  let rules = {
    name: ['alpha']
  };

  it("Should accept alphabetic characters", function() {
    let form = {
      name: 'Vinicius'
    };

    expect(endorse.run(form, rules).status).toBeTruthy();
  });

  it("Should't accept special characters", function() {
    let form = {
      name: 'Vinicius_'
    };

    expect(endorse.run(form, rules).status).toBeFalsy();
  });

  it("Should't accept numbers", function() {
    let form = {
      name: 'Vinicius1'
    };

    expect(endorse.run(form, rules).status).toBeFalsy();
  });

  it("Should accept characters with graphic accentuation", function() {
    let form = {
      name: 'áéíóú'
    };

    expect(endorse.run(form, rules).status).toBeTruthy();
  });

});

describe("Alphanumeric endorse tests", function() {
  let rules = {
    name: ['alpha']
  };

  it("Should accept alphabetic characters", function() {
    let form = {
      name: 'Vinicius'
    };

    expect(endorse.run(form, rules).status).toBeTruthy();
  });

  it("Should't accept special characters", function() {
    let form = {
      name: 'Vinicius_'
    };

    expect(endorse.run(form, rules).status).toBeFalsy();
  });

  it("Should't accept numbers", function() {
    let form = {
      name: 'Vinicius1'
    };

    expect(endorse.run(form, rules).status).toBeFalsy();
  });

  it("Should accept characters with graphic accentuation", function() {
    let form = {
      name: 'áéíóú'
    };

    expect(endorse.run(form, rules).status).toBeTruthy();
  });

});

/*
 * Test alphanumeric validator results
 */
describe("Alphanumeric validator", function() {
  let rules = {
    name: ['alphanumeric']
  };

  it('Should accept numbers and alphabetic characters', function() {
    let form = {
      name: 'Vinicius 123'
    };

    expect(endorse.run(form, rules).status).toBeTruthy();
  });

  it('Should\'t accept special characters', function() {
    let form = {
      name: 'Vinicius 123 ^'
    };

    expect(endorse.run(form, rules).status).toBeFalsy();
  });

  it("Should accept characters with graphic accentuation", function() {
    let form = {
      name: 'áéíóú 1221 asada'
    };

    expect(endorse.run(form, rules).status).toBeTruthy();
  });
});