/**
 *  Your code ⬇️
 */

const disney = require('./disney.json');
const express = require('express');

const app = express();
app.use(express.json());

const port = 3000;

app.listen(port, () => {
    console.log(`Server is rocking @ http://localhost:${port}`);
});

app.get('/characters/',(req,res)=>{
    console.log(req)
    const name = req.query.name;
    if(name) {
        const result = disney.filter((character) => {
            return character.name.includes(name);
        });
        return res.json({
            message: `Found ${result.length} characters`,
            result
        });
        //res.json(disney);
    }
});

app.get('/characters/:id', (req,res)=>{
    const id = req.params.id;
    const uniqueCharacter = disney.find((character)=>{
        return character._id === Number(id)
    })
    return res.json(uniqueCharacter);
})

app.post('/characters/', (req,res)=>{
    const { name, films } = req.body;
    let _id = disney.at(-1)._id;
    _id++;

    const characterToCreate = { name, films, _id };
    disney.push(characterToCreate._id);
    return res.json({
        message: `A new character named ${name} has been added :`,
        characterToCreate
    });
})