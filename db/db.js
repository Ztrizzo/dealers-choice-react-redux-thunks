const {Sequelize, STRING, UUID, UUIDV4, TEXT} = require('sequelize');
const faker = require('faker');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers-choice-react-redux-thunks');

const User = sequelize.define('user', {
  name: {
    type: STRING
  },
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  }

})

const Message = sequelize.define('message', {
  text: {
    type: TEXT
  },
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  }

})

const Conversation = sequelize.define('conversation', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  }
})

User.hasMany(Message,{
  foreignKey: 'senderId'
});
Message.belongsTo(User, {
  as: 'receiver'
});

Conversation.hasMany(Message);
Message.belongsTo(Conversation);

Conversation.belongsToMany(User, {through: 'UserConversations'});
User.belongsToMany(Conversation, {through: 'UserConversations'})

const syncAndSeed = async () => {
  await sequelize.sync({force: true});
  
  const Moe = await User.create({name: 'Moe'});
  const Larry = await User.create({name: 'Larry'});
  const Lucy = await User.create({name: 'Lucy'});

  const MoeLarry = await Conversation.create();
  const MoeLucy = await Conversation.create(/*{users: [ Moe, Lucy ]}*/);
  const LucyLarry = await Conversation.create(/*{users: [ Lucy, Larry ]}*/);

  await MoeLarry.addUser(Moe, {through: 'UserConversations'})
  await MoeLarry.addUser(Larry, {through: 'UserConversations'})
  await MoeLucy.addUser(Moe, {through: 'UserConversations'})
  await MoeLucy.addUser(Lucy, {through: 'UserConversations'})
  await LucyLarry.addUser(Lucy, {through: 'UserConversations'})
  await LucyLarry.addUser(Larry, {through: 'UserConversations'})

  Message.create({text: 'Hello Moe, how are you doing?', receiverId: Moe.id, senderId: Larry.id, conversationId: MoeLarry.id});
  Message.create({text: faker.lorem.paragraph(1), receiverId: Larry.id, senderId: Moe.id, conversationId: MoeLarry.id});

  Message.create({text: 'Hello Lucy, where are you?', receiverId: Lucy.id, senderId: Moe.id, conversationId: MoeLucy.id});
  Message.create({text: 'Currently in ' + faker.address.state(), receiverId: Moe.id, senderId: Lucy.id, conversationId: MoeLucy.id});

  Message.create({text: 'Isnt Moe annoying?', receiverId: Larry.id, senderId: Lucy.id, conversationId: LucyLarry.id});
}

module.exports = {
  Message,
  User,
  Conversation,
  syncAndSeed
}