import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
    OPENAI_KEY: z.string(),
    PORT: z.string().transform(value => Number(value)),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    DATABASE_URL: z.string(),
    HOST: z.string().optional()
})


export const envs = envSchema.parse({...process.env, HOST: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'})