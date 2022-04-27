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
    console.log("HOLA");
    socket.on("hello", () => {
      console.log("Nos dice hola");
    });
    socket.on("client", () => {
      console.log("se identifica como cliente");
    });
    socket.on("server", () => {
      console.log("se identifica como servidor");
      socket.join("obs");
    });
    socket.on("emoji", (emoji) => {
      console.log("emoji: ", emoji);
      socket.to("obs").emit("emoji", emoji);
    });
  });
});

console.log("Estamos a la escucha");
server.listen(3000, "0.0.0.0");
