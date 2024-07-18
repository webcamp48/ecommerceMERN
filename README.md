# ecommerceMERN
 
This is a e-commerce website built using the MERN stack (MongoDB, Express.js, React.js, Node.js and other third party libary).

<h1> Backend (Node.js, Express.js, MongoDB altas) </h1>

<h2>Features</h2>

Implemented authentication using JWT.
Created roles for users (admin and customer)


<h2>Database Models </h2>

User: name, email, password, role, createdAt
Product: name, description, price, category, stock, createdAt 

<h2> API Endpoints</h2>

User Registration and Login: Users can register and log in.
CRUD Operations for Products (Admin only): Admins can create, read, update, and delete products.
Add Product to Cart: Users can add products to their cart in Database.
Remove Product from Cart: Users can remove products from their cart.
For Product API : Collection Product,Category Select API, Related Product And Popular Product API



<h1> Frontend (React.js) </h1>

<h3> User Interface</h3>

Created a user-friendly UI using React.
Implemented routing using React Router.
Used a state management library (Context API).

<h3>Pages and Components </h3>

Home: Display a list of all products and Popular Product.
Product Details: Show details of a selected product .
Cart: Display products added to the cart.
Checkout: --------------.
Login and Registration Forms: Allow users to register and log in only valid email.
Navbar: Display the navbar with links to different pages.


<h3> Form Validation </h3>
Implemented client-side form validation for user input.
Name field only accepts letters.
Email and password fields have specific validation rules and email not accept special char.
Implemented login with Google and Facebook (using Third Party).

<h1>Bonus Features</h1>
Implemented a search bar to search for products.
Implemented a filter to filter products by category.
Implemented a pagination to display products in pages.

Implemented OTP-based authentication and email sending for OTP then verify .


<h2> Third-Party Integrations </h2>
Used Email.js for sending OTP emails from the frontend for verify.
and use auth0 for login with facebook and google

<h2>Note :</h2> The backend will run on npm run dev port 5173, the frontend on port 5174, and the admin panel on port 3000.

<h1>Getting Started <h1>
<h3>Prerequisites</h3>
Node.js
MongoDB

<h1> Installation </h1>

<h3>1. Clone the repository:</h3>
git clone https://github.com/https://github.com/webcamp48/ecommerceMERN.git
cd ecommerceMERN

<h3>2. Install dependencies:</h3>
<h4>for Back-End </h4>
cd Back-End
npm install


<h4>for Front-End </h4>
cd ../Front-End
npm install

<h3>3. Run the application: </h3>
<h4>for Back-End </h4>
cd Back-end
npm run dev

<h4>for Front-End </h4>
cd ../Front-End
npm run dev

<h4>for Admin </h4>
cd ../Admin
npm run dev

<h3>Note :</h3> The backend will run on npm run dev port 5173, the frontend on port 5174, and the admin panel on port 3000.