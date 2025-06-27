
Online Voting System Readme
🗳️ Online Voting System
A secure and scalable Online Voting System built with Node.js, Express.js, and MongoDB. The platform allows authenticated users to vote in elections while maintaining data integrity and enforcing strict role-based access control.

🚀 Features
✅ User Authentication – Secure login/signup with JWT tokens

👥 Role-Based Access Control – Admin, Voter, and Election Manager roles

🗂️ Election & Candidate Management – Admin can create/manage elections and candidates

📩 Voting Mechanism – Users can vote only once per election with full audit logging

🧪 API Testing with Postman – 15+ endpoints tested to ensure robust behavior

🛡️ Data Validation – Input validation and MongoDB schema enforcement

🛠️ Tech Stack
Technology	Description
Node.js	JavaScript runtime
Express.js	Web framework
MongoDB	NoSQL database
Mongoose	ODM for MongoDB
JWT	Authentication
Postman	API testing tool
📁 Project Structure
.
├── models/
    ├── Candidate.js
    ├── User.js
├── routes/
    ├── candidateRoutes.js
    ├── .userRoutes.js
├── .env
├── .db.js
├── jwt.js
├── .env
├── server.js
└── README.md
🔐 User Roles
Admin: Create/manage elections and users

Voter: Can vote in active elections

Manager: Monitor voting and access limited admin features

🔄 API Endpoints
Method	Endpoint	Role	Description
POST	/api/register	Public	User registration
POST	/api/login	Public	User login
GET	/api/elections	All users	View active elections
POST	/api/vote	Voter	Submit vote
POST	/api/elections	Admin	Create election
POST	/api/candidates	Admin	Add candidate
✅ More endpoints are available in Postman collection.

🔧 Setup Instructions
Clone the repository

git clone https://github.com/yourusername/online-voting-system.git
cd online-voting-system
Install dependencies

npm install
Create a `` file

PORT=5000
MONGODB_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
Run the server

npm start
📬 API Testing
Use Postman to test all endpoints. A complete Postman collection is available in the /postman folder.

🧠 Learnings
Built stateless JWT authentication from scratch

Applied strict access control with Express middleware

Ensured one-vote-per-user logic and MongoDB constraints

Developed RESTful APIs with clear status codes and responses

📌 Future Enhancements
Frontend integration with React or Vue

Admin dashboard with real-time election analytics

Blockchain integration for vote immutability

Email-based OTP for secure voter verification

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.
