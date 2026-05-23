module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 3306,
      database: 'store',
      user: 'root',
      password: 'Aryan6209@',
      ssl: false,
    },
  },
});