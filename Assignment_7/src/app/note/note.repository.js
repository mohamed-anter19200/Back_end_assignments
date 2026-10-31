
import Note from '../../common/db/models/notes.model.js';

export async function createNote(data) {
    return Note.create(data);
}

export async function findNoteById(noteId, userId) {
    return Note.findOne({
        _id: noteId,
        userId
    });
}

export async function updateNote(noteId, userId, data) {
    return Note.findOneAndUpdate(
        { _id: noteId, userId },
        data,
        {
            returnDocument: 'after',
            runValidators: true
        }
    );
}

export async function replaceNote(noteId, userId, data) {
    return Note.findOneAndReplace(
        { _id: noteId, userId },
        data,
        {
            returnDocument: 'after',
            runValidators: true
        }
    );
}

export async function updateAllTitles(userId, title) {
    return Note.updateMany(
        { userId },
        { $set: { title } },
        { runValidators: true }
    );
}

export async function deleteNote(noteId, userId) {
    return Note.findOneAndDelete({
        _id: noteId,
        userId
    });
}
export async function getNotes(userId, skip, limit) {
    return Note.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-__v');
}

export async function countNotes(userId) {
    return Note.countDocuments({ userId });
}

export async function findNoteByContent(userId, content) {
    return Note.findOne({
        userId,
        content
    }).select('-__v');
}

export async function getNotesWithUser(userId) {
    return Note.find({ userId })
        .select('title userId createdAt')
        .populate({
            path: 'userId',
            select: 'email'
        });
}

export async function aggregateNotes(userId, title) {
    const pipeline = [
        {
            $match: {
                userId
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user'
        },
        {
            $project: {
                title: 1,
                content: 1,
                createdAt: 1,
                userId: 1,
                'user.name': 1,
                'user.email': 1
            }
        }
    ];

    if (title) {
        pipeline.splice(1, 0, {
            $match: {
                title: { $regex: title, $options: 'i' }
            }
        });
    }

    return Note.aggregate(pipeline);
}

export async function deleteAllNotes(userId) {
    return Note.deleteMany({ userId });
}
