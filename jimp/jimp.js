const Jimp = require('jimp');

Jimp.read('./full-imgs/pizza.jpg')
    .then( img => {
        img
        .resize(300, Jimp.AUTO) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write('./thumb-imgs/pizza-thumb.jpg');
    })
    .catch(err => console.log(err));