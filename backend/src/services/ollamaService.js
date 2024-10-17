const axios = require('axios');

class OllamaService {
  constructor() {
    this.baseUrl = process.env.OLLAMA_HOST;
  }

  async generateResponse(prompt, context) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/generate`, {
        model: 'llama2',
        prompt: prompt,
        context: context,
        stream: false
      });

      return response.data.response;
    } catch (error) {
      console.error('Error calling Ollama:', error);
      throw new Error('Failed to generate response from LLM');
    }
  }

  async answerQuestion(question, relevantDocs) {
    const context = relevantDocs.map(doc => doc.payload.text).join('\n');
    
    const prompt = `
    Based on the following employee information:
    ${context}
    
    Please answer this question: ${question}
    
    Please only use the information provided above to answer the question.
    If you cannot answer the question based on the provided information, please say so.`;

    return await this.generateResponse(prompt, context);
  }
}

module.exports = new OllamaService();