import User from "../../common/db/models/users.model.js";

export async function findUserByEmail(email) {
    return await User.findOne({ email });
}
export async function createUser(data) {
   return await User.create(data);
 }

export async function findUserById(id) {
    return User.findById(id).select('-password');
}

export async function updateUser(id, data) {
    return User.findByIdAndUpdate(id, data, {
        returnDocument: 'after',
        runValidators: true
    }).select('-password');
}


export async function deleteUser(id) {
    return User.findByIdAndDelete(id);
}