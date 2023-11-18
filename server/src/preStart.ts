import dotenv from 'dotenv';
import path from 'path';

/**
 * Load environment variables from .env file. This needs to be done at the very beginning of the application.
 */
const dotenvConfig = dotenv.config({
    path: path.join(__dirname, '..', 'env', '.env'),
});

if (dotenvConfig.error != null) {
    throw dotenvConfig.error;
}
