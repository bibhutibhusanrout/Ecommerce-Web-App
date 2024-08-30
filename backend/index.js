const port = 6004;
const express = require("express");
const app = express(); // by using express we can create our app intense
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error, log } = require("console");
const { type } = require("os");

app.use(express.json()); //with the help of the express.json() whatever request we get from response that wii be automatically past through json.
app.use(cors()); //connect to port 4000.

// Database Connection with MongoDB
mongoose.connect("mongodb+srv://bibhutibhusanrout8800:Pupu4321@cluster7.qii0p.mongodb.net/e-commerce")


// API creation

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})


//Image Storage Engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename:(req,file,cb)=>{
    return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})
const upload = multer({storage:storage})


//Creating Upload Endpoint for images
app.use('/images',express.static('upload/images'))
app.post('/upload',upload.single('product'),(req,res)=>{
  let image_filename = req.file.filename;
  res.json({
    success:1,
    image_url: image_filename,
  })
})

// Schema for Creating Products

const Product = mongoose.model("Product",{
  id:{
    type: Number,
    required:true,
  },
    name:{
      type: String,
      required: true,
    },
    image:{
      type:String,
      required:true,
    },
    category:{
      type:String,
      required:true,
    },
    new_price:{
      type:Number,
      required:true
    },
    old_price:{
      type:Number,
      required:true
    },
    date:{
      type:Date,
      default:Date.now(),
    },
    available:{
      type:Boolean,
      default:true
    },
})

// Schema for user

const User = mongoose.model("User",{
  name:{
    type:String,
  },
  email:{
    type:"String",
    unique:true,
  },
  password:{
    type:String,
  },
  cartData:
  {
    type:Object,
  },
  data:{
    type:Date,
    default:Date.now,
  },
})

// Creating endpoint for registering users
app.post('/signup',async(req,res)=>{

  let check = await User.findOne({email:req.body.email});
  if(check)
  {
    return res.status(400).json({success:false,errors:"existing user"})
  }

  let cart = {};
  for (let i = 0; i < 300 ;i++) {
    cart[i] = 0;
  }

  const user = new User({
      name:req.body.username,
      email:req.body.email,
      password:req.body.password,
      cartData:cart,
  })
    await user.save();

    const data = {
      user:{
        id:user.id
      }
    }
    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

// Creating endpoint for login
app.post('/login',async(req,res)=>{
  let user = await User.findOne({email:req.body.email});
  if(user)
  {
    let password = req.body.password === user.password;
    if(password)
    {
       const data = {
        user:{
          id:user.id
        }
       }
       const token = jwt.sign(data,'secret_ecom')
       res.json({success:true,token})
    }
    else
    {
      res.json({success:false,error:"Incorrect Password"})
    }
  }
  else
  {
    res.json({success:false,error:"Wrong Email"})
  }
})


app.post('/addproduct',async(req,res)=>{
  let products = await Product.find({});
  let id;
  if(products.length>0)
  {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id+1;
  }
  else
  {
    id = 1;
  }


  const product = new Product({
    id:id,
    name:req.body.name,
    image:req.body.image,
    category:req.body.category,
    new_price:req.body.new_price,
    old_price:req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Product saved");
  res.json({
    success:true,
    name:req.body.name,
  })
})

 // Creating API For Deleting Products
 app.post('/removeproduct',async(req,res)=>{
  await Product.findOneAndDelete({id:req.body.id});
  console.log("removed");
  res.json({
    success: true,
    name:req.body.name
  })
})

app.get('/allproducts',async(req,res)=>{
  let products = await Product.find({});
  console.log("All products fetched");
  res.send(products);
})

// creating endpoint for newcollection item
app.get('/newcollections',async(req,res)=>{
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("NewCollection Fetched");
  res.send(newcollection);
})

// Creating endpoint for Popular in Women
app.get('/popularwomen',async(req,res)=>{
    let products = await Product.find({});
    let popularinwomen = products.slice(0,4);
    console.log("Popular in women fetched");
    res.send(popularinwomen)
})

// // Creating middleware to fetch user
const fetchuser = async(req,res,next)=>{
  const token = req.header('auth-token');
  if(!token)
  {
    res.status(401).send({errors:"Please authenticate using valid token"})
  }
  else
  {
    try {
      const data = jwt.verify(token,'secret_ecom');
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({errors:"Please authenticate using a valid token"})
    }
  }
}

// Creating endpoint for adding product in cart
app.post('/addtocart',fetchuser,async(req,res)=>{
  // console.log(req.body);
  console.log("added",req.body.itemId);
  // console.log(req.user.id);
  
  let userdata = await User.findOne({_id:req.user.id})
  userdata.cartData[req.body.itemId]+=1;
  await User.findByIdAndUpdate({_id:req.user.id},{cartData:userdata.cartData})
  res.send("Added")
})

// Creating endpoint for removeing product in cart
app.post('/removefromcart',fetchuser,async(req,res)=>{
  // console.log(req.body);
  console.log("removed",req.body.itemId);
  let userdata = await User.findOne({_id:req.user.id});
  if(userdata.cartData[req.body.itemId]>0)
  userdata.cartData[req.body.itemId]-=1;
  await User.findByIdAndUpdate({_id:req.user.id},{cartData:userdata.cartData})
  res.send("Removed")
})

// Creating endpoint to get cartdata
app.post('/getcart',fetchuser,async(req,res)=>{
  console.log("GetCart");
  let userdata = await User.findOne({_id:req.user.id});
  res.json(userdata.cartData)
})

app.listen(port,(error)=>{
  if(!error)
    {
      console.log("Server Running on Port "+port);
    }
    else
    {
      console.log("Error : "+error)
    }
})