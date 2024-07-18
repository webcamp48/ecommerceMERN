const port = 5173;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { type } = require('os');
// const { default: mongoose } = require('mongoose');

app.use(express.json());
app.use(cors());

// DataBase Connection With Mongoos DB

mongoose.connect("mongodb+srv://softwarepro:softwarepro@cluster0.juvuw3d.mongodb.net/softwarepro");


// API Creation 
app.get("/", (req, resp)=>{
  resp.send('Express App is Running.')
});


// Images Storage Engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}` )
  }
})

const upload = multer({
  storage: storage
});


// Creating Upload EndPoints For Images
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, resp) => {
  console.log('Request received:', req.body, req.file);
  if (!req.file) {
    console.error('No file received!');
    return resp.status(400).json({ error: 'No file received' });
  }
  resp.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});


// Scheme for Creating Products
const Product = mongoose.model("Product", {
  id:{
    type: Number,
    require : true,
  },
  name:{
    type: String,
    require : true,
  },
  description:{
    type: String,
    require : true,
  },
  image:{
    type: String,
    require : true,
  },
  category:{
    type: String,
    require : true,
  },
  new_price:{
    type: Number,
    require : true,
  },
  old_price:{
    type: Number,
    require : true,
  },
  createdAtDate:{
    type: Date,
    default : Date.now,
  },
  avilable:{
    type: Boolean,
    default : true,
  },
});

// Creating API for Add Product EndPoint
app.post("/addproduct", async (req, resp) => {

  // automatic id generate increment
  let products = await Product.find({});
  let id;
  if(products.length > 0){
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  }else{
    id = 1;
  }

  // add product
  const product = new Product({
    id: id,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,

    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    createdAtDate: req.body.createdAtDate,
    avilable: req.body.avilable,
  });
  console.log(product);
  await product.save();
  console.log("Saved Product");
  resp.json({
    success : true,
    name : req.body.name
  })
});


// Creating API for Deleting Product EndPoint
app.post('/removeproduct', async (req, resp) => {
  await Product.findOneAndDelete({id: req.body.id});
  console.log("Product Removed");
  resp.json({
    success : true,
    name : req.body.name
    });
});



// Creating API for fetch all Products 
app.get("/allproducts", async (req, resp) => {
  let products = await Product.find({});
  console.log('All product are Fetched!');
  resp.send(products);
})


// Shema for Creating User Model
const Users = mongoose.model("Users",{
  name:{
    type: String,
  },
  email: {
    type: String,
    unique : true
  },
  password: {
    type: String,
    },
    cartData :{
      type: Object
    },
    date:{
      type: Date,
      default: Date.now,
    }
});


// Creating EndPoint API for Register User
app.post('/signup', async (req, resp) =>{

  // check if user already exists
  let check = await Users.findOne({
    email: req.body.email
  });
  if(check){
    return resp.status(400).json({
      success: false,
      error: "existing user find with same email address. "
    });
  }


  let cart = {};
  for(let i = 0;i<300; i++){
    cart[i] = 0;
  }

  let user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart
    });

  await user.save();

  //  create a user token jwt for signup
  const data = {
    user: {
      id: user.id,
    }
  }
  const token = jwt.sign(data, 'secret_ecom');
  resp.json({
    success: true,
    token
  })

});



// Creating EndPoint for User Login auth
app.post('/login', async (req, resp) =>{
  let user = await Users.findOne({
    email : req.body.email
  });
  if(user){
    const comparePassword = req.body.password === user.password;
    if(comparePassword){
      const data = {
        user:{
          id: user.id
        }
      }
      const token = jwt.sign(data, 'secret_ecom');
      resp.json({
        success: true,
        token
        })
    }else{
      resp.json({
        success: false,
        errors: 'Password is incorrect'
        })
    }
  }else{
    resp.json({
      success: false,
      errors: 'Email not found'
      })
  }
});



// Creating EndPoint for new Collection Product API
app.get("/newcollection", async(req, resp)=>{
  let products = await Product.find({});
  let newCollection = products.slice(1).slice(-12);
  console.log("New Collection Product are Fetch");
  resp.send(newCollection)
});


// Creating EndPoint for Popular Product API in women section
app.get('/popularinwomen', async(req,resp)=>{
  let products = await Product.find({category:"women"});
  let popularInWomen = products.slice(0,4);
  console.log("Popular Product in Women Section are Fetch");
  resp.send(popularInWomen);
});


// Creating Middleware for fetch user
const fetchUser = async (req,resp, next)=>{
  const token = req.header("auth-token");
  if(!token){
    resp.status(401).send({errors: "Please Authenticate using Valid Token."});
    }else{
      try{
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
        }catch(err){
          resp.status(401).send({errors: "Please Authenticate using Valid Token."});
          }
    }
}


// For cart Product

