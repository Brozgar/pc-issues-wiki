const Joi = require('joi');

// define validation for all the env vars
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow(['development', 'production', 'test', 'provision'])
        .default('development'),
    SERVER_PORT: Joi.number()
        .default(4040),
    SERVER: Joi.string()
        .default('development'),
    MONGO_HOST: Joi.string()
        .description('Mongo DB host url').default('mongodb://localhost:27017/driverpack'),
    MONGO_PORT: Joi.number()
        .default(27017),
}).unknown()
    .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: process.env.PORT || envVars.SERVER_PORT,
    server: envVars.SERVER,
    mongo: {
        host: envVars.MONGO_HOST,
        port: envVars.MONGO_PORT,
    },
};

module.exports = config;
