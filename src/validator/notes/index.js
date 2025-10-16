const { NotePayloadSchema } = require('./schema');
const NotFoundError = require('../../exceptions/NotFoundError');

const NotesValidator = {
  validateNotePayload: (payload) => {
    const validationResult = NotePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new NotFoundError(validationResult.error.message);
    }
  },
};

module.exports = NotesValidator;
