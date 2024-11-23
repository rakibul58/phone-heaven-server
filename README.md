# Mobile Heaven

Backend API for the Mobile Heaven used phone marketplace. Built with Node.js, Express, and MongoDB.

## Features

- 🔐 JWT Authentication
- 📦 MongoDB Database Integration
- 💳 Stripe Payment Processing
- 🔒 Secure Route Protection
- 📱 Complete Phone Management
- 👥 User Role Management
- 📊 Category Management
- 💰 Payment Processing

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT)
- Stripe API
- CORS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas Account
- Stripe Account

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/phone-heaven-server.git
cd phone-heaven-server
```

2. Install dependencies
```bash
npm install
```

3. Environment Variables

Create a `.env` file in the root directory:
```env
DB_USER=
DB_PASS=
ACCESS_TOKEN=
STRIPE_SECRET_KEY=
```

4. Start the server
```bash
# Development
npm run start-dev

# Production
npm start
```

## API Endpoints

### Authentication
```
GET /jwt
- Generate JWT token
- Query params: email

POST /users
- Create new user
- Body: { name, email, role }

GET /users
- Get user details
- Protected route
- Query params: email
```

### Categories
```
GET /categories
- Get all categories

GET /categories/:id
- Get specific category
```

### Products/Phones
```
GET /phones
- Get all phones
- Protected route
- Query params: email

POST /phones
- Add new phone
- Protected route
- Body: { title, description, price, ... }

GET /phones/:id
- Get phones by category

PUT /phones/:id
- Update phone (advertise)
- Protected route

DELETE /phones/:id
- Delete phone
- Protected route
```

### Bookings
```
GET /bookings
- Get user bookings
- Protected route
- Query params: email

POST /bookings/:id
- Create booking
- Protected route
- Body: { customerName, email, phone, ... }

GET /bookings/:id
- Get specific booking
```

### Payments
```
POST /create-payment-intent
- Create Stripe payment intent
- Body: { price }

POST /payments
- Process payment
- Body: { bookingId, transactionId, ... }
```

### User Management
```
GET /buyers
- Get all buyers
- Protected route (Admin)

GET /sellers
- Get all sellers
- Protected route (Admin)

PUT /sellers/:id
- Verify seller
- Protected route (Admin)

DELETE /sellers/:id
- Delete seller
- Protected route (Admin)
```

## Available Scripts

```bash
# Start production server
npm start

# Start development server with nodemon
npm run start-dev

# Run tests
npm test
```

## Deployment

The server can be deployed on platforms like Vercel, Heroku, or DigitalOcean:

1. Configure environment variables on the platform
2. Set up MongoDB Atlas connection
3. Configure start command: `npm start`
4. Deploy!

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Related Projects

- [Mobile Heaven Client](https://github.com/rakibul58/phone-heaven-client) - Frontend repository

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
