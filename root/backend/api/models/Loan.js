/**
 * Loan.js
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

    installment: {
      type: 'integer',
      required: true
    },

    date: {
      type: 'date',
      required: true
    },

    description: {
      type: 'text',
      defaultsTo: 'N/A'
    },

    unit: {
      type: 'string',
      enum: ['BAM', '$'],
      defaultsTo: 'BAM'
    },

    employeeJMBG: {
      type: 'string',
      required: true
    }
  }
};

