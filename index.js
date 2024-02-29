const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = 3000
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
//pass 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const uri = "mongodb+srv://whatufind:kSPaiGqCbhas3dcu@cluster0.j55wfnv.mongodb.net/?retryWrites=true&w=majority";

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

    const database = client.db("whatufind").collection("users")
    const servicesdata = client.db("whatufind").collection("service-post")
    app.post('/users', async(req, res) => {
      const user = req.body
     
      const result = await database.insertOne(user)
      res.send(result)

    })

    app.post('/services/posts', async(req,res)=>{
      const service = req.body
      console.log(service);
      const result = await servicesdata.insertOne(service)
      res.send(result)
    })

    app.get('/service-post', async(req,res)=>{
      const result = await servicesdata.find().sort({_id:-1}).toArray()
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


