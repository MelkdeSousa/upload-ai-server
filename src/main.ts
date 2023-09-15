import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import { createTranscription } from './routes/create-transcription'
import { generateAiCompletion } from './routes/generate-ai-completion'
import { getAllPrompts } from './routes/get-all-prompts'
import { uploadVideo } from './routes/upload-video'

const app = fastify()

app.register(fastifyCors, {
    origin: '*'
})
app.register(getAllPrompts)
app.register(uploadVideo)
app.register(createTranscription)
app.register(generateAiCompletion)

app.listen({
    port: 3333
}, (_, address) => console.log(`Server is running on ${address}`))
