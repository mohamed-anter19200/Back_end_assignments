
import { Router } from 'express';
import * as noteController from './note.controller.js';

const noteRouter = Router();

noteRouter.get('/note-by-content', noteController.getNoteByContent);
noteRouter.get('/note-with-user', noteController.getNotesWithUser);
noteRouter.get('/aggregate', noteController.aggregateNotes);
noteRouter.patch('/all', noteController.updateAllTitles);

noteRouter.post('/', noteController.createNote);
noteRouter.get('/', noteController.getNotes);
noteRouter.delete('/', noteController.deleteAllNotes);

noteRouter.put('/replace/:noteId', noteController.replaceNote);

noteRouter.patch('/:noteId', noteController.updateNote);
noteRouter.delete('/:noteId', noteController.deleteNote);
noteRouter.get('/:id', noteController.getNoteById);

export default noteRouter;
