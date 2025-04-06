const fs = require("fs")
const { createCanvas } = require("canvas")
const canvas = createCanvas(196, 196)
const ctx = canvas.getContext("2d")
ctx.fillStyle = "transparent"
ctx.fillRect(0, 0, 196, 196)

ctx.fillStyle = "#000000"
ctx.beginPath()

ctx.moveTo(64, 183)
ctx.lineTo(1, 119)
ctx.lineTo(25, 95)
ctx.lineTo(64, 133)
ctx.lineTo(76, 122)
ctx.lineTo(38, 86)
ctx.lineTo(64, 60)
ctx.lineTo(101, 98)
ctx.lineTo(197, 1)
ctx.lineTo(197, 50)
ctx.lineTo(64, 183)
ctx.fill()


const buffer = canvas.toBuffer("image/png")
fs.writeFileSync("./public/favicon.png", buffer)
fs.writeFileSync("./assets/favicon.png", buffer)

console.log("Favicon PNG created successfully!")

