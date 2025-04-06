const fs = require("fs")
const { createCanvas } = require("canvas")
const canvas = createCanvas(1242, 2436)
const ctx = canvas.getContext("2d")

ctx.fillStyle = "#F9F6F0"
ctx.fillRect(0, 0, 1242, 2436)

ctx.fillStyle = "#5D5C56"
ctx.beginPath()

ctx.moveTo(621, 1218)
ctx.lineTo(521, 1118)
ctx.lineTo(561, 1078)
ctx.lineTo(621, 1138)
ctx.lineTo(641, 1118)
ctx.lineTo(581, 1058)
ctx.lineTo(621, 1018)
ctx.lineTo(681, 1078)
ctx.lineTo(841, 918)
ctx.lineTo(841, 998)
ctx.lineTo(621, 1218)
ctx.fill()


ctx.font = "bold 72px Arial"
ctx.fillStyle = "#5D5C56"
ctx.textAlign = "center"
ctx.fillText("FileYourFacts", 621, 1318)


const buffer = canvas.toBuffer("image/png")
fs.writeFileSync("./assets/splash.png", buffer)

console.log("Splash screen created successfully!")

