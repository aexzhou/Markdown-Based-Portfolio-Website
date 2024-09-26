import { join } from "path"
import { Hono } from "hono"
import { Eta } from "eta"
import { getPosts } from "../functions/markdownblog.js"
import { getSpotlightPosts } from "../functions/markdownblog.js"

const app = new Hono()
const eta = new Eta({ views: join(process.cwd(), "views") })

export const mainRoute = app.get("/", async (c) => {
    // Main Route data
    const data = {
        title: "Alex",
        description: "List of the most recent posts",
    }

    const res = eta.render("layouts/base.html", {
        // Passing Route data
        mainRoute: true,
        // Passing document data
        data: data,
        posts: await getSpotlightPosts(),
        // Passing needed settings for the template
        siteTitle: "Home",
    })
    return c.html(res)
})