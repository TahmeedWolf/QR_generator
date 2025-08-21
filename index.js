/* 
Goals:
Use the inquirer npm package to get user input.
Use the qr-image npm package to turn the user entered URL into a QR code image.
Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import fs from "fs";
import * as qr from "qr-image";  

inquirer
  .prompt([
    {
      message: "Type in your URL: ",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;

    // generate PNG QR code
    const qr_png = qr.image(url, { type: "png" });
    qr_png.pipe(fs.createWriteStream("QR_img.png"));
    console.log("QR Code generated: QR_img.png");

    // save the URL in a text file
    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("URL.txt file has been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Something else went wrong", error);
    }
  });





  


