# ecommerceMERN
 
This is a e-commerce website built using the MERN stack (MongoDB, Express.js, React.js, Node.js and other third party libary).

<h1> Backend (Node.js, Express.js, MongoDB altas) </h1>

<h2>Features</h2>

1) Implemented authentication using JWT. <br>
2) Created roles for users (admin and customer)


<h2>Database Models </h2>

1) User: name, email, password, role, createdAt <br>
2) Product: name, description, price, category, stock, createdAt  <br>

<h2> API Endpoints</h2>

1) User Registration and Login: Users can register and log in. <br>
2) CRUD Operations for Products (Admin only): Admins can create, read, update, and delete products. <br>
3) Add Product to Cart: Users can add products to their cart in Database. <br>
4) Remove Product from Cart: Users can remove products from their cart. <br>
5) For Product API : Collection Product,Category Select API, Related Product And Popular Product API. <br>



<h1> Frontend (React.js) </h1>

<h3> User Interface</h3>

1) Created a user-friendly UI using React. <br>
2) Implemented routing using React Router. <br>
3) Used a state management library (Context API). <br>

<h3>Pages and Components </h3>

1) Home: Display a list of all products, Slider, and Popular Product. <br>
2) Product Details: Show details of a selected product . <br>
3) Cart: Display products added to the cart. <br>
4) Checkout: --------------. <br>
5) Login and Registration Forms: Allow users to register and log in only valid email. <br>
6) Navbar: Display the navbar with links to different pages. <br>


<h3> Form Validation </h3>
1) Implemented client-side form validation for user input. <br>
2) Name field only accepts letters. <br>
3) Email and password fields have specific validation rules and email not accept special char. <br>
4) Implemented login with Google and Facebook (using Third Party). <br>

<h1>Bonus Features</h1>
1) Implemented a search bar to search for products. <br>
2) Implemented a filter to filter products by category. <br>
3) Implemented a pagination to display products in pages. <br>
4) Implemented OTP-based authentication and email sending for OTP then verify . <br>


<h2> Third-Party Integrations </h2>
1) Used Email.js for sending OTP emails from the frontend for verify. <br>
2) and use auth0 for login with facebook and google <br>

<h2>Note :</h2> The backend will run on npm run dev port 5173, the frontend on port 5174, and the admin panel on port 3000. <br>

<h1>Getting Started <h1>
<h3>Prerequisites</h3>
i) Node.js  <br>
ii) MongoDB

<h1> Installation </h1>

<h3>1. Clone the repository:</h3>
git clone https://github.com/https://github.com/webcamp48/ecommerceMERN.git   <br>
cd ecommerceMERN

<h3>2. Install dependencies:</h3>
<h4>for Back-End </h4>
cd Back-End  <br>
npm install


<h4>for Front-End </h4>
cd ../Front-End  <br>
npm install

<h3>3. Run the application: </h3>
<h4>for Back-End </h4>
cd Back-end  <br>
npm run dev

<h4>for Front-End </h4>
cd ../Front-End <br>
npm run dev

<h4>for Admin </h4>
cd ../Admin  <br>
npm run dev

<h3>Note :</h3> The backend will run on npm run dev port 5173, the frontend on port 5174, and the admin panel on port 3000.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
