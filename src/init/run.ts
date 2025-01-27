import connectDB from '../database/connect';

export default async function bootCheck() {
  console.log('🔍 Checking the configuration values...');

  if (
    !process.env.PORT ||
    (process.env.PORT as any) < 1 ||
    (process.env.PORT as any) > 65535
  ) {
    console.error(
      '✋ The port value is not defined in the configuration file or is invalid! Please add it to the config.ts file.'
    );
    process.exit(1);
  }

  if (!process.env.MONGODB_URI || typeof process.env.MONGODB_URI !== 'string') {
    console.error(
      '✋ MONGO_URI is not properly defined in the environment variables! Please add it to the .env file.'
    );
    process.exit(1);
  }

  if (!process.env.JWT_KEY) {
    console.error(
      '✋ JWT_KEY is not defined in the environment variables! Please add it to the .env file.'
    );
    process.exit(1);
  }

  console.log(
    '✅ Verified config value validity! Continuing start-up process...'
  );

  connectDB();
}
