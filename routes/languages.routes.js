var express = require('express');
var router = express.Router();

const controller = require('../controllers').languagesController;
const middles = require('../middlewares')

router.get('/abrevs', controller.abrevs);
router.get('/:abrev', middles.listByLanguage('languages'), controller.filterByAbrev, middles.languageQuery);
router.get('/:abrev/countries_count', middles.listByLanguage('languages'), controller.countriesCount);
router.get('/', middles.listByLanguage('languages'), middles.languageQuery);

module.exports = router;

// Swagger
// Language Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Language:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: A two-letters identifier (lower case) for the language
 *         name:
 *           type: string
 *           description: The name of the language in the selected language
 *         native:
 *           type: string
 *           description: The native name of the language
 *         rtl: 
 *           type: number
 *           description: 1 if the language is written from right to left
 *       example:
 *         id: he
 *         name: Hebrew
 *         native: עברית
 *         rtl: 1
 */

// Operations
/**
 * @swagger
 * tags:
 *   name: Language
 * /api/{language}/language:
 *   get:
 *     summary: Lists all the languages
 *     tags: [Language]
 *     parameters:
 *      - in: path
 *        name: language
 *        type: string
 *        default: en
 *        required: true
 *        description: A supported language (de, en, es, fr, it, pt)
 *      - in: query
 *        name: rtl
 *        schema:
 *          type: undefined
 *        description: Filter by if it's right to left
 *        allowEmptyValue: true
 *     responses:
 *       200:
 *         description: The list of the languages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Language'
 * /api/{language}/language?name:
 *   get:
 *     summary: Lists all the names of the languages
 *     tags: [Language]
 *     parameters:
 *      - in: path
 *        name: language
 *        type: string
 *        default: en
 *        required: true
 *        description: A supported language (de, en, es, fr, it, pt)
 *      - in: query
 *        name: rtl
 *        schema:
 *          type: undefined
 *        description: Filter by if it's right to left
 *        allowEmptyValue: true
 *     responses:
 *       200:
 *         description: The list of the languages' names
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 * /api/{language}/language?native:
 *   get:
 *     summary: Lists all the native names of the languages
 *     tags: [Language]
 *     parameters:
 *      - in: path
 *        name: language
 *        type: string
 *        default: en
 *        required: true
 *        description: A supported language (de, en, es, fr, it, pt)
 *      - in: query
 *        name: rtl
 *        schema:
 *          type: undefined
 *        description: Filter by if it's right to left
 *        allowEmptyValue: true
 *     responses:
 *       200:
 *         description: The list of the languages' native names
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 * /api/{language}/language/abrevs:
 *   get:
 *     summary: Lists all the languages' identifiers
 *     tags: [Language]
 *     parameters:
 *      - in: path
 *        name: language
 *        type: string
 *        default: en
 *        required: true
 *        description: A supported language (de, en, es, fr, it, pt)
 *     responses:
 *       200:
 *         description: The list of the continents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 * /api/{language}/language/{abrev}:
 *   get:
 *     summary: Get a language by id
 *     tags: [Language]
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
 *        description: The language id
 *     responses:
 *       200:
 *         description: The language response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Country'
 *       404:
 *         description: The language was not found
 * /api/{language}/language/{abrev}?name:
 *   get:
 *     summary: Get a language's name by id
 *     tags: [Language]
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
 *         description: The language id
 *     responses:
 *       200:
 *         description: The language's name by id
 *       404:
 *         description: The language was not found
 * /api/{language}/language/{abrev}?native:
 *   get:
 *     summary: Get a language's native name by id
 *     tags: [Language]
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
 *         description: The language id
 *     responses:
 *       200:
 *         description: The language's native name by id
 *       404:
 *         description: The language was not found
 * /api/{language}/language/{abrev}/countries_count:
 *   get:
 *     summary: Get the number of countries that speak the language
 *     tags: [Language]
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
 *         description: The language id
 *     responses:
 *       200:
 *         description: The number of countries that speak the language
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *       404:
 *         description: The language was not found
 */
