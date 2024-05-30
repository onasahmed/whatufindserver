const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()




const app = express()
app.use(cors())
app.use(express.json())
const port = 3000
app.get('/', (req, res) => {
  res.send('Hello World!!!!!!!!!!!!!!!!!!!!')
})
app.get('/shaon', (req, res) => {
  res.send('FoodPanda Rider')
})
//pass 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const user = process.env.USER_NAME
const pass = process.env.USER_PASS
console.log(user, pass);

const uri = `mongodb+srv://${user}:${pass}@cluster0.j55wfnv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // await client.connect();
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
    //database created for about information
    const aboutData = client.db("whatufind").collection("about")


    //posting the user info to mongodb
    app.post('/users', async (req, res) => {
      const user = req.body

      const result = await database.insertOne(user)
      res.send(result)

    })
    app.get("/users/:email", async (req, res) => {
      const userEmail = req.params.email;
      const userData = await database.findOne({ email: userEmail });
     console.log(userData);
      res.send(userData);
    });

    app.patch('/users/:email', async (req, res) => {
      const email = req.params.email;

      const { phone, userName, address, birth, profession } = req.body;

      try {
        const result = await database.updateOne(

          { email: email },
          {
            $set: {
              phone: phone,
              displayName: userName,
              address: address,
              birth: birth,
              profession: profession,
              validation: true
            },
          },
          {
            upsert: true
          }
        );
        if (result.matchedCount === 0) {
          // res.status(404).send({email});
        } else {
          res.send(result);
        }
      } catch (error) {
        res.status(500).send(error);
      }
    });

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
    //update single post
    app.put('/updatePost/:id', async (req, res) => {
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const updatedPost = {
        $set: {
          description: req.body.description


        }
      }
      const result = await postData.updateOne(filter, updatedPost)
      res.send(result)
    })
    //delete single post from mongo
    app.delete('/deletePost/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await postData.deleteOne(query)
      res.send(result)
    })
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
      console.log(usersServices);
      const usersProducts = await productsdata.find({ userEmail: userEmail }).sort({ _id: -1 }).toArray();
      const all = [...usersServices, ...usersProducts]
      console.log(all);
      res.send(all);
    });
    app.put('/updateService/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedFields = {};

      if (req.body.serviceName) {
        updatedFields.serviceName = req.body.serviceName;
      }
      if (req.body.serviceDescription) {
        updatedFields.serviceDescription = req.body.serviceDescription;
      }

      const updatedServicePost = {
        $set: updatedFields
      };

      const result = await servicesdata.updateOne(filter, updatedServicePost);
      res.send(result);
    });

    ////delete single service post from mongo
    app.delete('/deleteService/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await servicesdata.deleteOne(query)
      res.send(result)
    })
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
    //edit single edu info
    app.put('/updateEdu/:id', async (req, res) => {
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const updatedEdu = {
        $set: {
          instituteName: req.body.instituteName,
          departmentName: req.body.departmentName,
          session: req.body.session,
          degree: req.body.degree


        }
      }
      const result = await eduInfoData.updateOne(filter, updatedEdu)
      res.send(result)
    })
    //delete single edu info
    app.delete('/deleteEdu/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await eduInfoData.deleteOne(query)
      res.send(result)
    })


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


    //Update Skill
    app.put('/updateSkill/:id', async (req, res) => {
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const updatedSkill = {
        $set: {
          skills: req.body.skills


        }
      }
      const result = await skillData.updateOne(filter, updatedSkill)
      res.send(result)
    })
    //delete single Skill info
    app.delete('/deleteSkill/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await skillData.deleteOne(query)
      res.send(result)
    })

    //posting the experience to mongodb
    app.post('/experience', async (req, res) => {
      const post = req.body
      const result = await experienceData.insertOne(post)
      res.send(result)
    })

    //getting single experience from mongodb
    app.get("/experience/:email", async (req, res) => {
      const userEmail = req.params.email;
      const usersPosts = await experienceData.find({ userEmail: userEmail }).sort({ _id: -1 }).toArray();
      res.send(usersPosts);
    });
    //getting all experience from mongodb
    app.get('/experiences', async (req, res) => {
      const result = await experienceData.find().sort({ _id: -1 }).toArray()
      res.send(result)
    })
    //update experience from Mongo
    app.put('/updateExperience/:id', async (req, res) => {
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const updatedExperience = {
        $set: {
          time: req.body.time,
          year: req.body.year,
          role: req.body.role,
          institute: req.body.institute


        }
      }
      const result = await experienceData.updateOne(filter, updatedExperience)
      res.send(result)
    })
    //delete experience from mongo
    app.delete('/deleteExperience/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await experienceData.deleteOne(query)
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
    //update single record from mongodb
    app.put('/updateRecord/:id', async (req, res) => {
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const updatedRecord = {
        $set: {
          record: req.body.record


        }
      }
      const result = await recordData.updateOne(filter, updatedRecord)
      res.send(result)
    })
    //Delete single Record from mongoDb
    app.delete('/deleteRecord/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await recordData.deleteOne(query)
      res.send(result)
    })

    //getting single interest from mongodb
    app.get("/interest/:email", async (req, res) => {
      const userEmail = req.params.email;
      const usersPosts = await interestData.find({ userEmail: userEmail }).sort({ _id: -1 }).toArray();
      res.send(usersPosts);
    });



    //posting the interest to mongodb
    app.post('/interest', async (req, res) => {
      const post = req.body
      const result = await interestData.insertOne(post)
      res.send(result)
    })


    //getting all interest from mongodb
    app.get('/interests', async (req, res) => {
      const result = await interestData.find().sort({ _id: -1 }).toArray()
      res.send(result)
    })

    //update single interest from mongodb
    app.put('/updateInterest/:id', async (req, res) => {
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const updatedInterest = {
        $set: {
          interest: req.body.interest


        }
      }
      const result = await interestData.updateOne(filter, updatedInterest)
      res.send(result)
    })
    //delete single interest from mongodb
    app.delete('/deleteInterest/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await interestData.deleteOne(query)
      res.send(result)
    })
    //Posting About Data

    app.post('/about', async (req, res) => {
      const post = req.body
      const result = await aboutData.insertOne(post)
      res.send(result)
    })
    //getting all skills post from mongodb
    app.get('/allAbout', async (req, res) => {
      const result = await aboutData.find().sort({ _id: -1 }).toArray()
      res.send(result)
    })
    //getting single skills post from mongodb
    app.get("/allAbout/:email", async (req, res) => {
      const userEmail = req.params.email;
      const usersAboutPost = await aboutData.find({ userEmail: userEmail }).sort({ _id: -1 }).toArray();
      res.send(usersAboutPost);
    });
    //about data edit from mongodb
    app.put('/updateAbout/:id', async (req, res) => {
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const updatedAbout = {
        $set: {
          about: req.body.about


        }
      }
      const result = await aboutData.updateOne(filter, updatedAbout)
      res.send(result)
    })
    //user profile pic posting to mongodb
    app.post('/userProfilePic/:email', async (req, res) => {
      const email = req.params.email;
      const { imageUrl } = req.body;

      try {
        const result = await database.updateOne(
          { email: email },
          { $push: { profilePics: imageUrl } },
          { upsert: true },
          { sort: -1 }
        );

        res.status(200).send(result);
      } catch (error) {
        console.error('Error updating profile picture', error);
        res.status(500).send({ error: 'Failed to update profile picture' });
      }
    });
    //User Profile Pic get and set single image
    app.get('/getProfilePic/:email', async (req, res) => {
      const email = req.params.email;

      try {
        const user = await database.findOne({ email: email });
        if (user && user.profilePics) {
          // Sort profilePics array in descending order
          user.profilePics.sort((a, b) => {
            // Custom sorting logic if needed
            // Assuming profilePics are URLs that might contain a timestamp or sequential ID
            return -1;
          });
        }

        res.status(200).send(user);
      } catch (error) {
        console.error('Error fetching user profile pictures', error);
        res.status(500).send({ error: 'Failed to fetch user profile pictures' });
      }
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


