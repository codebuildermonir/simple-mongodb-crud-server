const express= require('express')
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const cors = require('cors');
const app= express()
const prot= process.env.PORT || 5000;

/* codebuildermonir */
/* hYExtbbqYUIqGElN */



const uri = "mongodb+srv://codebuildermonir:hYExtbbqYUIqGElN@cluster0.i3mosdj.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("usersDB");
    const users = database.collection("users");

    app.get('/users',async(req,res)=>{
      const findUser= users.find();
      const result= await findUser.toArray();
      res.send(result)

      /* update */
      app.get('/users/:id', async(req, res)=>{
        const id = req.params.id;
        console.log('update',id)
        const query = { _id :new ObjectId(id)};
        const result = await users.findOne(query);
        res.send(result)
        

      })

      app.put('/users/:id', async(req,res)=>{
        const id = req.params.id;
        const updateUser= req.body;
        console.log(updateUser)
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            name:updateUser.name,
            email:updateUser.email
          },
        };

        const result= await users.updateOne(filter, updateDoc, options)
        res.send(result)

      })

      app.delete('/users/:id', async(req, res)=>{
            const id = req.params.id;
            console.log('user delete', id)
            const query = { _id :new ObjectId(id)};
            const result = await users.deleteOne(query)
            res.send(result)
      })

})


    app.post('/users', async(req, res)=>{
      const user = req.body;
      console.log(user);
      const result = await users.insertOne(user);
      res.send(result)

})





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


app.use(cors());
app.use(express.json())




app.listen(prot,()=>{
      console.log(`Simple mongodb crud serve is running ${prot}`)
})


