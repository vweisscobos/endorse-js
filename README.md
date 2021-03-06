# Endorse js

Endorse js is a module to easily validate forms.

## Installation

```
npm install endorse-js
```

## Usage

To validate an object you have to call the run function passing the object to validate and the set of rules as arguments.
The run function will return an object containing the status of the validation and the list of errors. 

```javascript
import endorse from 'endorse-js';

const form = {
    name: "Vinicius Weiss Cobos",
    age: "29"
};

const rules = {
    name: ['alpha', 'required'],
    age: ['numeric', 'positive'] 
};

endorse.run(form, rules);
```

To set custom rules, call the setRule function passing a name, a validator function and a message in case
of failing. The validator function need to return true if the validation succeed and false if it fails.

```javascript
import endorse from 'endorse-js';

endorse.setRule({
  rule: 'myname',
  validator: (value) => { return value === 'Vinicius Weiss Cobos'},
  message: 'Wrong name!'
});
```

## Available rules

Set of the available rules to pass in the rules array.

- `'alpha'`: Check if the value is a string containing just alphabetic values

- `'alphanumeric'`: Check if the value is a string containing just alphanumeric values

- `'required'`: Check if the value isn't null, undefined or an empty string

- `'date'`: Check if the value is a valid date

- `'numeric'`: Check if the value is a number

- `'positive'`: Check if the value is a positive number

- `'nonzero'`: Check if the value is a number different not equal to zero

- `'nonempty'`: Check if the given array has at least one element

- `'time'`: Check if the value is a valid time

