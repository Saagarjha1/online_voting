🗳️ Online Voter System

A simple Node.js and Express-based voting platform with voter signup/login, admin candidate management, and secure voting.

🔧 Setup

Clone the repo git clone https://github.com/Saagarjha1/online_voting

Install dependencies
npm install

Create .env file with:

PORT=3000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_secret_key

Start the servernpm start

📌 API Endpoints

👤 User

POST /user/signup – Voter/Admin signup

POST /user/login – Login (returns JWT)

GET /user/profile – Voter profile (JWT required)

PUT /user/profile/password – Update password

🗳️ Candidate

POST /candidate – Create candidate (Admin only)

GET /candidate – View all candidates

GET /candidate/vote/:id – Vote (Voter only)

GET /candidate/vote/count – View vote counts

🔐 Roles

Voter: Can vote and view profile

Admin: Can add candidates

📩 Author

Built by [Your Name]

