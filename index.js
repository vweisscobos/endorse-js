import * as messages from './messages';

export default () => {

  /* Receives an object with values and an object with rules. The rules object must contain fields with the same names
   * of the values object. Each field of the rules object must contain an array of validation rules.
   */
  const run = (obj, rules) => {
    const errors = {};
    let status = false;

    const testRules = (attr, rules) => {
      const value = obj[attr];

      rules.forEach(rule => {
        if (Validators[rule] === undefined) {
          throw new Error('Invalid ' + rule + ' validator');
        }

        let result = Validators[rule](value);

        if (result && errors[attr] === undefined) {
          errors[attr] = result;
          status = true;
        }
      });
    };

    for (let attr in rules) {
      if (obj[attr] === undefined) {
        throw new Error('Invalid ' + attr + ' attribute');
      }

      testRules(attr, rules[attr]);
    }

    return {
      status,
      errors
    };
  };

  return {
    run
  };
};



class Validators {
  /* Test if the received value contain just alphabetic characters
   */
  static alpha(value) {
    if (/^[a-záàâãéèêíïóôõöúçñ ]+$/i.test(value)) {
      return false;
    }

    return messages.ALPHA_ERROR;
  }

  /* Test if the received value contain just alphanumeric characters
   */
  static alphanumeric(value) {
    if (/^[a-záàâãéèêíïóôõöúçñ \d]+$/i.test(value)) {
      return false;
    }

    return messages.ALPHANUMERIC_ERROR;
  }

  /* Test if the received value isn't an empty string
   */
  static required(value) {
    if (String(value).trim() !== '') {
      return false;
    }

    return messages.REQUIRED_ERROR;
  }

  /* Test if the received value is a numeric value
   */
  static numeric(value) {
    if (/^\d+$/.test(value)) {
      return false;
    }

    return messages.NUMERIC_ERROR;
  }

  /* Test if the received value is a valid date
   */
  static date(value) {
    if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
      return false;
    }

    return messages.DATE_ERROR;
  }

  /* Test if the received value isn't equal to zero
   */
  static nonzero(value) {
    if (parseInt(value) !== 0) {
      return false;
    }

    return messages.NONZERO_ERROR;
  }

  /* Test if the received value is greater than zero
   */
  static positive(value) {
    if (parseInt(value) > 0) {
      return false;
    }

    return messages.POSITIVE_ERROR;
  }

  /* Test if the received array isn't empty
   */
  static nonempty(value) {
    if (!Array.isArray(value)) {
      throw new Error('Invalid data type. Just array accepted.');
    }

    if (value.length > 0) {
      return false;
    }

    return messages.NONEMPTY_ERROR;
  }

  /* Test if the received value is a valid time
   */
  static time(value) {
    if (/^([0-1]\d|[0-2][0-4]):([0-5]\d)$/.test(value)) {
      return false;
    }

    return messages.TIME_ERROR;
  }
}



