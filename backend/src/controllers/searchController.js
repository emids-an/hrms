// searchController.js
class SearchController {
    async search(req, res) {
      try {
        const { field, query } = req.query;
        if (!field || !query) {
          return res.status(400).json({ error: 'Field and query parameters are required' });
        }
  
        const results = await dataService.searchEmployees({ field, query });
        res.json(results);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
  
  module.exports = new SearchController();