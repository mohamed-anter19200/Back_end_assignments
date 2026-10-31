import * as userService from './user.service.js';

export async function updateUser(req, res,next) {
    try{
        const { id } = req.params;
        const updatedUser = await userService.updateUser(id, req.body);

        return res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        });
    }
    catch(err){
        next(err);
    }
}

export async function deleteUser(req, res, next) {
    try {
        const { id } = req.query;
        await userService.deleteUser(id);
        return res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (err) {
        next(err);
    }
}
export async function getUserById(req, res, next) {
    try {
        const { id } = req.query;
        const user = await userService.getUserById(id);
        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
}