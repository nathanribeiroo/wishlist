import { join } from "path";
import { config } from "dotenv";

// starts the production or test (with jest) environment
config({ path: join(__dirname, "..", "..", '.env') });