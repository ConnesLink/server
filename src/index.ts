import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';

import bootCheck from './init/run';

const app = new Elysia();
app.use(cors());

app.get('/', () => {
  return {
    status: true,
    message: 'Seems like the API works!'
  };
});

const init = async () => {
  await bootCheck();
  app.listen(process.env.PORT as any, () => {
    console.log(
      `👋 Server is running at ${app.server?.hostname}:${app.server?.port}`
    );
  });
};

init();
