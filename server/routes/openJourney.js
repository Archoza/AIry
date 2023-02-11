import express from "express";
import * as dotenv from 'dotenv'
import Replicate from "replicate-js";

dotenv.config()

const router = express.Router()

const replicate = new Replicate({
    token: process.env.REPLICATE_API_TOKEN
})

router.route('/').post(async (req, res) => {
    try {
        const prompt = req.body.prompt
        const model = await replicate.models.get('prompthero/openjourney', '9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb');
        const modelPrediction = await model.predict({
            prompt: `mdjrny-v4 ${prompt}`,
            width: 512,
            height: 512,
            num_outputs: 1,
            num_inference_steps: 50,
            guidance_scale: 7,
            response_format: 'b64_json'
        });

        const image = modelPrediction
        console.log(image)

        res.status(200).json({photo: image})

    } catch (error) {
        console.log(error)
        res.status(500).send(error?.response.data.error.message)

    }


})

export default router