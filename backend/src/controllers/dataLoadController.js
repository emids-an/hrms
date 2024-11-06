const dataService = require('../services/dataService');

class DataLoadController {
  async loadData(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const result = await dataService.loadData(req.file.path);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new DataLoadController();



