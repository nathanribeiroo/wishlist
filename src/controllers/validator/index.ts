export interface Validators { // interface with functions defaults
    isEmpty(value: string, field?:string): void
    isEmail(value: string): void
    isUuid(field:string, value: string): void
}

const check: Validators = {

    /**
     * is Empty
     * 
     * @param value string | field with value to be compared
     * @param field string | show field name if it is wrong
     */
    isEmpty(value: string, field:string = 'name'): void {

        if (typeof value === 'undefined' || value.trim().length === 0) { // check if it is empty 
            throw {
                status: 400,
                message: `${field} is required`
            }
        }

        return;  
    },

    /**
     * is Email
     * 
     * @param value string | field with value to be compared
     */
    isEmail(value: string): void {

        if (typeof value === 'undefined' || value.trim().length === 0) { // check if it is empty
            throw { // send error 
                status: 400,
                message: `email is required`
            }
        }
        
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) { // is email true
            return; 
        }

        throw {  // send error 
            status: 400,
            message: `invalid email`
        }         
    },

    /**
     * is UUID
     * 
     * @param field string | show field name if it is wrong
     * @param value string | field with value to be compared
     */
    isUuid(field:string, value: string): void {
        if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(value) 
        || typeof value === 'undefined') { // uuid valid
            return;
        } 

        throw { // uuid invalid
            status: 400,
            message: `${field} invalid.`
        }
    }
}

export default check;