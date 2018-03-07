/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const MESSAGES = require('./messages/messages');
const MESSAGES_RU = require('./messages/messages_ru');
const MESSAGES_EN = require('./messages/messages_en');

/**
 * Module utilities
 * @private
 */

const DAY = 24 * 60 * 60 * 1000;
const WEEK = 7 * DAY;

/**
 * Module exports
 * @public
 */

/**
 * Universal messages
 * @public
 */
module.exports = MESSAGES;

/**
 * Provides messages by locales. By default all messages are in 'EN' locale
 * @param locale {string} Code of the locale in ISO 639-1 format
 * @return {*}
 */

module.exports.messages = function (locale) {
    return locale && locale.toLowerCase
        ? (locale.toLowerCase() === 'ru') ? MESSAGES_RU : MESSAGES_EN
        : MESSAGES_EN
};

/**
 * Gets the locale from the request
 * @return {string}
 * @public
 */

module.exports.getLocale = function (req) {
    return req.cookies.locale;
};

/**
 * Specific parameters
 * @public
 */

// Security concerns
module.exports.COOKIE_NAME = '_sessionId';
module.exports.COOKIE_HTTPS_ONLY = true;
module.exports.COOKIE_EXPIRES = WEEK;

/**
 * Business logic parameters
 * @public
 */

module.exports.DOCUMENT_RESERVATION_TIME = 3 * DAY;
module.exports.CHECKOUT_TIME_STUDENT_NOT_BESTSELLER = 3 * WEEK;
module.exports.CHECKOUT_TIME_STUDENT_BESTSELLER = 2 * WEEK;
module.exports.CHECKOUT_TIME_FACULTY = 4 * WEEK;

module.exports.statuses = {
    AVAILABLE: 'Available',
    LOANED: 'Loaned',
    MAINTENANCE: 'Maintenance',
    REFERENCE: 'Reference',
    RESERVED: 'Reserved'
};

module.exports.userTypes = {
    STUDENT: 'Student',
    FACULTY: 'Faculty',
    LIBRARIAN: 'Librarian'
};

/**
 * API parameters
 * @public
 */

module.exports.DEFAULT_DOCS_NUMBER = 25;
module.exports.DEFAULT_BOOK_REQ_FIELDS = ['title', 'authors', 'cost', 'edition', 'id', 'publisher', 'isbn', 'keywords', 'description', 'available', 'loaned', 'reference'];
module.exports.DEFAULT_BOOK_RESPONSE_FIELDS = ['id', 'authors', 'bestseller', 'cost', 'image', 'instances', 'title', 'edition', 'publisher', 'keywords'];
module.exports.DEFAULT_AUTHOR_RESPONSE_FIELDS = ['id', 'name', 'birth_date', 'death_date'];
module.exports.DEFAULT_MEDIA_RESPONSE_FIELDS = ['title', 'authors', 'cost', 'id', 'keywords', 'description', 'available', 'loaned', 'reference'];
// TODO: add some privacy
module.exports.DEFAULT_USER_RESPONSE_FIELDS = ['name', 'id', 'type', 'birth_date', 'email', 'occupation', 'address', 'about', 'telegram', 'avatar', 'phone'];

/**
 * Database connection address
 * @public
 */
module.exports.mongoURI = 'mongodb://dev:12346@ds012058.mlab.com:12058/kitapp-tests';
// module.exports.mongoURI = 'mongodb://innoproject:YASFbay5kpjQ@ds046677.mlab.com:46677/kitapp';