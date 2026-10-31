
import * as noteService from './note.service.js';

// 1. Create note
export async function createNote(req, res, next) {
    try {
        const { id } = req.query;

        const note = await noteService.createNote(id, req.body);

        return res.status(201).json({
            success: true,
            message: 'Note created successfully',
            data: note
        });
    } catch (err) {
        next(err);
    }
}

// 2. Update note
export async function updateNote(req, res, next) {
    try {
        const { id } = req.query;
        const { noteId } = req.params;

        const note = await noteService.updateNote(
            noteId,
            id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: 'Note updated successfully',
            data: note
        });
    } catch (err) {
        next(err);
    }
}

// 3. Replace note
export async function replaceNote(req, res, next) {
    try {
        const { id } = req.query;
        const { noteId } = req.params;

        const note = await noteService.replaceNote(
            noteId,
            id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: 'Note replaced successfully',
            data: note
        });
    } catch (err) {
        next(err);
    }
}

// 4. Update all titles
export async function updateAllTitles(req, res, next) {
    try {
        const { id } = req.query;

        const result = await noteService.updateAllTitles(
            id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: 'Notes titles updated successfully',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

// 5. Delete one note
export async function deleteNote(req, res, next) {
    try {
        const { id } = req.query;
        const { noteId } = req.params;

        const note = await noteService.deleteNote(noteId, id);

        return res.status(200).json({
            success: true,
            message: 'Note deleted successfully',
            data: note
        });
    } catch (err) {
        next(err);
    }
}

// 6. Get paginated notes
export async function getNotes(req, res, next) {
    try {
        const { id } = req.query;

        const result = await noteService.getNotes(id, req.query);

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (err) {
        next(err);
    }
}

// 7. Get note by ID
export async function getNoteById(req, res, next) {
    try {
        const { id } = req.query;
        const { noteId } = req.params;

        const note = await noteService.getNoteById(noteId, id);

        return res.status(200).json({
            success: true,
            data: note
        });
    } catch (err) {
        next(err);
    }
}

// 8. Get note by content
export async function getNoteByContent(req, res, next) {
    try {
        const { id, content } = req.query;

        const note = await noteService.getNoteByContent(id, content);

        return res.status(200).json({
            success: true,
            data: note
        });
    } catch (err) {
        next(err);
    }
}

// 9. Get notes with user email
export async function getNotesWithUser(req, res, next) {
    try {
        const { id } = req.query;

        const notes = await noteService.getNotesWithUser(id);

        return res.status(200).json({
            success: true,
            data: notes
        });
    } catch (err) {
        next(err);
    }
}

// 10. Aggregation
export async function aggregateNotes(req, res, next) {
    try {
        const { id, title } = req.query;

        const notes = await noteService.aggregateNotes(id, title);

        return res.status(200).json({
            success: true,
            data: notes
        });
    } catch (err) {
        next(err);
    }
}

// 11. Delete all notes
export async function deleteAllNotes(req, res, next) {
    try {
        const { id } = req.query;

        const result = await noteService.deleteAllNotes(id);

        return res.status(200).json({
            success: true,
            message: 'All notes deleted successfully',
            data: result
        });
    } catch (err) {
        next(err);
    }
}
