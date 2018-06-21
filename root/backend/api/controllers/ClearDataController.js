let clearDataService = require("../services/ClearDataService");

module.exports = {

  remove: (req, res) => {
    const params = req.allParams();

    SalaryRaise.find().exec((err, response) => {
        if (err) {
          return res.serverError(err);
        }
        const salaryRaiseIds = clearDataService.getIds(response, params, false);
        SalaryRaise.destroy([salaryRaiseIds]).exec((err, response) => {
          if (err) {
            return res.serverError(err);
          }
        })
      }
    );

    Penalty.find().exec((err, response) => {
        if (err) {
          return res.serverError(err);
        }
        const penaltyIds = clearDataService.getIds(response, params, false);
        Penalty.destroy([penaltyIds]).exec((err, response) => {
          if (err) {
            return res.serverError(err);
          }
        }) 
      }
    );

    Bonus.find().exec((err, response) => {
        if (err) {
          return res.serverError(err);
        }
        const bonusIds = clearDataService.getIds(response, params, true);
        Bonus.destroy([bonusIds]).exec((err, response) => {
          if (err) {
            return res.serverError(err);
          }
        })
      }
    );

    Loan.find().exec((err, response) => {
        if (err) {
          return res.serverError(err);
        }
        const loanIds = clearDataService.getIds(response, params, false);
        Loan.destroy([loanIds]).exec((err, response) => {
          if (err) {
            return res.serverError(err);
          }
        })
      }
    );

    LoanNote.find().exec((err, response) => {
        if (err) {
          return res.serverError(err);
        }
        const loanNoteIds = clearDataService.getIds(response, params, false);
        LoanNote.destroy([loanNoteIds]).exec((err, response) => {
          if (err) {
            return res.serverError(err);
          }
        })
      }
    );

    LoanPayment.find().exec((err, response) => {
        if (err) {
          return res.serverError(err);
        }
        const loanPaymentIds = clearDataService.getIds(response, params, false);
        LoanPayment.destroy([loanPaymentIds]).exec((err, response) => {
          if (err) {
            return res.serverError(err);
          }
        })
      }
    );

  // Clearning the rest data [selectedDate]
    Api.find().exec((err, response) => {
      if (err) {
        return res.serverError(err);
      }
      Api.destroy().exec((err, response) => {
        if (err) {
          return res.serverError(err);
        }
      })
    }
  );

    return res.json('Successfully deleted used data from previous month');
  }

}