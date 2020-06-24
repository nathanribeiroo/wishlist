import { join } from "path";
import { config } from "dotenv";

const env = process.env.NODE_ENV === "test" ? ".env.test"
    : process.env.NODE_ENV === "prod" ? ".env.prod" : ".env.dev" ;

// starts the production or test (with jest) environment
config({ path: join(__dirname, "..", "..", env) });