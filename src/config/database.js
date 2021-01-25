module.exports = {
  "development": {
    "username": "digital_house",
    "password": "digital_house",
    "database": "digital_house",
    "host": "127.0.0.1",
    "dialect": "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    dialectOptions: {
      socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
    },
    define: {
        paranoid: true,
        "underscored": true
    },
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
