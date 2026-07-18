const { getDb } = require("../data/database");
const { ObjectId } = require("mongodb");

const getAllContacts = async (req, res) => {
  try {
    const db = getDb();

    const contacts = await db
      .collection("contacts")
      .find()
      .toArray();

    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleContact = async (req, res) => {
  try {
    const db = getDb();

    const id = new ObjectId(req.params.id);

    const contact = await db
      .collection("contacts")
      .findOne({ _id: id });

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createContact = async (req, res) => {
  try {
    const db = getDb();

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const response = await db
    .collection("contacts")
    .insertOne(contact);

    res.status(201).json ({
      id: response.insertedId
    });
  } catch (err) {
    res.status(500).json(err);
  }
}

const updateContact = async (req, res) => {
  try {
    const db = getDb();

    const id = new ObjectId(req.params.id);

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await db
      .collection("contacts")
      .replaceOne(
        { _id: id },
        contact
      );

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }

  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteContact = async (req, res) => {
  try {
    const db = getDb();

    const id = new ObjectId(req.params.id);

    const response = await db
      .collection("contacts")
      .deleteOne({ _id: id });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }

  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};