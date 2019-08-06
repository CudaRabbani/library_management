# Library Management Systems

### Project Descriptions:
I am creating **RESTful API** using **Node.js**. This API will help people for renting books from a private library. For storing data **MongoDB** is used.
#### Library Used:
- [x] **Express**: for creating Server and routing the api endpoints
- [x] **Mongoose**: for MongoDB
- [x] **Lodash**: for array manipulation
- [x] **Joi**: for input data validation
- [x] **Joi-objectid** : objectId validation for mMongoDB

## Models
- [x] Book: Contains the Book information such as: Title, Pages, Authors, Category of the Book
- [x] Author: The information for the author is also stored in the Database. Author name, date of birth, sex, language, country is stored.
- [x] Category: Each book falls under a category.
- [x] UserInfo: This model deals with the basic info like name, address, age, sex of the users
- [x] Users: This model deals with the type of user: admin, customer. This holds all the user authentication information.
- [ ] The following Model is under construction:
    - [ ] BookStatus: this should hold the information for available books. i.e: number of stock in hand, current rental rate, the books purchase cost which is not public.
    - [ ] Rental: This table deals with all the rental information such as: which book is booked by whom, when is the return date, when it was rented.
    - [ ] RentalReturns: This table deals with all the return books from the users. If there was delayed return, book retuned condition will be handled by this table

