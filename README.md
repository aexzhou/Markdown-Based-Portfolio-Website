# My Markdown-based Portfolio Website

This is a personal portfolio website that automatically renders markdown files into html, making it easy to post blogs while having the formatting freedom of markdown files.

[Link to my Website: zhouengineering.com](https://www.zhouengineering.com)

I built a portion of this website following [this guide](https://lebcit.github.io/posts/create-a-simple-markdown-based-blog-in-nodejs/). If you're looking to build something similar, I recommend a visit - it's well written, and easy to follow! For styling, I used [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/).

## How to use:

### Specifying Markdown File Settings:
To specify information and configure settings such as **Title**, **Date**, **Tags**...etc., put the following markdown code at the top of each markdown file (including the dashes):

```
---
title: My Project's Title 
description: My Project's Description 
date: 2024-01-31
tags: [Node.js, Markdown, HTML]
image: <image link/path>
spotlight : true 
category: Personal
---
```

This portion must be included. 

The `spotlight` field is optional. If you would like to have a specific post appear under the **Featured Projects** section on the front page, you must include `spotlight : true `.

The `category` field determines which column the post will be listed under on the **Projects** page. As of the current release, only the `Personal` and `School` fields are supported. In the coming updates, I will add dynamic category creation on the **Projects** page.

All markdown files have to be moved into the `views/projects/` folder, and it's content will automatically be parsed and displayed! Links will be automatically created for the post.



## To run this project:
This was built with the [Hono Framework](https://hono.dev/) on top of [Node.js](https://nodejs.org/en) (version 20.x).

The following dependencies are used (they're also in `package.json`):
- [hono](https://hono.dev/)
- [eta](https://eta.js.org/)
- [marked](https://www.npmjs.com/package/marked)

### Step 1: Have Node.js Installed
Make sure you have Node.js installed and added to `PATH`.
You can check by typing `node -v` in the terminal, which should tell you the version of Node you are using.  
If your terminal doesn't recognize this command(let), make sure it's added to your environment or system variables and restart your terminal.

### Step 2: Initialize Project (Optional) 
**Skip this step if you downloaded/cloned this repository** and just want to see how this website works.  
This step is meant for if you want to start your own empty project.   
Using the terminal, navigate to your project directory.   
In the terminal, type `npm init -y`. This will create a `package.json` file in your new project. This file is important - it records information about this project, how it should be run, and its dependencies.

### Step 3: Install Dependencies
The following command installs the 3 packages this project needs:  
`npm install marked eta hono @hono/node-server`

### Step 4: Run Development Server
To run, type `node index` into the terminal. This should start the development server on your computer, port 3000. Go to a browser and enter: `localhost:3000`.

You should now see this website!











