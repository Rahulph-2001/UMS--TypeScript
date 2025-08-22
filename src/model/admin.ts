import mongoose, { Document, Schema, model } from "mongoose";

export interface AdminDocument extends Document {
    username: string;
    password: string;
}

const adminSchema = new Schema<AdminDocument>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const Admin = model<AdminDocument>("Admin", adminSchema);

// Create default admin function
const createDefaultAdmin = async () => {
    try {
        const existingAdmin = await Admin.findOne({ username: 'admin' });
        if (!existingAdmin) {
            await Admin.create({ username: 'admin', password: 'admin@123' });
            console.log('Default admin created');
        } else {
            console.log('Admin already exists');
        }
    } catch (error) {
        console.error('Error creating default admin:', error);
    }
};

mongoose.connection.once('open', async () => {
    await createDefaultAdmin();
});

export default Admin;