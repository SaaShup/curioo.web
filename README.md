# Curioo.city Web

This is the project that build and deploy the Curioo.city institutional website.

If you search for the Curioo.city web app, you are on the wrong place. Go to https://github.com/SaaShup/curio

Here we speak HTML, CSS, JS and Markdown.

## Install, Run and Contribute

Before play, you must have installed the [latest version of Hugo](https://gohugo.io/installation/).

Clone this project and run inside the new directory created:

```bash
hugo server -p 8080
```

Go on http://localhost:8080 and have fun with [Hugo](https://gohugo.io/documentation/)!

### Contribute right now!!!

1. Create an branch from the up to date origin main branch
2. Develop a __little__ feature or fix a bug
3. Commit your work (remember to don't expose your crap)
4. Create a Pull Request and add some reviewer
5. Take a coffe
6. Follow review from your collegue
7. Merge your work on main
8. Take a coffe
6. GOTO 1

#### I don't want to read the Hugo documentation (TLDR)

Fine, fine, you are lazy like us. So Hugo in a nutshell:

There are planty of directories:

* `archetypes`: you don't care
* `assets`: put CSS and JS here
* `content`: if your are not [Théo](https://github.com/demoxzz), you don't care
* `data`: if you don't know what is data in Hugo, you don't care
* `i18n`: translations keystore, one file per language
* `layouts`: the most important thing for you. All start with [`layouts/_default/baseof.html`](layouts/_default/baseof.html)
* `public`: Hugo stuff, forget this directory
* `static`: put images in the `images` directory

Oh, I almost forgot! There is one important rule!

> [!CAUTION]
> DON'T TOUCH THE `hugo.toml` FILE. NEVER. EVER.
