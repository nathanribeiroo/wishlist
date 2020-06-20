import mysql from 'mysql2';
import { isUuid } from 'uuidv4'
import options from '../configs/database';

export class ModelApp {

    protected conn = mysql.createConnection(options);

    constructor(public table: string) {

    }

    findAll() {
        return new Promise((resolve, reject) => {
            this.conn.connect(err => {
                if (err) {
                    return reject(err);
                }

                this.conn.query(`SELECT * FROM ${this.table}`, (err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    this.conn.end();
                    return resolve(result);
                });
            });
        });
    }

    findById(id: string) {
        return new Promise((resolve, reject) => {
            this.conn.connect(err => {
                if (err) {
                    return reject(err);
                }

                this.conn.query(`SELECT * FROM ${this.table} WHERE id = '${id}'`, (err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    this.conn.end();
                    return resolve(result);
                });
            });
        });
    }

    add(fields: Array<any>) {
        return new Promise((resolve, reject) => {
            this.conn.connect(err => {
                if (err) {
                    return reject(err);
                }

                const sql: string = `INSERT INTO ${this.table} (id, name, email) VALUES (?,?,?)`;

                this.conn.query(sql, fields, (err, result) => {

                    if (err) {
                        return reject(err);
                    }

                    this.conn.query(`SELECT * FROM ${this.table} WHERE id = '${fields[0]}'`, (err, result) => {

                        if (err) {
                            return reject(err);
                        }

                        this.conn.end();
                        return resolve(result);
                    })
                });
            });
        });
    }

    updateById(id: string, sql: string) {
        return new Promise((resolve, reject) => {
            this.conn.connect(err => {
                if (err) {
                    return reject(err);
                }


                this.conn.query(sql, (err, result) => {

                    if (err) {
                        return reject(err);
                    }

                    console.log(result);


                    this.conn.query(`SELECT * FROM ${this.table} WHERE id = '${id}'`, (err, result) => {

                        if (err) {
                            return reject(err);
                        }

                        this.conn.end();
                        return resolve(result);
                    })
                });
            });
        });

    }

    delete(id: string) {
        return new Promise((resolve, reject) => {
            this.conn.connect(err => {
                if (err) {
                    return reject(err);
                }

                this.conn.query(`DELETE FROM ${this.table} WHERE id = '${id}'`, (err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    this.conn.end();
                    return resolve(result);
                });
            });
        });
    }
}