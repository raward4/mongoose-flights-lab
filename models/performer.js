import mongoose from "mongoose"

const Schema = mongoose.Schema

const performerSchema = new Schema({
  name: {type: String, required: true, unique: true}
})

const Performer = mongoose.model("Performer", performerSchema)

export {
  Performer
}