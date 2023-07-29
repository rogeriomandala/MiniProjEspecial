# Node-Express-MySQLs-CRUD API
Small solution to showcase the basics of NodeJs, ExpressJs and MySQL database operations.
This is a Rest Api solution using basic database create, read, update and delete operations (CRUD)

## Installation
Download and install MySql Database.
Download the latest NodeJs version

Install expressjs
```bash
$ npm install -g express
```
Install mysql
```bash
$ npm install mysql
```

##Database
Run the sql script in the application folder using the mysql command line to create the database.

```mysql
mysql -u root -p tmc < player.sql
```

##Configuration
Ensure that the server/db.js file postgres database connection is updated. Below find the standard configuration
```
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database : 'tmc'
})

```



