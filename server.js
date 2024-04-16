// import { createServer } from "node:http"

// const server = createServer((request, response) => {
//   response.write("Hello, World!")

//   return response.end("")
// })

// server.listen(3333)

import { fastify } from "fastify"
// import { DatabaseMemory } from "./database-memory.js"
import { DatabasePostgres } from "./database-postgres.js"

const server = fastify()

// const database = new DatabaseMemory()
const database = new DatabasePostgres()

// GET, POST, PUT, DELETE, PATCH

// Route Parameter

// http://localhost:3333/videos
server.post("/videos", async (request, reply) => {
  // Request Body
  const { title, description, duration } = request.body

  await database.create({
    title,
    description,
    duration,
  })

  return reply.status(201).send()
})

// http://localhost:3333/videos
server.get("/videos", async (request, reply) => {
  const { search } = request.query

  const videos = await database.list(search)

  return videos
})

// http://localhost:3333/videos/id
server.put("/videos/:id", async (request, reply) => {
  const { id } = request.params
  const { title, description, duration } = request.body

  await database.update(id, {
    title,
    description,
    duration,
  })

  return reply.status(204).send()
})

// http://localhost:3333/videos/id
server.delete("/videos/:id", async (request, reply) => {
  const { id } = request.params

  await database.delete(id)

  return reply.status(204).send()
})

server.listen({
  port: process.env.PORT ?? 3333,
})
