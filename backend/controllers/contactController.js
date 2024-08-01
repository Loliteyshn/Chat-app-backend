const Contact = require("../models/contactModel");

module.exports.setContact = async(req, res, next) => {
    try {
        console.log(req.body);
        const { firstname, lastname } = req.body;
        // const firstnameCheck = await User.findOne({ firstname });
        // // if (firstnameCheck)
        // //     return res.json({ msg: 'firstname already uses'});
        const user = await Contact.create({
            firstname,
            lastname
        });
        return res.json({ status: true, user });
    } catch (ex) {
        next(ex);
    }
}

module.exports.getAllContacts = async(req, res, next) => {
    try {
        const users = await Contact.find();
        return res.json(users);
    } catch (ex) {
        next(ex);
    }
}

module.exports.updateContact = async(req, res, next) => {
    try {
        const { id, firstname, lastname } = req.body;
        const result = await Contact.findOneAndUpdate({ _id: id }, {
            $set: { firstname, lastname },

        }, { new: true });
        return res.json(result);
    } catch (ex) {
        next(ex);
    }
}

module.exports.deleteContact = async(req, res, next) => {
    try {
        const id = req.body.contact._id;
        const result = await Contact.deleteOne({ _id: id });

        console.log(id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        return res.json({ message: 'Contact deleted successfully' });
    } catch (ex) {
        next(ex);
    }
}

module.exports.filterContacts = async(req, res, next) => {
    try {
        const { search } = req.query;
        const query = {
            $or: [
                { firstname: { $regex: search, $options: 'i' } },
                { lastname: { $regex: search, $options: 'i' } },
            ],
        };
        const results = await Contact.find(query);
        res.json(results);
    } catch (ex) {
        next(ex);
    }
}