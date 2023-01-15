const { Configuration, OpenAIApi } = require('openai')

const connectAI = (apiKey) => {
    const configuration = new Configuration({ apiKey });
    const openai = new OpenAIApi(configuration);
    return openai
}

module.exports = connectAI