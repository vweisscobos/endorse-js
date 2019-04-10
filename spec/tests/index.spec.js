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

/*
 * Test required validator results
 */
describe("Required validator", function() {
  let rules = {
    name: ['required']
  };

  it('Should\'t accept an empty string', function() {
    let form = {
      name: ''
    };

    expect(endorse.run(form, rules).status).toBeFalsy();
  });

  it('Should accept a string with one character', function() {
    let form = {
      name: 'a'
    };

    expect(endorse.run(form, rules).status).toBeTruthy();
  });

  it('Should\'t accept null values', function() {
    let form = {
      name: null
    };

    expect(endorse.run(form, rules).status).toBeFalsy();
  });

  it('Should\'t accept undefined', function() {
    let form = {
      name: undefined
    };

    expect(endorse.run(form, rules).status).toBeFalsy();
  });

  it('Should accept number zero', function() {
    let form = {
      name: 0
    };

    expect(endorse.run(form, rules).status).toBeTruthy();
  });

});

describe('Numeric validator', function() {
  let rules = {
    age: ['numeric']
  };

  it('Should accept numeric values', function() {
    let form = {
      age: 29
    };

    expect(endorse.run(form, rules).status).toBeTruthy();
  });

  it('Should\'t accept alphabetic values', function() {
    let form = {
      age: '2a'
    };

    expect(endorse.run(form, rules).status).toBeFalsy();
  });

  it('Should accept string if it have exclusively numeric characters', function() {
    let form = {
      age: '29'
    };

    expect(endorse.run(form, rules).status).toBeTruthy();
  });

});

describe('Date validator', function() {
  let rules = {
    date: ['date']
  };

  it('Should accept yyyy-mm-dd format', function() {
    let form = {
      date: '2019-10-30'
    };

    expect(endorse.run(form, rules).status).toBeTruthy();
  });

  it('Should\'t accept dd-mm-yyyy format', function() {
    let form = {
      date: '30-10-2019'
    };

    expect(endorse.run(form, rules).status).toBeFalsy();
  });

  it('Should\'t accept dd-mm-yy format', function() {
    let form = {
      date: '30-10-19'
    };

    expect(endorse.run(form, rules).status).toBeFalsy();
  });

  it('Should\'t accept month number greater than 12', function() {
    let form = {
      date: '2019-13-25'
    };

    expect(endorse.run(form, rules).status).toBeFalsy();
  });

  it('Should\'t accept day number greater than 31', function() {
    let form = {
      date: '2019-10-35'
    };

    expect(endorse.run(form, rules).status).toBeFalsy();
  });

  it('Should\'t accept day number greater than 30 in april, june, september or november', function() {
    let form = {
      date: '2019-11-31'
    };

    expect(endorse.run(form, rules).status).toBeFalsy();
  });

  it('Should\'t accept day number greater than 29 in february', function() {
    let form = {
      date: '2019-02-30'
    };

    expect(endorse.run(form, rules).status).toBeFalsy();
  });

  it('Should accept day number 29 in february in leap year', function() {
    let form = {
      date: '2000-02-29'
    };

    expect(endorse.run(form, rules).status).toBeTruthy();
  });

  it('Should\'t accept day number 29 in february except in leap year', function() {
    let form = {
      date: '2019-02-29'
    };

    expect(endorse.run(form, rules).status).toBeFalsy();
  });

});