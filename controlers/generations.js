const connectAI = require("../config/openai");

const generations = async (req, res) => {
    const { prompt, size, key } = req.body;
    // const { prompt, size } = req.body;
    // const key = process.env.OPENAI_API_KEY

    const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

    try {
        const openai = connectAI(key)
        const response = await openai.createImage({ prompt, n: 1, size: imageSize });

        const imageUrl = response.data.data[0].url;

        res.status(200).json({ success: true, data: imageUrl });
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }

        res.status(400).json({
            success: false,
            error: 'The image could not be generated',
            message: error.message,
            response: {
                status: error.response.status,
                data: error.response.data
            }
        });
    }
};

module.exports = { generations };