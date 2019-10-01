/**
 * Bonus.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    amount: {
      type: 'integer',
      required: true
    },

    date: {
      type: 'date',
      required: true
    },

    description: {
      type: 'text'
    },

    isRepeating: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    },

    employeeJMBG: {
      type: 'string',
      required: true
    }
  }
};

