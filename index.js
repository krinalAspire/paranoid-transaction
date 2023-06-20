require('dotenv').config();
const express= require("express");
const app = express();
const User=require("./model")
const { sq } = require("./db");

app.use(express.json());
// const eurekaHelper = require('./eureka');

const port= process.env.PORT;

app.get('/role',async(req,res)=>{
    try{
       const user= await User.findAll();
       res.status(201).send(user);
    }catch(e){
      res.status(e)
    }
  })

  app.post('/role',async(req,res)=>{
    try {
      const {role}= req.body
        const newWorkpackage = await User.create({
         role
        });
        res.send(newWorkpackage);
        console.log(newWorkpackage);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }}
)

app.get("/role/:id", async(req,res)=>{
  try{
    // console.log(req.params.id);
    const id= req.params.id;
    const user=await User.findByPk(id);
    res.status(201).send(user);
    console.log(user);
  }catch(e){
    res.status(400).send(e.message);
    console.log(e.message);
  }
})

app.patch('/role/:id', async(req,res)=>{
  try{
    const id= req.params.id;
    const user= await User.update(req.body, {
      where: {id :id}
    })
    res.status(201).send(user)
  }catch(e){
    res.status(e.message);
    console.log(e.message);
  }
})

app.delete("/role/:id", async(req,res)=>{
  try{
    const id= req.params.id;
    const user= await User.destroy({
      where: { id: id }
    })
    res.status(201).send("deleted");
  }catch(e){
    res.status(400).send(e.message);
    console.log(e.message);
  }
})

//transaction 
app.get("/transaction", async(req,res)=>{
    const t =await  sq.transaction();
    try{
      // const role=req.body
       const user= await User.create({role:"superadmin"},
        { transaction:t}
       )
       console.log("commit");
       res.status(201).send(user);
       t.commit();
       res.status(200).send("ok");
      //  res.send(user);
    }catch(e){
      console.log(e);
      console.log("rollback");
      t.rollback();
    }
    
})

  

// eurekaHelper.registerWithEureka('krinal-sequqlize', port);

app.listen(9000,()=>{
   console.log(`server running at ${port}`);
});