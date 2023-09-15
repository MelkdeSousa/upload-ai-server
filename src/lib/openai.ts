import { OpenAI } from 'openai'
import { envs } from '../config/envs'

export const openai = new OpenAI({
    apiKey: envs.OPENAI_KEY
})
