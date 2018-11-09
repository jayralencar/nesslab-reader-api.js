var ness = require('../nesslab_reader');

ness.connect('localhost',5578);
ness.setTagSize(10);
ness.on('connect', function(res) {
    ness.init();
});

ness.on('tag', function(re){
    console.log(re)
})