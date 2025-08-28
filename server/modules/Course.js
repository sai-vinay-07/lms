import mongoose from 'mongoose';

const courseSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        // Add other fields as necessary
    },
    { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
