import { fastifyMultipart } from '@fastify/multipart';
import { FastifyInstance } from "fastify";
import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';
import { prisma } from '../lib/prisma';

const pipe = promisify(pipeline)

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
        const uploadDestination = path.resolve(path.join(__dirname, '..', '..','uploads', fileUploadName))

        await pipe(data.file, fs.createWriteStream(uploadDestination))

        const video = await prisma.video.create({
            data: {
                name: data.filename,
                url: uploadDestination
            }
        })

        return res.status(201).send({video})
    })
}