const excelService = require('./excelService');
const mongoService = require('./mongoService');
const qdrantService = require('./qdrantService');
const elasticService = require('./elasticService');
const ollamaService = require('./ollamaService');

class DataService {
  async loadData(filePath) {
    try {
      // Read Excel file
      const employees = excelService.readExcelFile(filePath);

      // Load data into MongoDB
      await mongoService.upsertEmployees(employees);

      // Load data into Qdrant
      await qdrantService.upsertEmployees(employees);

      // Load data into Elasticsearch
      await elasticService.upsertEmployees(employees);

      return { success: true, message: 'Data loaded successfully' };
    } catch (error) {
      throw new Error(`Failed to load data: ${error.message}`);
    }
  }

  async searchEmployees(params) {
    return await elasticService.searchEmployees(params);
  }

  async askQuestion(question) {
    // Get relevant documents from Qdrant
    const relevantDocs = await qdrantService.searchSimilar(question, 3);
    
    // Generate answer using Ollama
    const answer = await ollamaService.answerQuestion(question, relevantDocs);
    
    return {
      answer,
      sources: relevantDocs.map(doc => ({
        employeeName: doc.payload.EmployeeName,
        project: doc.payload.Project
      }))
    };
  }
}

module.exports = new DataService();