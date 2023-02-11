import express from "express";
import * as dotenv from 'dotenv'
import fetch from "node-fetch";


dotenv.config()

const router = express.Router()

const engineId = 'stable-diffusion-512-v2-0';
const apiHost = process.env.API_HOST ?? 'https://api.stability.ai'
const STABILITY_API_KEY = process.env.STABILITY_API_KEY

if (!STABILITY_API_KEY) throw new Error("Missing Stability API key.");


router.route('/').get((req, res) => {
    res.send('Hello from DALL-E!')
})

router.route('/').post(async (req, res) => {
    try {
        const prompt = req.body.prompt
        const negativePrompt = req.body.negativePrompt
        const steps = Number(req.body.steps)
        const cfgScale = Number(req.body.cfgScale)
        const response = await fetch(
            `${apiHost}/v1beta/generation/${engineId}/text-to-image`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${STABILITY_API_KEY}`,
                },
                body: JSON.stringify({
                    text_prompts: [
                        {
                            text: prompt,
                            weight: 1.3
                        },
                        {
                            text: negativePrompt,
                            weight: -1
                        }
                    ],
                    cfg_scale: cfgScale,
                    // seed: 179023616,
                    clip_guidance_preset: 'FAST_BLUE',
                    height: 512,
                    width: 512,
                    samples: 1,
                    steps: steps || 10,
                    sampler: 'K_EULER_ANCESTRAL'
                })
            }
        );


        const responseJSON = await response.json()
        const image = responseJSON.artifacts[0].base64
        res.status(200).json({photo: image})

    } catch (error) {
        console.log(error)
        res.status(500).send(error?.response.data.error.message)

    }


})

export default router