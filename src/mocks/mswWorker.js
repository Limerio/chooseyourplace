import { setupWorker } from "msw/node"
import { handlers } from "./handlers"

export const mswServer = setupWorker(...handlers)
