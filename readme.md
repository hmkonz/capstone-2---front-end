# Just Real Food Capstone Project

#### Deployed at:  [Just Real Food](https://capstone-2-frontend-tqq5.onrender.com "The best site for dog and cat food")

## About <br>
"Just Real Food" is a website that allows visitors to the site to browse through all available dog and cat food products and see the details of specific products (i.e. price, ingredients, guaranteed analysis and calorie count). 

Visitors can create a customer account, which gives them the ability to add products to their cart, increase/decrease the quantities of items in the cart and/or remove products from the cart altogether. When ready to checkout, the customer is directed to a Stripe checkout page where they enter their credit card and shipping and billing information and confirm their intent to purchase. Stripe will then process the payment and a confirmation of purchase is shown in the browser. Customers can also cancel their purchase and a confirmation of their cancelled purchase is shown in the browser.
<br>

## Website Features <br>
**APIs**
<br>
* JustRealFoodApi, created by myself. All products and their details were added to a seed file in the backend and all necessary api routes were added to the frontend. <br>
* Stripe API for payment processing

## User Flow<br>
* Visitors to the site can browse the products and product details but need to have an account to make a purchase.
* Customers create an account. Passwords are hashed via bcrypt in the Back End.
* Customers submit requests to one of the various JustRealFoodApi endpoints to receive relevant product choices to select from.
* When one of those products is clicked on, the customer can see the details about that product (i.e. price, ingredients, guaranteed analysis and calorie count). The customer can add that product to their cart or return to browsing other products. Customers can add as many products as they want to their cart.
* When the customer adds a product to their cart, they can increase or decrease the quantity or remove the product altogether if they change their mind. Before checking out, if the customer wants to go back and change any of the product quantities, they can go back to that specific product detail and make the adjustments.
* When the customer has added all the products to their cart that they wish to purchase, they can click on the cart icon in the navigation bar. The cart modal shows each product name, its quantity, subtotal and at the bottom, the total price and a Proceed to Checkout button. The customer can remove any of the products before proceeding to checkout. If the customer wants to remove all products from the cart or when there are no items in the cart, a message will show that says there are no items in their shopping cart.
* Once the customer is satisfied with what is in their cart, they can click on the Proceed to Checkout button where they will then be redirected to the Stripe checkout page to process their payment.
* Once on the Stripe checkout page, the customer is prompted to enter their credit card, shipping and billing information along with their email address and phone number. Then they confirm their intent to purchase. Stripe will then process the payment and a confirmation of purchase is shown in the browser. Customers can also cancel their purchase and a confirmation of their cancelled purchase is shown in the browser.

## Api Endpoints <br>
* **All Products Page** <br>
When navigating to the 'All Products' page, customers/visitors are shown images of 9 different products of dog and cat foods that they can then click on to retrieve product details (i.e. price, ingredients, guaranteed analysis and calorie count). This list of all products is retrieved from the 'api/products' endpoint of the JustRealFoodApi. <br>

* **Dog Food and Cat Food Pages** <br>
When navigating to the Dog Food and Cat Food pages, customers/visitors are shown images of 6 dog food products or 3 cat food products, depending on which category is selected. Visitors/customers can click on any of those products to retrieve product details (i.e. price, ingredients, guaranteed analysis and calorie count). These categories of food products are retrieved from the 'api/products/category/DogFood' or 'api/products/category/CatFood' endpoints of the JustRealFoodApi. <br>

* **Specific Product Detail Page** <br>
When a non-logged-in visitor to the site clicks on a product shown in the All Products, Dog Food or Cat Food pages, the visitor can see the product details (i.e. price, ingredients, guaranteed analysis and calorie count), but they do not have the option to add it to a cart. <br><br>
When a logged in customer clicks on a product shown on the All Products, Dog Food or Cat Food pages, the customer can add that product to the cart, increase/decrease its quantity or remove it from the cart. The customer can continue shopping and select another product and add that to the cart. The details of a specific product are retrieved from the 'api/products/name/:name' endpoint of the JustRealFoodApi. <br>

* **Signup/Login Pages** <br>
Customers sign up and log in with email and password. Password is hashed using Bcrypt in the Back End. Only logged in customers are able to add items to the cart and checkout with Stripe. The Signup page is retrieved from the 'api/auth/user/register' endpoint and the Login page is retrieved from the 'api/auth/user/token' endpoint of the JustRealFoodApi.<br>

* **Checkout with Stripe** <br>
When the Proceed to Checkout button is clicked in the cart modal , the customer is redirected to Stripe to complete the payment process. The customer can either cancel their payment transaction or continue by inputting their email address, phone number, credit card information and shipping and billing addresses. The Stripe checkout page is retrieved from the 'api/stripe/checkout' endpoint of the StripeApi.<br>


## How to Run This Application

To clone and run this application, you'll need Git, ReactJs and npm installed on your computer. From your command line:

* Clone this repository <br>
$ git clone https://github.com/hmkonz/capstone-2---front-end.git

* Go into the repository <br>
$ cd capstone-2---front-end

* Install dependencies <br>
$ npm install

* Run the app at server http://localhost:3000 <br>
$ npm start

* To Complete the payment in the Stripe payment checkout page <br>
  Since the Stripe API is being used in the developer/test mode, the credit card information to use is 4242 4242 4242 42424 exp 12/34 ccv 123 <br>

## Front End Tech Stack <br>
JavaScript, ReactJS, React Router, CSS, react-stripe-checkout <br>
