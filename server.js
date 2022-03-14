const express = require('express');
const app = express();
const {syncAndSeed, User, Message, Conversation} = require('./db/db.js');
const path = require('path');
const {Op} = require('@sequelize/core');


const PORT = process.env.PORT || 3000;

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
      include: Message
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
    console.log('test');
    const conversations = await Conversation.findAll({
      
      include:[{
        model: Message,
        where: {
          // senderId: req.params.id
          [Op.or]: [
            {receiverId: req.params.id},
            {senderId: req.params.id}
          ]
        }
      }, User],
      // where: {
      //   // '$messages.receiverId$': req.params.id
      //   [Op.or]: [
      //     {'$messages.receiverId$': req.params.id},
      //     {'createdAt': 10}
      //   ]
      //   // [Op.or]: [
      //   //   {'$messages.receiverId$': req.params.id}
      //   //   // {'$messages.senderId$': req.params.id}
      //   // ]
      // }
    })
    console.log(conversations);
    res.send(conversations);
  }
  catch(error){
    next(error);
  }
  
})
