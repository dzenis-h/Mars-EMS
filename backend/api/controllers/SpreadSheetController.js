/**
 * BonusController
 *
 * @description :: Server-side logic for managing bonuses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

let google = require("googleapis");
let authentication = require("../../authentication");

module.exports = {
  init: (req, res) => {
    authentication.authenticate().then(auth => {
      res.send(auth);
    });
  },

  verifyCode: (req, res) => {
    authentication.verifyCode(req.body.code).then(response => {
      if (!response.credentials) {
        res.serverError();
      }
      res.ok(
        "App is authenticated to use Google Spreadsheet API",
        response.credentials
      );
    });
  }
};
