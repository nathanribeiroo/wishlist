import mysql from 'mysql2';
import options from '../configs/database';
import { Pool } from 'mysql2';

export class ModelApp {

    protected conn: Pool;

    constructor(public table: string) {
        this.conn = mysql.createPool(options);
    }

    findAll() {
        return new Promise((resolve, reject) => {
            this.conn.query(`SELECT * FROM ${this.table}`, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    }

    formatReturn(result: any) {
        return result[0];
    }

    hasError(result: any) {

        if (result[0].length === 0) {
            return false;
        }

        if (typeof result[0][0].status !== 'undefined') {
            return true;
        }

        return false;
    }
}