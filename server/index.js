const express = require('express');
const compression = require('compression');
const { check, validationResult } = require('express-validator');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

app.get('/username/compliance-check/:username',
check('username').matches(/^[a-zA-Z][a-zA-Z][0-9][0-9][a-zA-Z][a-zA-Z]$/).isLength(6), (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        console.log(!errors.isEmpty())
        console.log(errors)
        return res.status(400).json({ errors: errors.array() });
    }
    res.status(200).json({message: 'ok'})
})


app.listen(port, error => {
    if (error) throw error;
    console.log('server running on port ' + port);
})