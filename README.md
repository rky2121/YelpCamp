# YelpCamp

YelpCamp is a campground listing web application built with Node.js, Express, MongoDB, and EJS.  
Users can explore, create, and review campgrounds with interactive Mapbox maps.

---

## Features

- Interactive maps using Mapbox  
- Full CRUD operations for campgrounds and reviews  
- User authentication and authorization with Passport.js  
- Image uploads via Cloudinary  
- Responsive design with Bootstrap 5  
- Security best practices using Helmet, sanitization, and Mongo session store

---

## Tech Stack

**Frontend:** EJS, Bootstrap 5, JavaScript  
**Backend:** Node.js, Express.js, Passport.js  
**Database:** MongoDB (local or Atlas)  
**Cloud Services:** Cloudinary, Mapbox  
**Security:** Helmet, express-mongo-sanitize, Connect-Mongo  

---

## Installation & Setup

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/<your-username>/YelpCamp.git
   cd YelpCamp
   npm install
   ```

2. Create a `.env` file in the project root:

   ```bash
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_KEY=your_api_key
   CLOUDINARY_SECRET=your_api_secret
   MAPBOX_TOKEN=your_mapbox_client_token
   DB_URL=mongodb://localhost:27017/yelp-camp
   SECRET=your_session_secret
   ```

3. (Optional) Seed the database with sample data. Make sure MongoDB is running locally, then run:

   ```bash
   node seeds/index.js
   ```

   This populates the database with 200 sample campgrounds.

4. Start the server:

   ```bash
   node app.js
   ```

5. Visit the application in your browser at:

   ```
   http://localhost:3000
   ```

---

## Project Notes

- The seeding script (`seeds/index.js`) generates random campground data using sample cities and descriptors.  
- The app uses a restricted server token for database and image operations, and a public client token for Mapbox maps.  
- Session data is stored securely using MongoDB.  


