/*!
 * Book
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const DocumentParent = require('./Document');
const Errors = require('../../Errors');
const validator = require('../../validation/SetterValidation');
const mongoose = require('mongoose');

/**
 * A book model
 */

class Book extends DocumentParent {

    /**
     * Constructor for the book object
     * @param title
     * @param id
     * @param authors
     * @param cost
     * @param edition
     * @param ISBN
     * @param keywords
     */
    constructor(title, id, authors, cost, edition, ISBN, keywords) {
        super(title, id);
        this._authors = authors;
        this._cost = cost;
        this._edition = edition;
        this._ISBN = ISBN;
        this._keywords = keywords;
    }

    get authors() {
        return this._authors
    }

    set authors(value) {
        this._authors = value
    }

    get isBestseller() {
        return this._bestseller || false
    }

    set isBestseller(isBestseller) {
        // Check whether an input is strictly a boolean. IMHO, 'typeof' would be slower.
        if (isBestseller === true || isBestseller === false) {
            this._bestseller = isBestseller
        } else {
            throw new TypeError(Errors.IS_BESTSELLER_INVALID)
        }
    }

    get cost() {
        return this._cost
    }

    get description() {
        return this._description || ''
    }

    set description(description) {
        if (validator.validateString) {
            this._description = description
        } else {
            throw new TypeError(Errors.DESCRIPTION_INVALID)
        }
    }

    get edition() {
        return this._edition
    }

    get isbn() {
        return this._ISBN
    }

    get image() {
        return this._image || ''
    }

    // TODO write image validation (simply URL)
    set image(image) {
        this._image = image
    }

    get keywords() {
        return this._keywords
    }

    set keywords(keywords) {
        if (Array.isArray(keywords)) {
            this._keywords = [];
            for (let i = 0; i < keywords.length; i++) {
                if (typeof keywords[i] === 'string') {
                    this._keywords.push(keywords[i])
                }
            }
        } else {
            throw new TypeError(Errors.KEYWORDS_NOT_ARRAY)
        }
    }

    /**
     * Adds a keyword to the book
     * @param keyword a keyword to add to the book
     */
    addKeyword(keyword) {
        if (typeof keyword === 'string' && this.keywords.indexOf(keyword) === -1) {
            this.keywords.push(keyword)
        }
    }

    removeKeyword(keyword) {

        // Prevent unnecessary array traversing if types don't match
        if (typeof keyword !== 'string') {
            return false
        }

        // Find and remove if exists
        let index = this.keywords.indexOf(keyword);
        if (index !== -1) {
            this.keywords.splice(index, 1);
            return true
        }
        return false
    }

    get publisher() {
        return this._publisher || ''
    }

    set publisher(publisher) {
        if (validator.validateString) {
            this._publisher = publisher
        } else {
            throw new TypeError(Errors.PUBLISHER_INVALID)
        }
    }

    get published() {
        return this._published || ''
    }

    set published(published) {
        // Check whether this is a date
        if (published.getTime) {
            this._published = published
        }
    }
}

const bookRawModel = Object.assign({}, DocumentParent.models.raw, {
    authors: [{type: mongoose.Types.ObjectId, ref: 'Author'}],
    cost: Number,
    edition: String,
    isbn: String,
    keywords: [String],
    bestseller: {type: Boolean, required: false, default: false},
    description: {type: String, required: false},
    image: {type: String, required: false},
    publisher: {type: String, required: false},
    published: {type: Date, required: false}
});

const bookSchema = mongoose.Schema(bookRawModel);
bookSchema.virtual('id').get(() => {
    let bytes = this._id.valueOf()
        .toString()
        .substring(18);
    return parseInt(bytes, 16);
});

/**
 * Module exports a {@link Book} class
 * @type {Book}
 * @public
 */

module.exports = Book;
module.exports.models = {
    raw: bookRawModel,
    mongo: mongoose.model('Book', bookSchema)
};