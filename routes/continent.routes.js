var express = require('express');
var router = express.Router();

const controller = require('../controllers').continentController;
const middles = require('../middlewares')

router.get('/abrevs', controller.abrevs);
router.get('/:abrev', middles.listByLanguage('continents'), controller.filterByAbrev, middles.continentQuery);
router.get('/:abrev/countries_count', middles.listByLanguage('continents'), controller.countriesCount);
router.get('/', middles.listByLanguage('continents'), middles.continentQuery);

module.exports = router;

// Swagger
// Continent Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Continent:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: A 2-letters identifier (upper case) for the continent
 *         name:
 *           type: string
 *           description: The name of the continent in the selected language
 *       example:
 *         id: EU
 *         name: Europe
 */

// Operations
/**
 * @swagger
 * tags:
 *   name: Continent
 * /api/{language}/continent:
 *   get:
 *     summary: Lists all the continents
 *     tags: [Continent]
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
 *                 $ref: '#/components/schemas/Continent'
 * /api/{language}/continent?name:
 *   get:
 *     summary: Lists all the names of the continents
 *     tags: [Continent]
 *     parameters:
 *      - in: path
 *        name: language
 *        type: string
 *        default: en
 *        required: true
 *        description: A supported language (de, en, es, fr, it, pt)
 *     responses:
 *       200:
 *         description: The list of the continents' names
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 * /api/{language}/continent/abrevs:
 *   get:
 *     summary: Lists all the continents' identifiers
 *     tags: [Continent]
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
 * /api/{language}/continent/{abrev}:
 *   get:
 *     summary: Get a continent by id
 *     tags: [Continent]
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
 *        description: The continent id
 *     responses:
 *       200:
 *         description: The continent response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Continent'
 *       404:
 *         description: The continent was not found
 * /api/{language}/continent/{abrev}?name:
 *   get:
 *     summary: Get a continent's name by id
 *     tags: [Continent]
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
 *         description: The continent id
 *     responses:
 *       200:
 *         description: The continent's name by id
 *       404:
 *         description: The continent was not found
 * /api/{language}/continent/{abrev}/countries_count:
 *   get:
 *     summary: Get the number of countries that belong to the continent
 *     tags: [Continent]
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
 *         description: The continent id
 *     responses:
 *       200:
 *         description: The number of countries that belong to the continent
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *       404:
 *         description: The continent was not found
 */
