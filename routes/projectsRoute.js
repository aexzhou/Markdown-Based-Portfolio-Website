import { join } from "path"
import { Hono } from "hono"
import { Eta } from "eta"
import { getPosts } from "../functions/markdownblog.js"

const app = new Hono()
const eta = new Eta({ views: join(process.cwd(), "views") })

export const projectsRoute = app.get("/projects", async (c, next) => {
    // Route data
    const data = {
        title: "Projects",
        description: "Projects Hub",
    }

    const res = eta.render("layouts/base.html", {
        // Passing Route data
        projectsRoute: true,
        // Passing document data
        data: data,
        posts: await getPosts(),
        // Passing needed settings for the template
        siteTitle: "Alex",
    })
    return c.html(res)
})