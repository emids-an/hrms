const xlsx = require('xlsx');

class ExcelService {
  constructor() {}

  readExcelFile(filePath) {
    try {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet);
      
      // Validate and transform data
      return data.map(row => ({
        EmployeeId: row.EmployeeId,
        EmployeeName: row.EmployeeName,
        Project: row.Project,
        Skill: row.Skill,
        Role: row.Role,
        Allocation: row.Allocation,
        Remarks: row.Remarks,
        ResourceType: row.ResourceType,
        ProjectType: row.ProjectType,
        Function: row.Function,
        AssignDate: row.AssignDate,
        ReleaseDate: row.ReleaseDate,
        ReportingManager: row.ReportingManager
      }));
    } catch (error) {
      throw new Error(`Error reading Excel file: ${error.message}`);
    }
  }
}

module.exports = new ExcelService();