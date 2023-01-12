const { openai } = require('../config/openai')

const edits = async (req, res) => {
    console.log('edits')
    return
    const { prompt, size } = req.body;

    const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

    const img = fs.createReadStream("sunlit_lounge.png")
    const mask = fs.createReadStream("mask.png")
    const text = "A sunlit indoor lounge area with a pool containing a flamingo"

    try {
        const response = await openai.createImageEdit(
            img,
            mask,
            text,
            1,
            imageSize
        );

        image_url = response.data.data[0].url;

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

module.exports = { edits };