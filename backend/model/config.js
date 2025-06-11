import { Sequelize } from "sequelize";

export const db_config = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_SCHEMA,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases:0,
        pool:{
            max:5,
            min:0,
            acquire:30000,
            idle:10000,
        },
        timezone:'+05:30',
        logging:false,
    }
);