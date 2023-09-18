import { fastifyMultipart } from '@fastify/multipart';
import { FastifyInstance } from "fastify";
import path from 'node:path';
import { prisma } from '../lib/prisma';
import { uploadAIBucket } from '../lib/supabase';

export const uploadVideo = async (app: FastifyInstance) => {

    app.register(fastifyMultipart, {
        limits: {
            fieldSize: 25 * 1024 * 1024 // 25Mb
        }
    })

    app.post('/videos', async (req, res) => {
        const data = await req.file()

        if (!data)
            return res.status(400).send({
                error: 'No file uploaded'
            })

        const extension = path.extname(data.filename)

        if (extension !== '.mp3')
            return res.status(400).send({
                error: 'Only mp3 files are allowed'
            })


        const fileBaseName = path.basename(data.filename, extension)
        const fileUploadName = `${fileBaseName}-${Date.now()}${extension}`

        // https://stackoverflow.com/questions/75186246/uploading-a-file-on-supabase-error-requestinit-duplex-option-is-required-when
        const { error } = await uploadAIBucket.upload(fileUploadName, data.file, { duplex: 'half', contentType: 'audio/mpeg' })

        if (error) return res.status(400).send({ error })

        const video = await prisma.video.create({
            data: {
                name: data.filename,
                url: fileUploadName
            }
        })

        return res.status(201).send({ video })
    })
}