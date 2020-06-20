import { uuid } from 'uuidv4'
import { ModelApp } from './ModelApp';


interface dataCreate {
    name?: string,
    email?: string
}

export default class Customer extends ModelApp {

    constructor() {
        super('customers');
    }

    create({ name, email }: dataCreate) {
        return this.add([uuid(), name, email]);       
    }

    update(id: string, object: dataCreate) {

        const sql = `UPDATE ${this.table} SET 
        ${Object.entries(object).map(([key, value]) => `${key} = '${value}'`).join(', ')}
        WHERE id = '${id}'`;

        return this.updateById(id, sql);
    }


}