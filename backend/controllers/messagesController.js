const messageModel = require("../models/messageModel");
const axios = require("axios");

module.exports.addMessage = async(req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await messageModel.create({
            message: { text: message },
            users: [from, to],
            sender: from
        });
        if (data) {
            res.json({ msg: "Message added succesfully" });

            setTimeout(async() => {
                try {
                    const response = await axios.get('https://api.api-ninjas.com/v1/quotes', {
                        headers: {
                            "X-Api-Key": "48M30RsuOhkttYEBBNs61Q==uaYjZIWHaGKut1ui"
                        }
                    })
                    const quote = response.data[0].quote;
                    await messageModel.create({
                        message: { text: quote },
                        users: [to, from],
                        sender: to
                    });
                } catch (ex) {
                    next(ex);
                }
            }, 3000);
        }
        return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) {
        next(ex);
    }
}

module.exports.getAllMessages = async(req, res, next) => {
    try {
        const { from, to } = req.body;
        const messages = await messageModel
            .find({
                users: {
                    $all: [from, to]
                }
            })
            .sort({ updatedAt: 1 });
        const projectMessages = messages.map(msg => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text
            }
        });
        res.json(projectMessages);
    } catch (ex) {
        next(ex);
    }
}