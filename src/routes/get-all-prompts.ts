import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export const getAllPrompts = async (app: FastifyInstance) => {
    
app.get('/prompts', async () => {
    const prompts = prisma.prompt.findMany()

    return prompts
})
}