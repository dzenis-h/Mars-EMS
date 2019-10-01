module.exports = {
  giveMeEmps(data) {
    let result = [];
    for (let i = 1; i < data.length; i++) {
      let elem = {};
      data[0].map((item, index) => {
        // if (typeof data[i][index] != 'undefined') {
        elem[item.toLocaleLowerCase()] = data[i][index];
        // }
      });
      result.push(elem);
    }
    return result;
  },
  justNames(data) {
    let result = [];
    data.map(x => {
      result.push(x.name + " " + x.surname);
    });
    return result;
  }
};
