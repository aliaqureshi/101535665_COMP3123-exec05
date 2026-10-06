const express = require('express');
const routerUser = express.Router();
const fs = require('fs');
const path = require('path');

const userFile = path.join(__dirname, '../user.json');

/*
- Return all details from user.json file to client as JSON format
*/
routerUser.get('/profile', (req, res) => {
    const userData = JSON.parse(fs.readFileSync(userFile, 'utf8'));
    res.json(userData);
});

/*
- Accept username and password as JSON body parameter
- Read data from user.json file
- Validate username and password
*/
routerUser.post('/login', (req, res) => {
    const { username, password } = req.body;

    const userData = JSON.parse(fs.readFileSync(userFile, 'utf8'));

    if (username !== userData.username) {
        return res.json({
            status: false,
            message: 'User Name is invalid'
        });
    }

    if (password !== userData.password) {
        return res.json({
            status: false,
            message: 'Password is invalid'
        });
    }

    res.json({
        status: true,
        message: 'User Is valid'
    });
});

/*
- Accept username as parameter and display message
  in HTML format like <b>${username} successfully logout.</b>
*/
routerUser.get('/logout/:username', (req, res) => {
    const username = req.params.username;

    res.send(`<b>${username} successfully logout.</b>`);
});

module.exports = routerUser;