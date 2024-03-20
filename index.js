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
const user = process.env.USER_NAME 
const pass = process.env.USER_PASS

const uri = `mongodb+srv://${user}:${pass}@cluster0.j55wfnv.mongodb.net/?retryWrites=true&w=majority`;

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
    //database created for users info
    const database = client.db("whatufind").collection("users")
    //database created for single post
    const postData = client.db("whatufind").collection("posts")
    //database created for service post
    const servicesdata = client.db("whatufind").collection("service-post")
    //database created for product post
    const productsdata = client.db("whatufind").collection("product-post")
    //database created for educational information
    const eduInfoData = client.db("whatufind").collection("education-info")
    //database created for skill information
    const skillData = client.db("whatufind").collection("skills")
    //database created for experience information
    const experienceData = client.db("whatufind").collection("experience")
    //database created for record information
    const recordData = client.db("whatufind").collection("record")
    //database created for record information
    const interestData = client.db("whatufind").collection("interest")


    //posting the user info to mongodb
    app.post('/users', async (req, res) => {
      const user = req.body

      const result = await database.insertOne(user)
      res.send(result)

    })

    //posting the single post of user to mongodb
    app.post('/post', async (req, res) => {
      const post = req.body
      const result = await postData.insertOne(post)
      res.send(result)
    })


    //getting all post from mongodb
    app.get('/posts', async (req, res) => {
      const result = await postData.find().sort({ _id: -1 }).toArray()
      res.send(result)
    })


    //getting single users post from mongodb
    app.get("/posts/:email", async (req, res) => {
      const userEmail = req.params.email;
      const usersPosts = await postData.find({ userEmail: userEmail }).sort({ _id: -1 }).toArray();
      res.send(usersPosts);
    });


    //posting the service post of user to mongodb
    app.post('/service', async (req, res) => {
      const service = req.body
      const result = await servicesdata.insertOne(service)
      res.send(result)
    })


    //getting all service post from mongodb
    app.get('/services', async (req, res) => {
      const result = await servicesdata.find().sort({ _id: -1 }).toArray()
      res.send(result)
    })


    //getting single service post from mongodb
    app.get("/services/:email", async (req, res) => {
      const userEmail = req.params.email;
      const usersServices = await servicesdata.find({ userEmail: userEmail }).sort({ _id: -1 }).toArray();
      res.send(usersServices);
    });

    //posting the product post of user to mongodb
    app.post('/product', async (req, res) => {
      const product = req.body
      const result = await productsdata.insertOne(product)
      res.send(result)
    })


    //getting all product post from mongodb
    app.get('/products', async (req, res) => {
      const result = await productsdata.find().sort({ _id: -1 }).toArray()
      res.send(result)
    })


    //getting single users product post from mongodb
    app.get("/products/:email", async (req, res) => {
      const userEmail = req.params.email;
      const usersProducts = await productsdata.find({ userEmail: userEmail }).sort({ _id: -1 }).toArray();
      res.send(usersProducts);
    });







    //posting the educational information to mongodb
    app.post('/edu-info', async (req, res) => {
      const post = req.body
      const result = await eduInfoData.insertOne(post)
      res.send(result)
    })


    //getting all educational post post from mongodb
    app.get('/all-edu-info', async (req, res) => {
      const result = await eduInfoData.find().sort({ _id: -1 }).toArray()
      res.send(result)
    })


    //getting single education post from mongodb
    app.get("/edu-info/:email", async (req, res) => {
      const userEmail = req.params.email;
      const usersPosts = await eduInfoData.find({ userEmail: userEmail }).sort({ _id: -1 }).toArray();
      res.send(usersPosts);
    });




    //posting the skill information to mongodb
    app.post('/skill', async (req, res) => {
      const post = req.body
      const result = await skillData.insertOne(post)
      res.send(result)
    })


    //getting all skills post from mongodb
    app.get('/skills', async (req, res) => {
      const result = await skillData.find().sort({ _id: -1 }).toArray()
      res.send(result)
    })
    //getting single skills post from mongodb
    app.get("/skills/:email", async (req, res) => {
      const userEmail = req.params.email;
      const usersPosts = await skillData.find({ userEmail: userEmail }).sort({ _id: -1 }).toArray();
      res.send(usersPosts);
    });

    //getting single experience from mongodb
    app.get("/experience/:email", async (req, res) => {
      const userEmail = req.params.email;
      const usersPosts = await experienceData.find({ userEmail: userEmail }).sort({ _id: -1 }).toArray();
      res.send(usersPosts);
    });



    //posting the experience to mongodb
    app.post('/experience', async (req, res) => {
      const post = req.body
      const result = await experienceData.insertOne(post)
      res.send(result)
    })


    //getting all experience from mongodb
    app.get('/experiences', async (req, res) => {
      const result = await experienceData.find().sort({ _id: -1 }).toArray()
      res.send(result)
    })

      //getting single record from mongodb
      app.get("/record/:email", async (req, res) => {
        const userEmail = req.params.email;
        const usersPosts = await recordData.find({ userEmail: userEmail }).sort({ _id: -1 }).toArray();
        res.send(usersPosts);
      });
  
  
  
      //posting the record to mongodb
      app.post('/record', async (req, res) => {
        const post = req.body
        const result = await recordData.insertOne(post)
        res.send(result)
      })
  
  
      //getting all record from mongodb
      app.get('/records', async (req, res) => {
        const result = await recordData.find().sort({ _id: -1 }).toArray()
        res.send(result)
      })
  
      //getting single record from mongodb
      app.get("/interest/:email", async (req, res) => {
        const userEmail = req.params.email;
        const usersPosts = await interestData.find({ userEmail: userEmail }).sort({ _id: -1 }).toArray();
        res.send(usersPosts);
      });
  
  
  
      //posting the record to mongodb
      app.post('/interest', async (req, res) => {
        const post = req.body
        const result = await interestData.insertOne(post)
        res.send(result)
      })
  
  
      //getting all record from mongodb
      app.get('/interests', async (req, res) => {
        const result = await interestData.find().sort({ _id: -1 }).toArray()
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


