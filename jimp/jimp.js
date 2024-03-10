const Jimp = require('jimp');
const fs = require('fs');

const images = fs.readdirSync('./full-imgs/');

images.forEach( image => {
    Jimp.read('./full-imgs/' + image)
    .then( img => {
        img
        .resize(300, Jimp.AUTO) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write('./thumb-imgs/' + image);
    })
    .catch(err => console.log(err));
})