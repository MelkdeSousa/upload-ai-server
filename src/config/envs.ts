import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
    OPENAI_KEY: z.string(),
})


export const envs = envSchema.parse(process.env)