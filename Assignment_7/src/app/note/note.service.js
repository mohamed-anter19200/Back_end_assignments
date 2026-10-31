import mongoose from 'mongoose';

import * as noteRepository from './note.repository.js';
import * as userRepository from '../user/user.repository.js';

import { createError } from '../../middlewares/customError.js';

function validateId(id, fieldName = 'ID') {
    if (!id || !mongoose.isValidObjectId(id)) {
        createError(`Invalid ${fieldName}`, 400);
    }
}

async function checkUser(userId) {
    validateId(userId, 'User ID');
    const user = await userRepository.findUserById(userId);
    if (!user) {
        createError('User not found', 404);
    }
    return user;
}

export async function createNote(userId, body) {
    await checkUser(userId);
    const { title, content } = body;
    if (!title || !content) {
        createError('Title and content are required', 400);
    }
    return noteRepository.createNote({
        title,
        content,
        userId
    });
}

export async function updateNote(noteId, userId, body) {
    await checkUser(userId);
    validateId(noteId, 'Note ID');
    const { title, content } = body;
    const updatedData = {};
    if (title !== undefined) updatedData.title = title;
    if (content !== undefined) updatedData.content = content;
    if (Object.keys(updatedData).length === 0) {
        createError('No data provided for update', 400);
    }
    const note = await noteRepository.updateNote(
        noteId,
        userId,
        updatedData
    );
    if (!note) {
        createError('Note not found', 404);
    }
    return note;
}

export async function replaceNote(noteId, userId, body) {
    await checkUser(userId);
    validateId(noteId, 'Note ID');
    const { title, content } = body;
    if (!title || !content) {createError('Title and content are required', 400);}
    const note = await noteRepository.replaceNote(
        noteId,
        userId,
        {
            title,
            content,
            userId
        }
    );

    if (!note) {createError('Note not found', 404);}
    return note;
}

export async function updateAllTitles(userId, body) {
    await checkUser(userId);
    const { title } = body;
    if (!title) {createError('Title is required', 400);}
    return noteRepository.updateAllTitles(userId, title);
}

export async function deleteNote(noteId, userId) {
    await checkUser(userId);
    validateId(noteId, 'Note ID');
    const deletedNote = await noteRepository.deleteNote(noteId, userId);
    if (!deletedNote) {createError('Note not found', 404);}
    return deletedNote;
}

export async function getNotes(userId, query) {
    await checkUser(userId);
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    if (
        !Number.isInteger(page) ||
        !Number.isInteger(limit) ||
        page < 1 ||
        limit < 1 ||
        limit > 100
    ) {
        createError('Invalid page or limit', 400);
    }

    const skip = (page - 1) * limit;
    const [notes, totalNotes] = await Promise.all([
        noteRepository.getNotes(userId, skip, limit),
        noteRepository.countNotes(userId)
    ]);
    return {
        notes,
        pagination: {
            totalNotes,
            totalPages: Math.ceil(totalNotes / limit),
            currentPage: page,
            limit
        }
    };
}

 export async function getNoteById(noteId, userId) {
    await checkUser(userId);
    validateId(noteId, 'Note ID');
    const note = await noteRepository.findNoteById(
        noteId,
        userId
    );
    if (!note) {
        createError('Note not found', 404);
    }
    return note;
}

export async function getNoteByContent(userId, content) {
    await checkUser(userId);
    if (!content) {createError('Content is required', 400);}
    const note = await noteRepository.findNoteByContent(
        userId,
        content
    );
    if (!note) {createError('Note not found', 404);}
    return note;
}

export async function getNotesWithUser(userId) {
    await checkUser(userId);
    return noteRepository.getNotesWithUser(userId);
}

export async function aggregateNotes(userId, title) {
    await checkUser(userId);
    const objectId = new mongoose.Types.ObjectId(userId);
    return noteRepository.aggregateNotes(objectId, title);
}

export async function deleteAllNotes(userId) {
    await checkUser(userId);
    return noteRepository.deleteAllNotes(userId);
}
