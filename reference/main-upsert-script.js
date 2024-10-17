// main.js

const { 
  connectToMongo, 
  getExistingEmployeeIds, 
  upsertEmployees, 
  markDeletedEmployees,
  dbName,
  collectionName
} = require('./mongoDbOps');
const { readExcelFile } = require('./excelOps');

const excelFilePath = 'employees.xlsx';

async function upsertEmployeeData() {
  let client;

  try {
    client = await connectToMongo();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Read Excel file
    const employeesData = readExcelFile(excelFilePath);

    // Get all existing employee IDs
    const existingEmployees = await getExistingEmployeeIds(collection);

    // Upsert data
    const updatedEmployees = await upsertEmployees(collection, employeesData);

    // Mark missing employees as deleted
    await markDeletedEmployees(collection, existingEmployees, updatedEmployees);

    console.log('Data upsert completed successfully');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('Disconnected from MongoDB');
    }
  }
}

upsertEmployeeData();
