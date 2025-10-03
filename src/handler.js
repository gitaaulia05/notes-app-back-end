const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const ress = h.response({
      status: "sucess",
      message: "Catatan Berhasil Ditambahkan",
      data: {
        noteId: id,
      },
    });

    ress.code(201);
    return ress;
  }

  const ress = h.response({
    status: "fail",
    message: "Catatan Gagal Ditambahkan",
  });

  ress.code(500);
  return ress;
};

const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }

  const ress = h.response({
    status: "fail",
    message: "Catatan Gagal Ditemukan",
  });

  ress.code(404);
  return ress;
};

const editNoteByIdHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const { id } = request.params;

  const updatedAt = new Date().toISOString();
  const index = notes.findLastIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: "sucsess",
      message: "Catata Berhasil Diperbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui catatan. Id Tidak Ditemukan",
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.findIndex((n) => n.id === id);

  if (note !== -1) {
    notes.splice(note, 1);
    const ress = h.response({
      status: "success",
      message: "Catatan Berhasil Dihapus",
    });
    ress.code(200);
    return ress;
  }

  const ress = h.response({
    status: "fail",
    message: "Catatan gagal ditemukan",
  });
  ress.code(404);
  return ress;
};
module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
