
module.exports = {

  getIds (response, params, isBonus) {
    let ids = [];
    for (let i = 0; i < response.length; i++) {
      const bonusCheck = isBonus ? !response[i].isRepeating : true;
      if (response[i].date.getMonth() == params.month && response[i].date.getFullYear() == params.year && bonusCheck) {
        ids.push(response[i].id);
      }
    }
    return ids;
  }
}