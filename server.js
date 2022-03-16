const express = require('express');
const app = express();
const {syncAndSeed, User, Message, Conversation} = require('./db/db.js');
const path = require('path');
const {Op} = require('@sequelize/core');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

const init = async() => {
  try{
    await syncAndSeed();
    app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
  }
  catch (error){
    console.log(error);
  }
  
}

init();

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/conversation/:id', async(req, res, next) => {
  try{
    const conversation = await Conversation.findAll({
      where: {
        id: req.params.id
      },
      include: [Message, User]
    });
    res.send(conversation);
  }
  catch(error){
    next(error);
  }
  
})

app.get('/users', async(req, res, next) => {
  try{
    const users = await User.findAll();
    res.send(users);
  }
  catch(error){
    next(error);
  }
})

app.get('/user/:id/conversations', async(req, res, next) => {
  try{
    const conversations = await Conversation.findAll({
      
      include:[{
        model: Message,
        where: {
          [Op.or]: [
            {receiverId: req.params.id},
            {senderId: req.params.id}
          ]
        }
      }, User]
    })
    res.send(conversations);
  }
  catch(error){
    next(error);
  }
  
})

app.post('/conversation/:id', async (req, res, next) => {
  try{
    let conversation = await Conversation.findByPk(req.params.id, {
      include: [User]
    });
    const sender = await User.findByPk(req.body.selectedUser);
    let receiverId;


    if(conversation.users[0].id === sender.id){
      receiverId = conversation.users[1].id;
    }
    else{
      receiverId = conversation.users[0].id;
    }

    
    await Message.create({
      text: req.body.message, 
      senderId: sender.id, 
      receiverId: receiverId, 
      conversationId: conversation.dataValues.id
    });

    
    res.send(conversation);
  }
  catch(error){
    next(error);
  }
})

app.delete('/message/:id', async(req, res, next) => {
  try{
    const message = await Message.findByPk(req.params.id);
    message.destroy();
    res.sendStatus(204);
  }
  catch(error){
    next(error);
  }
})
