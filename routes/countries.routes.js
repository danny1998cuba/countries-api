var express = require('express');
var router = express.Router();

const controller = require('../controllers').countriesController;
const middles = require('../middlewares')

router.get('/abrevs', controller.abrevs);
router.get('/:abrev', middles.listByLanguage('countries'), controller.filterByAbrev, middles.countriesQuery);
router.get('/', middles.listByLanguage('countries'), middles.countriesQuery);

module.exports = router;

// Swagger
// Country Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Country:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: A 2-letters identifier (upper case) for the country
 *         name:
 *           type: string
 *           description: The name of the country in the selected language
 *         capital:
 *           type: string
 *           description: The name of the country's capital in the selected language
 *         native:
 *           type: string
 *           description: The native name of the country
 *         phone:
 *           type: string
 *           description: The phone code of the country
 *         continent:
 *           type: string
 *           description: The continent's identifier where the country belongs
 *         currency:
 *           type: string
 *           description: A comma-separated relation of the currencies of the country
 *         languages:
 *           type: array
 *           items:
 *             type: string
 *             description: The identifiers of the languages spoken in the country
 *         emoji:
 *           type: string
 *           description: The emoji of the national flag
 *         emojiU:
 *           type: string
 *           description: The unicode emoji of the national flag
 *       example:
 *         id: CA
 *         name: Canada
 *         capital: Ottawa
 *         native: Canada 
 *         phone: 1
 *         continent: NA
 *         currency: CAD
 *         languages: [en, fr]
 *         emoji: 🇨🇦
 *         emojiU: U+1F1E8 U+1F1E6
 */

// Operations
/**
 * @swagger
 * tags:
 *   name: Country
 * /api/{language}/country:
 *   get:
 *     summary: Lists all the countries
 *     tags: [Country]
 *     parameters:
 *      - in: path
 *        name: language
 *        type: string
 *        default: en
 *        required: true
 *        description: A supported language (de, en, es, fr, it, pt)
 *      - in: query
 *        name: continent
 *        schema:
 *          type: string
 *        description: A continent identifier
 *      - in: query
 *        name: lang
 *        description: One or more spoken languages to filter for.
 *        required: false
 *        type: array
 *        items:
 *          type: string
 *        style: form
 *        explode: false
 *     responses:
 *       200:
 *         description: The list of the countries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Country'
 * /api/{language}/country?name:
 *   get:
 *     summary: Lists all the names of the countries
 *     tags: [Country]
 *     parameters:
 *      - in: path
 *        name: language
 *        type: string
 *        default: en
 *        required: true
 *        description: A supported language (de, en, es, fr, it, pt)
 *      - in: query
 *        name: continent
 *        schema:
 *          type: string
 *        description: A continent identifier
 *      - in: query
 *        name: lang
 *        description: One or more spoken languages to filter for.
 *        required: false
 *        type: array
 *        items:
 *          type: string
 *        style: form
 *        explode: false
 *     responses:
 *       200:
 *         description: The list of the countries' names
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 * /api/{language}/country?native:
 *   get:
 *     summary: Lists all the native names of the countries
 *     tags: [Country]
 *     parameters:
 *      - in: path
 *        name: language
 *        type: string
 *        default: en
 *        required: true
 *        description: A supported language (de, en, es, fr, it, pt)
 *      - in: query
 *        name: continent
 *        schema:
 *          type: string
 *        description: A continent identifier
 *      - in: query
 *        name: lang
 *        description: One or more spoken languages to filter for.
 *        required: false
 *        type: array
 *        items:
 *          type: string
 *        style: form
 *        explode: false
 *     responses:
 *       200:
 *         description: The list of the countries' native names
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 * /api/{language}/country/{abrev}:
 *   get:
 *     summary: Get a country by id
 *     tags: [Country]
 *     parameters:
 *      - in: path
 *        name: language
 *        type: string
 *        default: en
 *        required: true
 *        description: A supported language (de, en, es, fr, it, pt)
 *      - in: path
 *        name: abrev
 *        schema:
 *          type: string
 *        required: true
 *        description: The country id
 *     responses:
 *       200:
 *         description: The country response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Country'
 *       404:
 *         description: The country was not found
 * /api/{language}/country/{abrev}?name:
 *   get:
 *     summary: Get a country's name by id
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: language
 *         type: string
 *         default: en
 *         required: true
 *         description: A supported language (de, en, es, fr, it, pt)
 *       - in: path
 *         name: abrev
 *         schema:
 *           type: string
 *         required: true
 *         description: The country id
 *     responses:
 *       200:
 *         description: The country's name by id
 *       404:
 *         description: The country was not found
 * /api/{language}/country/{abrev}?native:
 *   get:
 *     summary: Get a country's native name by id
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: language
 *         type: string
 *         default: en
 *         required: true
 *         description: A supported language (de, en, es, fr, it, pt)
 *       - in: path
 *         name: abrev
 *         schema:
 *           type: string
 *         required: true
 *         description: The country id
 *     responses:
 *       200:
 *         description: The country's native name by id
 *       404:
 *         description: The country was not found
 */
