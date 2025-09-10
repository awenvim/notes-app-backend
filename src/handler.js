const { nanoid } = require('nanoid');
const books = [];

// Tambah buku
const addBookHandler = (req, res) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;

  // Validasi sederhana
  if (!name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
  }
  if (readPage > pageCount) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id, name, year, author, summary, publisher,
    pageCount, readPage, finished, reading,
    insertedAt, updatedAt,
  };

  books.push(newBook);

  return res.status(201).json({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: { bookId: id },
  });
};

// Ambil semua buku
const getAllBooksHandler = (req, res) => {
  return res.json({
    status: 'success',
    data: { books },
  });
};

// Ambil buku by id
const getBookByIdHandler = (req, res) => {
  const { id } = req.params;
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
  }

  return res.json({
    status: 'success',
    data: { book },
  });
};

// Edit buku
const editBookByIdHandler = (req, res) => {
  const { id } = req.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
  }
  if (!name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
  }
  if (readPage > pageCount) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }

  const finished = pageCount === readPage;

  books[index] = {
    ...books[index],
    name, year, author, summary, publisher, pageCount, readPage, finished, reading,
    updatedAt,
  };

  return res.json({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
};

// Hapus buku
const deleteBookByIdHandler = (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
  }

  books.splice(index, 1);

  return res.json({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
