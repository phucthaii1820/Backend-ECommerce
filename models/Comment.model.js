import { mongoose } from 'mongoose';

const commentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    create_at: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Comment',commentSchema);