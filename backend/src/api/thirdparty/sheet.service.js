//#region  get spreadsheet data

const { google } = require('googleapis');
const { GoogleAuth } = require("./google.auth");

module.exports.SheetService = class {
    auth;
    spreadsheetSettings = {
        spreadsheetId: "1vz26VMZW1Bn04dNx0wJYQb2jKO0AXVuLqz6tCR2WWJs",
        employeeSheetId: "Employees",
        templateId: 139916305,
        accountantSheetName: "Settings",
        range: []
    }
    constructor() {

    }
    //#region  list majors
    async listMajors() {
        try {
            this.auth = await new GoogleAuth().authorize()
            const sheets = google.sheets({ version: 'v4', auth: this.auth });
            const res = await sheets.spreadsheets.values.get(this.spreadsheetSettings);
            return res
        } catch (error) {
            console.log({ error })
        }

    }
    //#endregion

}