const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const pkg = require('./package.json')

// Metadata
const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: "List of countries API", version: pkg.version }
    },
    apis: [
        "./routes/*.routes.js"
    ]
}

const swaggerSpec = swaggerJsdoc(options)

const swaggerDocs = (app, port) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        customSiteTitle: "List of countries API | Docs",
        // customCss: '.swagger-ui .topbar { display: none }',
        customfavIcon: '/images/favicon.ico',
        customJs: '/javascripts/swagger-header.js'
    }))
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })
}

module.exports = { swaggerDocs }
