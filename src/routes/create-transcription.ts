import { FastifyInstance } from "fastify";
import { createReadStream } from "fs";
import { z } from 'zod';
import { openai } from '../lib/openai';
import { prisma } from "../lib/prisma";

export const createTranscription =async (app:FastifyInstance) => {
    app.post('/videos/:videoId/transcription', async (req, res) => {
        const paramsSchema = z.object({
            videoId: z.string().cuid()
        })

        const {videoId} = paramsSchema.parse(req.params)

        const bodySchema = z.object({
            prompt: z.string()
        })

        const {prompt} = bodySchema.parse(req.body)


        const video = await prisma.video.findFirstOrThrow({
            where: {
                id: videoId
            }
        })

        const videoPath = video.url

        const audioReadStream = createReadStream(videoPath)

         const response = await openai.audio.transcriptions.create({
            file: audioReadStream,
            model: "whisper-1",
            language: "pt",
            prompt,
            response_format: "json",
            temperature: 0.5
         })

         const transcription =response.text

         await prisma.video.update({
            data: {
                transcription
            },
            where: {
                id: videoId
            }
         })

         return { transcription }
    })
}