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

module.exports = {
  getAllContacts,
  getSingleContact
};