const connection = require('../config/connection');
const { User, Thought, reactionSchema } = require('../models')

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Connected!');
    await User.deleteMany({});
    await Thought.deleteMany({});

    await User.create([{
        username: "Andrew",
        email: "Ammassey42@gmail.com"
    },
    {
        username: "Joe",
        email: "joejoe@gmail.com"
    }]);

    console.log("seeded Data!");
    process.exit(0);
});
