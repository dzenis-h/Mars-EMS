const mainSpreadsheetColumnIds = {
  loan: 13,
  remainingPayment: 14
};

module.exports = {
  mapSalaryAndLoansDataFromSpreadsheet(jmbg, name, data) {
    let elem = {};

    Object.entries(mainSpreadsheetColumnIds).map(item => {
      // => installment column
      if (item[1] === 14) {
        // Getting the totals
        const loansSum = loansTotal(data[13]);
        const installmentsSum = sumInstallment(data[13], data[14]);
        // Getting full loans & installments data
        const loansData = allLoans(data[13]);
        const installmentsData = allInstallments(data[14]);
        // Getting the active lones
        const activeOne = stillActive(loansData);
        const activeLoan = lastLoan(activeOne);
        // Getting the current installment
        let currentInstallment = lastInstallment(installmentsData);
        // Getting notes data (all notes and only the relevant one)
        let allNotes = allLoanNotes(data[13], data[12]);
        const noteData = getTheNote(data[13], data[12]);
        let len = loansData.length;
        let onlyRelevantNotes = allNotes.slice(0, len);
        // Calculating the loans - installments data
        const differenceLoansSumAndInstallmentsSum = loansSum - installmentsSum;
        // If there is an outstanding loan then accumulate all of the relevant data,
        // if not, just set the remaining Payment = 0 for all other active employees
        if (differenceLoansSumAndInstallmentsSum > 0) {
          elem[item[0]] = differenceLoansSumAndInstallmentsSum;
          elem.loansSum = loansSum;
          elem.installmentsSum = installmentsSum;
          elem.loans = loansData;
          elem.installments = installmentsData;
          elem.lastLoan = activeLoan;
          elem.lastInstallment = currentInstallment;
          elem.notes = noteData;
          elem.allNotes = onlyRelevantNotes;

          elem.jmbg = jmbg;
          elem.name = name;
          elem.lastRowNumber = data[0].length;
        } else {
          elem[item[0]] = 0;
        }
      }
    });
    return elem;
  }
};

(sumInstallment = (loanColumn, installmentColumn) => {
  const loanIndexes = getLoanEntryIndexes(loanColumn);
  let installmentSum = 0;
  for (let i = 2; i < installmentColumn.length; i++) {
    // i=2, skip header and title, data[13]-loans column
    if (
      installmentColumn[i] !== "" &&
      !loanIndexes.includes(i) && // skip row where loan is entered
      installmentColumn[i] !== "0"
    ) {
      installmentSum += parseInt(installmentColumn[i]);
    }
  }
  return installmentSum;
}),
  (allLoans = data => {
    let loansFull = [];
    for (let i = 2; i < data.length; i++) {
      if (data[i] !== "" && data[i] !== "0" && data[i] !== 0) {
        loansFull.push(data[i]);
      }
    }
    return loansFull;
  }),
  (allInstallments = data => {
    let installmentsFull = [];
    for (let i = 2; i < data.length; i++) {
      if (data[i] !== "" && data[i] !== "0" && data[i] !== 0) {
        installmentsFull.push(data[i]);
      }
    }
    return installmentsFull;
  }),
  (stillActive = obj => {
    let activeArr = [];
    obj.map(y => {
      if (y !== "0" && y !== 0 && y !== "") {
        activeArr.push(y);
      }
    });
    return activeArr;
  }),
  (lastLoan = last => {
    return last.slice().pop();
  }),
  (lastInstallment = last => {
    return last.slice().pop();
  }),
  (loansTotal = data => {
    let loansSum = 0;
    for (let i = 2; i < data.length; i++) {
      if (data[i] !== "") {
        loansSum += parseInt(data[i]);
      }
    }
    return loansSum;
  }),
  (installmentTotal = data => {
    let installmentSum = 0;
    for (let i = 2; i < data.length; i++) {
      if (data[i] !== "") {
        installmentSum += parseInt(data[i]);
      }
    }
    return installmentSum;
  }),
  (getTheNote = (kredit, note) => {
    let notesArr = [];
    for (let x = 2; x < kredit.length; x++) {
      for (let y = 2; y < note.length; y++) {
        if (kredit[x] != "" && note[y] != "") {
          notesArr.push(note[x]);
        }
      }
    }
    return onlyRelevantNotes(notesArr);
  }),
  (onlyRelevantNotes = arr => {
    let loanNotes = [];
    let unique, last;
    arr.map(x => {
      if (x != "" && x != undefined) {
        loanNotes.push(x);
      }
      unique = [...new Set(loanNotes)];
      last = unique.pop();
    });
    return last;
  }),
  (allLoanNotes = (loan, note) => {
    let allRelnotes = [];
    for (let x = 2; x < note.length; x++) {
      for (let y = 2; y < loan.length; y++) {
        if (loan[y] != "" && note[x] != "") {
          allRelnotes.push(note[y]);
        }
      }
    }
    return allRelnotes;
  });
