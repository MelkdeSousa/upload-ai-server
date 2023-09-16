import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
    OPENAI_KEY: z.string(),
    PORT: z.string().transform(value => Number(value)),
})


export const envs = envSchema.parse(process.env)