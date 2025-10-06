# 🥢 Authentic Shandong Cuisine Delivery Platform

> *Bringing the authentic flavors of Shandong (Lu Cuisine) to America - One dish at a time*

## 🌟 Project Vision

As a native of Shandong, China, I've always been puzzled by the "Chinese food" served in America. Orange chicken, fortune cookies, and General Tso's chicken - these dishes, while popular, barely exist in China. They represent a culinary echo chamber, not the rich, diverse traditions of Chinese cuisine.

**This project is my answer to that disconnect.**

I wanted to introduce Americans to **Lu Cuisine (鲁菜)** - one of China's Eight Great Culinary Traditions and the cuisine of my homeland. Every dish on this platform is something I grew up eating but have **never seen in an American restaurant**: 

- 🍲 **Braised Sea Cucumber (红烧海参)** - A delicacy prized for centuries
- 🥟 **Authentic Jiaozi (饺子)** - Not the thick-skinned "dumplings" you find here
- 🍖 **Dezhou Braised Chicken (德州扒鸡)** - A 300-year-old recipe
- 🐟 **Sweet and Sour Carp (糖醋鲤鱼)** - The REAL sweet and sour, not neon-red sauce
- 🥬 **Stir-fried Seasonal Vegetables (时令小炒)** - Simple, fresh, essential

This isn't just a food delivery app. **It's a cultural bridge.** It's my way of sharing the stories, techniques, and soul of Shandong cooking with a new audience. Through this platform, I hope Americans can taste what I grew up with - and understand that Chinese cuisine is so much more than what they've been told.

---

## 🚀 Live Demo

