import fastify from "fastify";
import fastifyIO from "fastify-socket.io";
import fastifyStatic from "@fastify/static";
import { join } from 'path';

const server = fastify();
server.register(fastifyIO);
server.register(fastifyStatic, {
  root: join(__dirname, 'public'),
  prefix: '/',
});

server.ready().then(() => {
  server.io.on("connection", (socket) => {
    socket.on("server", () => {
      socket.join("obs");
    });
    socket.on("emoji", (emoji) => {
      socket.to("obs").emit("emoji", emoji);
    });
  });
});

console.log("Estamos a la escucha");
server.listen(3000, "0.0.0.0");
