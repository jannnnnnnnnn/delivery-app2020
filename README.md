# Neighbourhood Grocery Delivery

---

[_Link to Neighbourhood Grocery Delivery APP_](https://delivery-app2020.herokuapp.com)

## Description

Neighbourhood Grocery Delivery is a web application that matches Shoppers and Drivers to make grocery ordering and delivery work seamlessly on a local level.

A **"Shopper"** can add grocery items from their favourite local store to their shopping cart and get them delivered to their doorstep depending on the Shopper's availability.

A **"Driver"** gets orders assigned to them based on their availability. The diver can also update the order's delivery status, which would be reflected in the Shopper's orders view.

**API challenges**: This APP currently uses an open-source API to display products. Since this API does not respond with a price, \$10 is assigned to all products for demonstration purposes. For deployment implementation, the app should include API from real grocery stores.

**Delivery assignments**: This APP assigns orders to Drivers by comparing Shopper's delivery availabilities (at least two days from today, starting from the closest ones) with all the Driver's delivery availability and assign orders.

**Important for testing**Please choose Sep 1, 2021, as one of the Shopper's delivery availabilities for testing.

## Technologies Used

- HTML
- CSS
- Materialize
- JavaScript
- jQuery
- MongoDB
- Mongoose
- Node.js
- Express
- OAuth
- JSON
- RESTful API

## Project Development

To provide insight of how the application was developed, the following sections are covered:

1. [Project Requirements](#requirements)
2. [User stories](#stories)
3. [Wireframes](#wireframes)
4. [Entity Relationship Diagram](#erd)

**_1. Project Requirements_** <a name="requirements"></a>

- Technology: Node / Express / MongoDB
- Have data entities (embedded and referenced)
- CRUD Application
- Be deployed online
- Project length: 4 Days

**_2. User stories_** <a name="stories"></a>

![Trello Diagram](https://i.imgur.com/AKaV4tY.png)

**_3. Wireframes_** <a name="wireframes"></a>

![Inital Loading Wireframe](https://i.imgur.com/9QhWRYH.png)
![Account Info Wireframe](https://i.imgur.com/OYERRvu.png)
![Shopping Cart Wireframe](https://i.imgur.com/60l9tv2.png)
![My Orders Wireframe](https://i.imgur.com/kMpHD9L.png)
![Delivery Availability Wireframe](https://i.imgur.com/CTcaqXV.png)

**_3. Entity Relationship Diagram (ERD)_** <a name="erd"></a>

![ERD Diagram](https://i.imgur.com/1l19PkH.png)

## Screen shots of the game

> **_Inital Loading Page_**

![Inital Loading Screen](https://i.imgur.com/9eHIt5U.jpg)

![Products Screen](https://i.imgur.com/uijTgnd.png)

> **_Account - Profile Page_**

![Account - Profile Screen](https://i.imgur.com/s00fPNg.png)

> **_Account - Shopping Cart Page_**

![Account - Shopping Cart Screen](https://i.imgur.com/9UGRmZn.png)

> **_Account - My Orders Page_**

![Account - My Orders Screen](https://i.imgur.com/NtVphmR.jpg)

> **_Account - My Delivery Slots_**

![Account - Delivery Slots Screen](https://i.imgur.com/TDMW3KB.png)

## Future Enhancements

- Obtain API from groery stores. There are currently no open APIs from any grocery stores in Canada.
- Add option to change currency (US / CAD) based on IP location or manual selection.
- Provide option to easily convert user's google or personal shopping list to shopping cart.