- **Customer App:** [http://localhost:5173](http://localhost:5173)
- **Admin Panel:** [http://localhost:5174](http://localhost:5174)
- **Backend API:** [http://localhost:8081](http://localhost:8081)

---

## 🛠️ Tech Stack

### Backend
- **Spring Boot 3.x** - Enterprise-grade Java framework
- **Spring Security** - JWT authentication & authorization
- **MongoDB** - NoSQL database for flexible data modeling
- **AWS S3** - Cloud storage for dish images
- **PayPal SDK** - Secure payment processing
- **BCrypt** - Password encryption

### Frontend
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **Context API** - Global state management
- **Axios** - HTTP client
- **Bootstrap 5** - Responsive design
- **React Toastify** - User notifications

### DevOps & Tools
- **Vite** - Lightning-fast build tool
- **Maven** - Dependency management
- **Git/GitHub** - Version control
- **Postman** - API testing

---

## 📁 Project Structure

```
shandong-cuisine-platform/
│
├── foodiesapi/                          # Backend (Spring Boot)
│   ├── src/main/java/com/example/foodiesapi/
│   │   ├── config/
│   │   │   ├── AWSConfig.java           # AWS S3 configuration
│   │   │   └── SecurityConfig.java      # JWT & CORS setup
│   │   ├── controller/
│   │   │   ├── AuthController.java      # Login/Register endpoints
│   │   │   ├── FoodController.java      # Menu CRUD operations
│   │   │   ├── CartController.java      # Shopping cart logic
│   │   │   └── OrderController.java     # Order & payment handling
│   │   ├── entity/
│   │   │   ├── UserEntity.java          # User data model
│   │   │   ├── FoodEntity.java          # Dish data model
│   │   │   ├── CartEntity.java          # Cart data model
│   │   │   └── OrderEntity.java         # Order data model
│   │   ├── service/
│   │   │   ├── UserService.java         # User business logic
│   │   │   ├── FoodService.java         # Dish & S3 upload logic
│   │   │   ├── CartService.java         # Cart operations
│   │   │   └── OrderService.java        # PayPal integration
│   │   ├── repository/                  # MongoDB repositories
│   │   ├── filters/
│   │   │   └── JwtAuthenticationFilter.java  # JWT validation
│   │   └── util/
│   │       └── JwtUtil.java             # Token generation/validation
│   └── src/main/resources/
│       └── application.properties       # Configuration file
│
├── foodies/                             # Customer Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Menubar/                 # Navigation bar
│   │   │   ├── Header/                  # Hero section
│   │   │   ├── ExploreMenu/             # Category navigation
│   │   │   ├── FoodItem/                # Dish card component
│   │   │   ├── Login/                   # Login form
│   │   │   └── Register/                # Registration form
│   │   ├── pages/
│   │   │   ├── Home/                    # Landing page
│   │   │   ├── ExploreFood/             # Browse dishes
│   │   │   ├── FoodDetails/             # Dish detail page
│   │   │   ├── Cart/                    # Shopping cart
│   │   │   ├── PlaceOrder/              # Checkout & PayPal
│   │   │   ├── MyOrders/                # Order history
│   │   │   └── Contact/                 # Contact form
│   │   ├── service/
│   │   │   ├── authService.js           # Login/Register API
│   │   │   ├── foodService.js           # Food fetching API
│   │   │   ├── cartService.js           # Cart API calls
│   │   │   └── orderService.js          # PayPal API integration
│   │   ├── pages/Contact/
│   │   │   └── StoreContext.jsx         # Global state (Context API)
│   │   └── App.jsx                      # Main app & routing
│   └── package.json
│
└── adminpanel/                          # Admin Dashboard (React)
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar/                 # Admin navigation
    │   │   └── Menubar/                 # Top bar
    │   ├── pages/
    │   │   ├── AddFood/                 # Add new dishes
    │   │   ├── ListFood/                # Manage menu
    │   │   └── Orders/                  # Manage orders
    │   └── service/
    │       ├── foodService.js           # Food management API
    │       └── orderService.js          # Order update API
    └── package.json
```

---

## ⚙️ Installation & Setup

### Prerequisites
- **Java 17+**
- **Node.js 18+**
- **MongoDB** (local or Atlas)
- **AWS Account** (for S3)
- **PayPal Developer Account**

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/shandong-cuisine-platform.git
cd shandong-cuisine-platform
```

### 2️⃣ Backend Setup

#### Configure Application Properties
Create `foodiesapi/src/main/resources/application.properties`:

```properties
# MongoDB
spring.data.mongodb.uri=mongodb://localhost:27017/foodies

# AWS S3
aws.access.key=YOUR_AWS_ACCESS_KEY
aws.secret.key=YOUR_AWS_SECRET_KEY
aws.region=us-east-1
aws.s3.bucketname=YOUR_BUCKET_NAME

# PayPal
paypal.client.id=YOUR_PAYPAL_CLIENT_ID
paypal.client.secret=YOUR_PAYPAL_SECRET

# JWT
jwt.secret.key=YOUR_SECRET_KEY_HERE_AT_LEAST_256_BITS

# Server
server.port=8081
```

#### Run Backend
```bash
cd foodiesapi
mvn clean install
mvn spring-boot:run
```

The API will be available at `http://localhost:8081`

### 3️⃣ Customer Frontend Setup

```bash
cd foodies
npm install
npm run dev
```

Access at `http://localhost:5173`

### 4️⃣ Admin Panel Setup

```bash
cd adminpanel
npm install
npm run dev
```

Access at `http://localhost:5174`

---

## 🔑 Key Features

### For Customers
- ✅ **Browse Authentic Dishes** - Explore real Shandong cuisine with descriptions
- ✅ **Smart Search & Filter** - Find dishes by category or name
- ✅ **Shopping Cart** - Persistent cart (saved to database)
- ✅ **Secure Checkout** - PayPal payment integration
- ✅ **Order Tracking** - Real-time order status updates
- ✅ **User Authentication** - JWT-based secure login

### For Admins
- ✅ **Menu Management** - Add/Edit/Delete dishes with image upload
- ✅ **Order Management** - View all orders and update delivery status
- ✅ **Cloud Storage** - Automatic image upload to AWS S3

---

## 🔒 Security Features

- **JWT Authentication** - Stateless token-based auth (10-hour expiration)
- **BCrypt Password Hashing** - Industry-standard encryption
- **CORS Protection** - Restricted origins
- **Route Guards** - Protected endpoints for authenticated users
- **XSS Prevention** - Sanitized inputs

---

## 🌐 API Endpoints

### Authentication
```
POST /api/register          # Register new user
POST /api/login             # Login & get JWT token
```

### Food Management
```
GET    /api/foods           # Get all dishes
GET    /api/foods/{id}      # Get single dish
POST   /api/foods           # Add dish (Admin, multipart/form-data)
DELETE /api/foods/{id}      # Delete dish (Admin)
```

### Shopping Cart
```
GET    /api/cart            # Get user's cart
POST   /api/cart            # Add item to cart
POST   /api/cart/remove     # Remove item from cart
DELETE /api/cart            # Clear cart
```

### Orders
```
POST  /api/orders/create    # Create PayPal order
POST  /api/orders/capture   # Capture payment
GET   /api/orders           # Get user orders
GET   /api/orders/all       # Get all orders (Admin)
PATCH /api/orders/status/{id}  # Update order status (Admin)
```

---

## 💳 PayPal Payment Flow

1. **Customer submits order** → Backend creates PayPal order
2. **Redirect to PayPal** → Customer completes payment
3. **Return to app** → Backend captures payment
4. **Success** → Order saved, cart cleared, confirmation sent

---

## 📊 Database Schema

### Users Collection
```json
{
  "_id": "ObjectId",
  "name": "Zhang Wei",
  "email": "zhang@example.com",
  "password": "$2a$10$..." 
}
```

### Foods Collection
```json
{
  "_id": "ObjectId",
  "name": "红烧海参 (Braised Sea Cucumber)",
  "description": "A traditional Shandong delicacy...",
  "price": 45.99,
  "category": "Seafood",
  "imageUrl": "https://bucket.s3.amazonaws.com/uuid.jpg"
}
```

### Carts Collection
```json
{
  "_id": "ObjectId",
  "userId": "user123",
  "items": {
    "food456": 2,
    "food789": 1
  }
}
```

### Orders Collection
```json
{
  "_id": "ObjectId",
  "userId": "user123",
  "userAddress": "123 Main St, Cleveland, OH",
  "orderedItems": [...],
  "amount": 87.50,
  "paymentStatus": "COMPLETED",
  "orderStatus": "Out for delivery"
}
```

---

## 🧪 Testing

### Backend Testing
```bash
# Run unit tests
mvn test

# API testing with Postman
# Import collection: docs/postman_collection.json
```

### Frontend Testing
```bash
# Customer app
cd foodies
npm run test

# Admin panel
cd adminpanel
npm run test
```

---

## 🚀 Deployment

### Backend (AWS EC2 / Heroku)
```bash
# Build JAR
mvn clean package

# Run production
java -jar target/foodiesapi-0.0.1-SNAPSHOT.jar
```

### Frontend (Vercel / Netlify)
```bash
# Build production bundle
npm run build

# Deploy dist/ folder
```

---

## 🤝 Contributing

This project is deeply personal to me, but I welcome contributions that align with its mission:

1. **Authentic recipes only** - No fusion dishes
2. **Cultural respect** - Proper Chinese names + translations
3. **Educational value** - Help people understand the food

Fork the repo, make your changes, and submit a PR!

---

## 📜 License

MIT License - Feel free to use this project to spread Chinese culinary culture!

---

## 🙏 Acknowledgments

- My grandmother, who taught me that food is love
- The street vendors in Jinan who inspired my passion for Lu Cuisine
- Every chef in Shandong preserving these 2,000-year-old traditions

---

## 📞 Contact

**Author:** [Your Name]  
**Email:** your.email@example.com  
**LinkedIn:** [Your Profile]  
**Portfolio:** [Your Website]

---

## 🌏 A Final Note

If you're an American reading this, I hope this platform opens your eyes to what Chinese food **really** is. It's not fried rice and egg rolls. It's centuries of technique, regional pride, and family traditions passed down through generations.

And if you're Chinese, especially from Shandong - I hope this makes you proud. Our food deserves to be known worldwide, not as a watered-down imitation, but in its full, authentic glory.

**让世界品尝真正的鲁菜。**  
*Let the world taste real Lu Cuisine.*

---

Made with ❤️ and homesickness in Cleveland, Ohio
