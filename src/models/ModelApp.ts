import mysql from 'mysql2';
import options from '../configs/database';
import { Connection } from 'mysql2';

/**
 * class ModelApp
 * 
 * main class with the creation of
 * the connection and functions of general use
 * 
 */
export class ModelApp {

    protected conn: Connection; // connection

    constructor(public table: string) {
        this.conn = mysql.createConnection(options); // create connection
    }

    /**
     * Select all table
     * 
     */
    findAll() {
        return new Promise((resolve, reject) => {
            this.conn.query(`SELECT * FROM ${this.table}`, (err, result) => { // ececute select
                this.conn.end(); // close connection

                if (err) { return reject(err); } //  if there is an error

                return resolve(result); // return select
            });
        });
    }

    /**
     * Returned value of the query 
     * executed in the procedures.
     * 
     * @param result RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[]
     */
    formatReturn(result: any) {
        return result[0];
    }

    /**
     * Checks if the returned value of the 
     * query executed in the procedures had errors.
     * 
     * @param result RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[]
     */
    hasError(result: any) {

        if (Array.isArray(result)) {

            if (result[0].length === 0) { // reuturned empty
                return false;
            }

            if (typeof result[0][0].status !== 'undefined') { // has error
                return true;
            }
        }

        return false; // hasn't error
    }
}