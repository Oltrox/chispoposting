import Sequelize from 'sequelize';

export const sequelize =  new Sequelize('postgres://postgres:chispoposting@161.97.90.191:5432/chispoposting');

/*export const sequelize = new Sequelize(
    'postgres',
    'postgres',
    'chisposting',
    {
        host: '161.97.90.191:5432',
        dialect: 'postgres',
        pool:{
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging: false
    }
);
*/