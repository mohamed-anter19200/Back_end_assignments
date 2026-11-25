import { User } from '../../common/db/models/user.model.js';

export async function findUserByEmail(email) {
    return User.findOne({ email });
}


export async function createUser(userData) {
    const user = new User(userData);
    return await user.save();
}

export async function updateUser(userId, data) {
    return User.findOneAndUpdate({_id :userId},data ,
        {returnDocument:"after"}//means return doc after update
    )
}