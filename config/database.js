import mongoose from "mongoose"

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

db.on('connected', function () {
  console.log(`Connected at port ${db.port}`)
})

