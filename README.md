# Node.js/Express.js ATI2 Project
Node.js/Express.js Rest API.
Random user data with pagination.  

1. Clone repo

2. Run <code>npm install</code>

3. Run <code>npm start</code>


Routes to use:

- GET /

- POST /users/:num, @num = Number of users to create
 
 Example: <code>POST /users/5</code>

- GET /users,

   Params => 

    {



     key: "num",

     value: number of users to show, 
    
                      
          


     key: "page",
                           
     value: number of page to check


           


     key: "gender",

     value: gender of users (masculine / femenine)

    }

 Example: <code>GET /users?num=4&page=1&gender=femenine</code>

