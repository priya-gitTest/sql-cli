(function () {
    "use strict";

    var Utils = require('./utils'),
        Queries = require('./queries'),
        Q = require('q');

    class SearchCommand {
        constructor(db) {
            this.db = db;
            this.prefix = '.search';
            this.usage = '.search';
            this.description = 'Search all columns in all tables for a value';
        }

        run(messages, writer, args) {
            if (!Utils.validateArgs(args, 1)) {
                return Q.reject('No search value supplied');
            }
            messages.echo('Searching...');
            
            return Utils.runQuery(messages, writer, this.db.query.bind(this.db, Queries.searchSql(args[0])));
        }
    }

    module.exports = exports = SearchCommand;

} ());
