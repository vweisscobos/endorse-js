module.exports = (function() {
  const messages = {
    TIME_ERROR: 'O valor deve ser no formato hh:mm',
    NONEMPTY_ERROR: 'A lista deve ter pelo menos um item',
    POSITIVE_ERROR: 'Valor deve ser maior que zero',
    NONZERO_ERROR: 'Valor não pode ser igual a zero',
    NUMERIC_ERROR: 'Deve ser um numero',
    DATE_ERROR: 'Deve ser uma data válida',
    REQUIRED_ERROR: 'Campo obrigatório',
    ALPHA_ERROR: 'Apenas caracteres alfabéticos',
    ALPHANUMERIC_ERROR: 'Apenas caracteres alfanuméricos'
  };

  const validators = {
    /* Test if the received value contain just alphabetic characters
     */
    alpha(value) {
      if (/^[a-záàâãéèêíïóôõöúçñ ]+$/i.test(value)) {
        return false;
      }

      return messages.ALPHA_ERROR;
    },

    /* Test if the received value contain just alphanumeric characters
     */
    alphanumeric(value) {
      if (/^[a-záàâãéèêíïóôõöúçñ \d]+$/i.test(value)) {
        return false;
      }

      return messages.ALPHANUMERIC_ERROR;
    },

    /* Test if the received value isn't an empty string, null or undefined
     */
    required(value) {
      if ((value && String(value).trim() !== '') || Number.isInteger(value)) {
        return false;
      }

      return messages.REQUIRED_ERROR;
    },

    /* Test if the received value is a numeric value
     */
    numeric(value) {
      if (/^\d+$/.test(value)) {
        return false;
      }

      return messages.NUMERIC_ERROR;
    },

    // TODO add validation rules
    /* Test if the received value is a valid date
     */
    date(value) {
      if (!/^\d{4}-\d{2}-\d{2}/.test(value)) return messages.DATE_ERROR;

      const  date = value.split('-');
      const day = parseInt(date[2]);
      const month = parseInt(date[1]);
      const year = parseInt(date[0]);

      if (day > 31) return messages.DATE_ERROR;
      if (month > 12) return messages.DATE_ERROR;
      if ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) return messages.DATE_ERROR;
      if ((month === 2) && day > 29) return messages.DATE_ERROR;
      if (!((year % 4 === 0 && year % 100 !== 0) || (year % 4 === 0 && year % 400 === 0)) && month === 2 && day > 28) return messages.DATE_ERROR;

      return false;
    },

    /* Test if the received value isn't equal to zero
     */
    nonzero(value) {
      if (parseInt(value) !== 0) {
        return false;
      }

      return messages.NONZERO_ERROR;
    },

    /* Test if the received value is greater than zero
     */
    positive(value) {
      if (parseInt(value) > 0) {
        return false;
      }

      return messages.POSITIVE_ERROR;
    },

    /* Test if the received array isn't empty
     */
    nonempty(value) {
      if (!Array.isArray(value)) {
        throw new Error('Invalid data type. Just array accepted.');
      }

      if (value.length > 0) {
        return false;
      }

      return messages.NONEMPTY_ERROR;
    },

    /* Test if the received value is a valid time
     */
    time(value) {
      if (/^([0-1]\d|[0-2][0-4]):([0-5]\d)$/.test(value)) {
        return false;
      }

      return messages.TIME_ERROR;
    }
  };


  /* Receives an object with values and an object with rules. The rules object must contain fields with the same names
   * of the values object. Each field of the rules object must contain an array of validation rules.
   */
  const run = (obj, rules) => {
    const errors = {};
    const objEntries = Object.keys(obj).sort();
    const rulesEntries = Object.keys(rules).sort();
    let status = true;

    const testRules = (attr, rules) => {
      const value = obj[attr];

      rules.forEach(rule => {
        if (validators[rule] === undefined) {
          throw new Error('Invalid ' + rule + ' validator');
        }

        let result = validators[rule](value);

        if (result && errors[attr] === undefined) {
          errors[attr] = result;
          status = false;
        }
      });
    };

    rulesEntries.forEach((rule, index) => {
      if (rule !== objEntries[index]) {
          throw new Error('Invalid ' + rule + ' attribute');
      }

      testRules(rule, rules[rule]);
    });

    return {
      status,
      errors
    };
  };

  const setRule  = ({rule, validator, message}) => {
    if (typeof rule !== 'string') throw new Error('Invalid argument type: rule have to be a string');
    if (typeof validator !== 'function') throw new Error('Invalid argument type: validator have to be a function');
    if (typeof message !== 'string') throw new Error('Invalid argument type: message have to be a string');

    messages[rule.toUpperCase() + '_ERROR'] = message;
    validators[rule] = (value) => {
      if (validator(value)) {
        return false;
      }

      return messages[rule.toUpperCase() + '_ERROR'];
    };
  };

  return {
    run,
    setRule
  };
})();





