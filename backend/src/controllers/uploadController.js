// src/controllers/upload.controller.js
import { processExcelFile } from '../services/excel.service.js';
import { upsertEmployees } from '../services/mongodb.service.js';
import { generateEmbeddings } from '../services/qdrant.service.js';
import { updateSearchIndex } from '../services/elasticsearch.service.js';

export const uploadEmployeeData = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Process Excel file
    const employees = await processExcelFile(req.file.path);

    // Upsert to MongoDB
    const { inserted, updated, deleted } = await upsertEmployees(employees);

    // Generate embeddings and store in Qdrant
    await generateEmbeddings(employees);

    // Update Elasticsearch index
    await updateSearchIndex(employees);

    res.json({
      success: true,
      message: 'File processed successfully',
      stats: {
        inserted,
        updated,
        deleted,
        total: employees.length
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process file'
    });
  }
};