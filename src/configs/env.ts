import { join } from "path"

import { config } from "dotenv"

config({ path: join(__dirname, "..", "..", process.env.NODE_ENV === "test" ? ".env.test" : ".env") })