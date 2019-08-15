# Library Management Systems

### Project Descriptions:
I am creating **RESTful API** using **Node.js**. This API will help people for renting books from a private library. For storing data **MongoDB** is used.
#### Library Used:
- [x] **Express**: for creating Server and routing the api endpoints
- [x] **Mongoose**: for MongoDB
- [x] **Lodash**: for array manipulation
- [x] **Joi**: for input data validation
- [x] **Joi-objectid** : objectId validation for mMongoDB
- [x] **Fawn**: For committing multiple transaction at once, failure in one will roll back the full transactions. 

## API Endpoints
#### Author:
- [x] GET: /api/author
- [x] GET: /api/author/{id}
- [x] POST: /api/author
- [x] PUT: /api/author/{id}
- [x] DELETE: /api/author/{id}

#### Book Category:
- [x] GET: /api/category
- [x] GET: /api/category/{id}
- [x] POST: /api/category
- [x] PUT: /api/category/{id}
- [x] DELETE: /api/category/{id}

#### Book:
- [x] GET: /api/book
- [x] GET: /api/book/{id}
- [x] POST: /api/book
- [x] PUT: /api/book/{id}
- [x] DELETE: /api/book/{id}

#### Book Inventory:
- [x] GET: /api/bookstatus
- [x] GET: /api/bookstatus/{id}
- [x] POST: /api/bookstatus
- [x] PUT: /api/bookstatus/{id}
- [x] DELETE: /api/bookstatus/{id}

#### User:
- [x] GET: /api/user
- [x] GET: /api/user/{id}
- [x] POST: /api/user
- [x] PUT: /api/user/{id}
- [x] DELETE: /api/user/{id}

#### User Info:
- [x] GET: /api/userinfo
- [x] GET: /api/userinfo/{id}
- [x] POST: /api/userinfo
- [x] PUT: /api/userinfo/{id}
- [x] DELETE: /api/userinfo/{id}

#### Rentals:
- [x] GET: /api/rentals
- [x] GET: /api/rentals/{id}
- [x] POST: /api/rentals
- [x] PUT: /api/rentals/{id}
- [x] DELETE: /api/rentals/{id}

 - - - - -


## Models
- [x] Book: Contains the Book information such as: Title, Pages, Authors, Category of the Book
- [x] Author: The information for the author is also stored in the Database. Author name, date of birth, sex, language, country is stored.
- [x] Category: Each book falls under a category.
- [x] UserInfo: This model deals with the basic info like name, address, age, sex of the users
- [x] Users: This model deals with the type of user: admin, customer. This holds all the user authentication information.
- [x] BookStatus: this should hold the information for available books. i.e: number of stock in hand, current rental rate, the books purchase cost which is not public.
- [x] Rental: This table deals with all the rental information such as: which book is booked by whom, when is the return date, when it was rented.
- [ ] The following Model is under construction:
    - [ ] RentalReturns: This table deals with all the return books from the users. If there was delayed return, book retuned condition will be handled by this table

