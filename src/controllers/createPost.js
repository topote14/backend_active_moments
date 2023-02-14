const Post = require("../models/Post");
const fs = require('fs');

const createPost = async (req, res) => {
    let body = req.body;
    if (!body.content && !req.file) {
        return res.status(400).send({ error: true, message: 'Los datos no son validos' });
    }
    if (body.content && body.content.length > 200) {
        return res.status(400).send({ error: true, message: 'El contenido excede los 200 caracteres' });
    }
    let newPost = new Post({
        owner: {
            id: req.user.id,
            username: req.user.username,
            name: req.user.name,
            lastname: req.user.lastname,
            image: req.user.image
        },
        content: body.content ? body.content : ""
    })
    console.log(newPost)
    if (req.file) {
        // Verifico el tipo de archivo
        if (req.file.mimetype.split('/')[1] !== 'png' && req.file.mimetype.split('/')[1] !== 'jpeg' && req.file.mimetype.split('/')[1] !== 'webp') {
            return res.status(400).send({ error: true, message: 'La imagen no es válida' });
        }
        // Renombro la imagen guardada con el id del post y le agrego la extension de archivo
        fs.renameSync(req.file.path, 'public/images/' + newPost._id.toString() + '.' + req.file.mimetype.split('/')[1]);
        newPost.image = '/images/' + newPost._id.toString() + '.' + req.file.mimetype.split('/')[1];
    }
    try {
        let save = await newPost.save();
        return res.status(200).send({
            data: save,
            message: 'Publicación creada correctamente'
        });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports = createPost;