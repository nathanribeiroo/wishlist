export interface Validators {


    isEmpty(value: string, field?:string): void
    isEmail(value: string): void
    isUuid(field:string, value: string): void

}

const check: Validators = {

    isEmpty(value: string, field:string = 'name'): void {

        if (typeof value === 'undefined' || value.trim().length === 0) {
            throw {
                status: 400,
                message: `${field} is required`
            }
        }

        return;  
    },

    isEmail(value: string): void {

        if (typeof value === 'undefined' || value.trim().length === 0) {
            throw {
                status: 400,
                message: `email is required`
            }
        }
        
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            return;
        }

        throw {
            status: 400,
            message: `invalid email`
        }         
    },

    isUuid(field:string, value: string): void {
        if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(value) 
        || typeof value === 'undefined') {
            return;
        } 

        throw {
            status: 400,
            message: `${field} invalid.`
        }
    }
}

export default check;