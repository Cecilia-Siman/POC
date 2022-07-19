import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import joi from 'joi';
import multer from 'multer';

const server = express();
server.use(cors());
server.use(express.json());
dotenv.config();


const upload = multer({ dest: 'uploads/' });


server.post('/cadastro', upload.single('foto'), (request,response) => {
    console.log(request.body);
    const userSchema = joi.object({
        name: joi.string().required(),
        image: joi.required(),
    });

    const valid= userSchema.validate(request.body);
    if (!valid.error){
        const name = request.body.name;
        const image = request.body.image;
        response.status(201).send();

    }else {
        response.status(422).send();
    }
});

server.listen(5000);