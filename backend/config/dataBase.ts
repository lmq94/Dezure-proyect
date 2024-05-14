import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import { resolve } from 'path';

// Cargar variables de entorno desde .env
config({ path: resolve(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`) });

const configPath = resolve(process.cwd(), 'config', 'config.json');

const sequelize = new Sequelize({
  ...require(configPath)[process.env.NODE_ENV || 'development']
});

export default sequelize;