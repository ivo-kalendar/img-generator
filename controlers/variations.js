const { openai } = require('../config/openai')

const variations = async (req, res) => {
    console.log('variations')
    return
    const { prompt, size } = req.body;

    const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';
    const img = fs.createReadStream("corgi_and_cat_paw.png")

    try {
        const response = await openai.createImage(img, 1, imageSize);
        const imageUrl = response.data.data[0].url;

        res.status(200).json({
            success: true,
            data: imageUrl,
        });
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
        });
    }
};

module.exports = { variations };