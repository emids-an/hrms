const { Client } = require('@elastic/elasticsearch');

class ElasticService {
  constructor() {
    this.client = new Client({
      node: process.env.ELASTICSEARCH_NODE
    });
    this.index = 'employees';
  }

  async initialize() {
    const indexExists = await this.client.indices.exists({
      index: this.index
    });

    if (!indexExists) {
      await this.client.indices.create({
        index: this.index,
        body: {
          mappings: {
            properties: {
              EmployeeName: { type: 'text' },
              Project: { type: 'text' },
              ResourceType: { type: 'keyword' },
              ReportingManager: { type: 'text' },
              // Add other fields as needed
              EmployeeId: { type: 'keyword' }
            }
          }
        }
      });
    }
  }

  async upsertEmployees(employees) {
    await this.initialize();

    const operations = employees.flatMap(doc => [
      { index: { _index: this.index, _id: doc.EmployeeId } },
      doc
    ]);

    await this.client.bulk({ refresh: true, operations });
  }

  async searchEmployees(params) {
    const { field, query } = params;
    
    const searchQuery = {
      index: this.index,
      body: {
        query: {
          bool: {
            must: [
              {
                match: {
                  [field]: query
                }
              }
            ]
          }
        }
      }
    };

    const result = await this.client.search(searchQuery);
    return result.hits.hits.map(hit => hit._source);
  }
}

module.exports = new ElasticService();