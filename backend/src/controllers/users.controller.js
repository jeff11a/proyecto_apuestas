const usersController  = {};

const User = require('../models/User');

usersController.getUsers = async (req, res) => {
    const notes = await User.find();
    res.json(notes);
};

usersController.createUser = async (req, res) => {
    const { firstName, lastName, email, password, country, phoneNumber, birthday } = req.body;
    const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        country: country,
        phoneNumber: phoneNumber,
        birthday: birthday
    })
    await newUser.save();
    res.json({ message: 'User Saved' });
}

usersController.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
}

usersController.updateUser = async (req, res) => {
    const { firstName, lastName, email, password, country, phoneNumber, birthday } = req.body;
    await User.findByIdAndUpdate(req.params.id, {
        firstName,
        lastName,
        email,
        password,
        country,
        phoneNumber,
        birthday
    });
    res.json({message: 'User Update' });
}

usersController.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({message: 'User Delete' });
}


module.exports = usersController;