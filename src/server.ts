import { build } from './app';

const PORT = process.env.RECIPES_PORT || 3000;

const server = build({
  logger: true,
});

server.listen(PORT, () => {
  console.log('API is running');
});
