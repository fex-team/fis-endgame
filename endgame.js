var fis = module.exports = require('fis');

fis.cli.name = 'fis-endgame';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');

fis.config.set('roadmap.path', [
    {
        reg: "**.html",
        useDomain: true
    }
]);

fis.config.merge({
    statics: '/static',
    modules: {
        parser: {
            less: 'less'
        },
        postprocessor: {
            js: 'region',
            html: 'region',
            css: 'region',
        },
        postpackager : ['simple']
    },
    roadmap: {
        ext: {
            less: 'css'
        }
    }
});