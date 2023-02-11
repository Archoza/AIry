import mongoose from "mongoose";
const Post = new mongoose.Schema({
    name: { type: String, required: true},
    prompt: { type: String, required: true},
    photo: { type: String, required: true},
    negativePrompt: { type: String, required: true},
    cfgScale: { type: Number, required: true},
    steps: { type: Number, required: true},
})

const PostSchema = mongoose.model('Post', Post)

export default PostSchema