import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { openai } from "../lib/openai";
import { prisma } from "../lib/prisma";

export const generateAiCompletion = async (app:FastifyInstance) => {
    app.post('/ai/complete', async (req, res) => {

        const bodySchema = z.object({
            template: z.string(),
            videoId: z.string().cuid(),
            temperature: z.number().min(0).max(1).default(0.5),
        })

        const {temperature, template, videoId} = bodySchema.parse(req.body)

        const video = await prisma.video.findFirstOrThrow({
            where: {
                id: videoId
            },
        })

        if (!video.transcription)
            return res.status(400).send({
                error: 'Video has no transcription generated'
            })

        const promptMessage = template.replace('{transcription}', video.transcription)

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-16k',
            temperature,
            messages: [{
                 role: 'user',
                 content: promptMessage
            }],
        })

        return response
    })
}