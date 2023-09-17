import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import { envs } from './config/envs'
import { createTranscription } from './routes/create-transcription'
import { generateAiCompletion } from './routes/generate-ai-completion'
import { getAllPrompts } from './routes/get-all-prompts'
import { uploadVideo } from './routes/upload-video'

const app = fastify({
    logger: true,
})

app.register(fastifyCors, {
    origin: '*'
})
app.register(getAllPrompts)
app.register(uploadVideo)
app.register(createTranscription)
app.register(generateAiCompletion)

app.listen({
    host: envs.HOST,
    port: envs.PORT
}, (_, address) => console.log(`Server is running on ${address}`))
