const { MongoClient } = require('mongodb');

class MongoService {
  constructor() {
    this.client = new MongoClient(process.env.MONGODB_URI);
    this.dbName = 'employeeDB';
    this.collectionName = 'employees';
  }

  async connect() {
    await this.client.connect();
    this.db = this.client.db(this.dbName);
    this.collection = this.db.collection(this.collectionName);
  }

  async upsertEmployees(employees) {
    if (!this.collection) await this.connect();

    const operations = employees.map(employee => ({
      updateOne: {
        filter: { EmployeeId: employee.EmployeeId },
        update: {
          $set: {
            ...employee,
            deleted: false,
            lastUpdated: new Date()
          }
        },
        upsert: true
      }
    }));

    const result = await this.collection.bulkWrite(operations);
    return result;
  }

  async markDeletedEmployees(existingIds, updatedIds) {
    if (!this.collection) await this.connect();

    const deleteIds = existingIds.filter(id => !updatedIds.includes(id));
    if (deleteIds.length > 0) {
      await this.collection.updateMany(
        { EmployeeId: { $in: deleteIds } },
        { $set: { deleted: true, lastUpdated: new Date() } }
      );
    }
  }

  async close() {
    await this.client.close();
  }
}

module.exports = new MongoService();