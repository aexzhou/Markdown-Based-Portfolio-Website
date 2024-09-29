import { join } from "path"
import { Hono } from "hono"
import { Eta } from "eta"
import { marked } from "marked"
import { getPages, getPosts } from "../functions/markdownblog.js"

const app = new Hono()
const eta = new Eta({ views: join(process.cwd(), "views") })

export const markdownRoute = app.get("/:folder/:filename", async (c, next) => {
    try{
        // Merge the pages and the posts arrays into a single array named mdFiles
        const pages = await getPages()
        const posts = await getPosts()
        const mdFiles = pages.concat(posts)
    
        const currentFile = mdFiles.find(
            (file) => file.path === `views/${c.req.param("folder")}/${c.req.param("filename")}.md`
        )
    
        if (currentFile) {
            const fileData = currentFile[1].frontmatter
            const fileContent = marked.parse(currentFile[1].content)
            const fileDirectory = currentFile.dir
            const res = eta.render("layouts/base.html", {
                // Passing Route data
                mdRoute: true,
                // Passing Markdown file data
                data: fileData,
                content: fileContent,
                dirname: fileDirectory,
                // Passing needed settings for the template
                siteTitle: "Alex",
            })
            return c.html(res)
        } else {
            // Proceed to the 404 route if no file is found
            await next()
            console.error(`File not found: ${join("views", c.req.param("folder"), `${c.req.param("filename")}.md`)}`)
            return c.html("<h1>404 Not Found</h1>", 404)
        }
    } catch (error) {
        // Log the error for debugging in production
        console.error("Error while rendering markdown:", error)

        if (process.env.NODE_ENV === 'development') {
            return c.html(`<h1>Internal Server Error</h1><pre>${error.message}</pre>`, 500)
        } else {
            // In production, only send a generic error message
            return c.html("<h1>Internal Server Error</h1>", 500)
        }
    }
})

// export const markdownRoute = app.get("/:folder/:filename", async (c, next) => {
//     try {
//         // Fetch pages and posts asynchronously
//         const pages = await getPages()
//         const posts = await getPosts()

//         // Merge pages and posts into one array
//         const mdFiles = [...pages, ...posts]

//         // Find the matching markdown file based on the folder and filename parameters
//         const currentFile = mdFiles.find(
//             (file) => file.path === join("views", c.req.param("folder"), `${c.req.param("filename")}.md`)
//         )

//         // If the file is found, proceed to render
//         if (currentFile) {
//             const fileData = currentFile[1].frontmatter
//             const fileContent = marked.parse(currentFile[1].content)
//             const fileDirectory = currentFile.dir

//             // Render the template and ensure the rendering is awaited
//             const res = await eta.render("layouts/base.html", {
//                 // Route data
//                 mdRoute: true,
//                 // Markdown file data
//                 data: fileData,
//                 content: fileContent,
//                 dirname: fileDirectory,
//                 // Site settings
//                 siteTitle: "Alex",
//             })

//             // Return the rendered HTML content
//             return c.html(res)
//         } else {
//             // Proceed to the next middleware if no file is found (could be a 404 handler)
//             console.error(`File not found: ${join("views", c.req.param("folder"), `${c.req.param("filename")}.md`)}`)
//             return c.html("<h1>404 Not Found</h1>", 404)
//             //return next()
//         }
//     } catch (error) {
//         // Log the error for debugging in production
//         console.error("Error while rendering markdown:", error)

//         if (process.env.NODE_ENV === 'development') {
//             return c.html(`<h1>Internal Server Error</h1><pre>${error.message}</pre>`, 500)
//         } else {
//             // In production, only send a generic error message
//             return c.html("<h1>Internal Server Error</h1>", 500)
//         }
//     }
// })