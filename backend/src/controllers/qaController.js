// qaController.js
class QAController {
    async askQuestion(req, res) {
      try {
        const { question } = req.body;
        if (!question) {
          return res.status(400).json({ error: 'Question is required' });
        }
  
        const answer = await dataService.askQuestion(question);
        res.json(answer);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
  
  module.exports = new QAController();