module.exports = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['src/**/*.entity.{js,ts}'],
  migrations: ['src/migrations/*.{js,ts}'],
  seeds: ['src/migrations/seeds/*.seed.{js,ts}'],
  factories: ['src/migrations/factories/*.factory.{js,ts}'],
  cli: {
    migrationsDir: 'src/migrations',
    entitiesDir: 'src/entities',
    seedersDir: 'src/migrations/seeds',
    factoriesDir: 'src/migrations/factories',
  },
  synchronize: false,
};
