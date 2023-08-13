/*
This examples streams an image from a URL to a PureImage buffer,
draws the current date in big black letters,
and writes the final image to disk

 */
import * as PImage from "../dist/index.ems.js"
import fs from 'fs'
import * as client from "https"

let url = "https://vr.josh.earth/webxr-experiments/physics/jinglesmash.thumbnail.png"
let filepath = "output_stream_sync.png"
//register font
const font = PImage.registerFont('../test/unit/fixtures/fonts/SourceSansPro-Regular.ttf','MyFont');
//load font
font.loadSync()
//get image
client.get(url, (image_stream)=>{
    //decode image
    PImage.decodePNGFromStream(image_stream).then(img => {
        //get context
        const ctx = img.getContext('2d');
        ctx.fillStyle = '#000000';
        ctx.font = "60pt MyFont";
        ctx.fillText(new Date().toDateString(), 50, 80);
        PImage.encodePNGToStream(img, fs.createWriteStream(filepath)).then(()=>{
            console.log("done writing to ",filepath)
        })
    })
})