// Creating EndPoint for Adding Product in cart section
app.post('/addtocart', fetchUser, async (req, resp) => {
  console.log("Added product in cart", req.body.itemId);

  try {
      let userData = await Users.findOne({ _id: req.user.id });
      if (!userData.cartData[req.body.itemId]) {
          userData.cartData[req.body.itemId] = 1; 
      } else {
          userData.cartData[req.body.itemId] += 1;
      }

      await Users.findOneAndUpdate(
          { _id: req.user.id },
          { cartData: userData.cartData }, 
          { new: true }  
      );

      resp.send("Product Added In Cart Section");
  } catch (error) {
      console.error('Error adding product to cart:', error);
      resp.status(500).send('Internal Server Error');
  }
});




// Creating EndPoint for remove Product in cart section
app.post('/removefromcart', fetchUser, async (req, resp) => {
  console.log("Removed product from cart", req.body.itemId);

  try {
      let userData = await Users.findOne({ _id: req.user.id });
      if (userData.cartData[req.body.itemId]) { 
          userData.cartData[req.body.itemId] -= 1; 

          if (userData.cartData[req.body.itemId] <= 0) { 
              delete userData.cartData[req.body.itemId]; 
          }

          await Users.findOneAndUpdate(
              { _id: req.user.id },
              { cartData: userData.cartData }, 
              { new: true }  
          );

          resp.send("Product Removed From Cart Section");
      } else {
          resp.status(404).send('Product not found in cart'); 
      }
  } catch (error) {
      console.error('Error removing product from cart:', error);
      resp.status(500).send('Internal Server Error');
  }
});



// Creating EndPoint for get cart  Product in cart section
app.post('/getcart', fetchUser, async (req, resp) => {
    console.log("Get cart products");

    try {
        let userData = await Users.findOne({ _id: req.user.id });
        resp.json(userData.cartData); 
    } catch (error) {
        console.error('Error getting cart products:', error);
        resp.status(500).send('Internal Server Error');
    }
});






// Creating Endpoint API for Related Products
app.get('/relatedproducts/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const relatedProducts = await Product.find({ category }).limit(4); 

    if (relatedProducts.length === 0) {
      return res.status(404).json({ success: false, message: 'No related products found' });
    }

    console.log("Related products are fetched!");
    res.json({ success: true, products: relatedProducts });
  } catch (error) {
    console.error("Error fetching related products:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// Creating API for Updating Product EndPoint
app.post('/updateproduct', async (req, resp) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id: req.body.id },
      {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        avilable: req.body.avilable,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return resp.status(404).json({ success: false, message: 'Product not found' });
    }

    console.log("Product Updated");
    resp.json({
      success: true,
      product: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product:', error);
    resp.status(500).send('Internal Server Error');
  }
});














// Creating API for searching Products by name

app.get("/searchproducts", async (req, resp) => {
  const searchQuery = req.query.search || '';

  try {
    const products = await Product.find({
      name: { $regex: searchQuery, $options: 'i' } 
    });

    console.log(`Products matching '${searchQuery}' are fetched!`);
    resp.send(products);
  } catch (error) {
    console.error(`Error fetching products matching '${searchQuery}':`, error);
    resp.status(500).send({ error: `Failed to fetch products matching '${searchQuery}'` });
  }
});






//  Start the Server 
app.listen(port, (error) => {
   if(!error){
    console.log(`Server is running on port ${port}`);
   }else{
    console.log(`Error in server ${error}`);
   }
  });
  
// password
// Zw9w7Qo9wr5jRTtk




// // Creating API for Filter Products by Date Time
// app.get("/filterproducts", async (req, resp) => {
//   const date = req.query.date || '';
//   const time = req.query.time || '';
//   try{
//     const products = await Product.find({
//       date: { $regex: date, $options: 'i' },
//       time: { $regex: time, $options: 'i' }
//       });
//       console.log(`Products matching '${date}' and '${time}' are fetched!`);
//         resp.send(products);
//         } catch (error) {
//           console.error(`Error fetching products matching '${date}' and '${time}':`, error);
//           resp.status(500).send({ error: `Failed to fetch products matching '${date}${time}'` });
//   }

// });


// billing shipping model schema


// const BillingShippingInfo = mongoose.model("BillingShippingInfo", {
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Reference to the User model assuming 'User' is your actual model name
//     required: true
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   phone: {
//     type: String,
//     required: true
//   },
//   address: {
//     type: String,
//     required: true
//   },
//   city: {
//     type: String,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });


// // POST endpoint to submit shipping information
// app.post('/submitshipping', async (req, res) => {
//   try {
//     const { userId, name, phone, address, city } = req.body;

//     // Check if userId is a valid ObjectId
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ success: false, error: 'Invalid userId' });
//     }

//     // Create a new instance of BillingShippingInfo
//     const newShippingInfo = new BillingShippingInfo({
//       userId,
//       name,
//       phone,
//       address,
//       city,
//     });

//     // Save to database
//     await newShippingInfo.save();

//     // Respond with success message
//     res.json({ success: true, message: 'Shipping information submitted successfully' });
//   } catch (error) {
//     console.error('Error submitting shipping information:', error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// });





