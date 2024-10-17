// mongoDbOps.js

const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'employeeDB';
const collectionName = 'employees';

async function connectToMongo() {
  const client = new MongoClient(uri);
  await client.connect();
  return client;
}

async function getExistingEmployeeIds(collection) {
  return await collection.distinct('EmployeeId');
}

async function upsertEmployees(collection, employees) {
  const updatedEmployees = new Set();

  for (const employee of employees) {
    const filter = { EmployeeId: employee.EmployeeId };
    const update = {
      $set: {
        ...employee,
        deleted: false,
        lastUpdated: new Date()
      }
    };
    const options = { upsert: true };

    await collection.updateOne(filter, update, options);
    updatedEmployees.add(employee.EmployeeId);
  }

  return updatedEmployees;
}

async function markDeletedEmployees(collection, existingIds, updatedIds) {
  const employeesToDelete = existingIds.filter(id => !updatedIds.has(id));
  if (employeesToDelete.length > 0) {
    await collection.updateMany(
      { EmployeeId: { $in: employeesToDelete } },
      { $set: { deleted: true, lastUpdated: new Date() } }
    );
  }
}

module.exports = {
  connectToMongo,
  getExistingEmployeeIds,
  upsertEmployees,
  markDeletedEmployees,
  dbName,
  collectionName
};
