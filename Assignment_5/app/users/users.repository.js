import users from "./users.model.js";

export const findByEmail = async (email) => {
    return await users.findOne({  where: { email },});
};

export const createUser = async (userData) => {
    const user = users.build(userData);
    return await user.save();
};

export const findById = async (id) => {
    return await users.findByPk(id);
};

export const findByIdWithoutRole = async (id) => {
    return await users.findByPk(id , {
        attributes: {
            exclude: ["role"],
        },
    });
};

export const createOrUpdateById = async (id, userData) => {
    let user = await users.findByPk(id);
    if (user) {
        user.set(userData);
    } else {
        user = users.build({
            ...userData,
            id,
        });
    }
    await user.save({ validate: false });
    return user;
};
