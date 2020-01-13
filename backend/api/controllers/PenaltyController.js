/**
 * PenaltyController
 *
 * @description :: Server-side logic for managing penalties
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  addBulk: (req, res) => {
    const body = req.body;
    for (const item of body) {
      Penalty.create(item).exec((err, response) => {
        if (err) {
          res.serverError(err);
          return;
        }
      });
      res.ok("Penalties successfully added");
    }
  },

  getByDate: (req, res) => {
    const params = req.allParams();

    Penalty.find().exec((err, response) => {
      if (err) {
        return res.serverError(err);
      }
      const data = response.filter(
        item =>
          item.date.getMonth() == params.month &&
          item.date.getFullYear() == params.year
      );
      return res.json(data);
    });
  }
};
