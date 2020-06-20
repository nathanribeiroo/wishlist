export interface Validators {


    isEmpty(value: string): void
    isEmail(value: string): void

}

const check: Validators = {

    isEmpty(value: string): void {

        if (typeof value === 'undefined' || value.trim().length === 0) {
            throw {
                status: 400,
                message: `invalid name`
            }
        }

        return;  
    },

    isEmail(value: string): void {

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