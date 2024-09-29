import { Hono } from "hono"
import { serveStatic } from "@hono/node-server/serve-static"
import { serve } from "@hono/node-server"

const app = new Hono()

// Serve Static files
app.use("/static/*", serveStatic({ root: "./" }))
app.use('/favicon.ico', serveStatic({ path: './static/favicon/favicon.ico' }))

// Routes
import { mainRoute } from "./routes/mainRoute.js"

import { markdownRoute } from "./routes/markdownRoute.js"

import { projectsRoute } from "./routes/projectsRoute.js"

app.route("/", mainRoute)

app.route("/", markdownRoute)

app.route("/", projectsRoute)

// serve(app, ({ port }) => {
//     console.log(`Listening on http://localhost:${port}`)
// })

const port = process.env.PORT || 3000
console.log(`Server is running on port ${port}`)
 
serve({
  fetch: app.fetch,
  port,
})