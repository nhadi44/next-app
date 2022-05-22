// @ts-nocheck
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "@nurhidayat97",
    database: "myapp_test",
  },
});

export default knex;
