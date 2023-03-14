import http from "http";
const server = http.createServer();

const { PORT } = process.env;
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`server running on port${port}`);
});
