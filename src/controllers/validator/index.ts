export interface Validators {


    isEmpty(value: string): void
    isEmail(value: string): void

}

const check: Validators = {

    isEmpty(value: string): void {

        if (typeof value === 'undefined' || value.trim().length === 0) {
            throw {
                status: 400,
                message: `name is required`
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
    }
}

export default check;