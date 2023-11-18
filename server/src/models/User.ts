import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import environment from '../utils/environment';
import { AppError } from '../utils/errorHandler';

const Types = mongoose.Schema.Types;

export interface User {
    _id: string;
    name: string;
    email: string;
    password?: string;
    role: 'user' | 'admin';
    createdAt: Date;
}

export interface UserMethods {
    getSignedJwtToken: () => string;
    matchPassword: (enteredPassword: string) => Promise<boolean>;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface UserModel extends mongoose.Model<User, {}, UserMethods> {
    // statics
}

const userSchema = new mongoose.Schema<User, UserModel, UserMethods>({
    name: {
        type: Types.String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: Types.String,
        required: [true, 'Please add an email'],
    },
    password: {
        type: Types.String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false,
    },
    role: {
        type: Types.String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    createdAt: {
        type: Types.Date,
        default: Date.now,
    },
});

/**
 * Encrypt password using bcrypt
 */
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    if (!this.password) {
        throw new AppError('No Password Provided', 'Password is required', 400);
    }
    this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Sign JWT and return with the user id
 * @returns {string} - JWT Token
 */
userSchema.methods.getSignedJwtToken = function (): string {
    return jwt.sign({ id: this._id }, environment.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

/**
 * Match user entered password to hashed password in database
 * @param {string} enteredPassword
 * @returns {boolean}
 */
userSchema.methods.matchPassword = async function (
    enteredPassword: string,
): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = mongoose.model<User, UserModel>('User', userSchema, 'users');
export default userModel;
