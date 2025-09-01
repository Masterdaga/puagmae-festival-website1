# PUAGMAE Festival Backend

A complete backend solution for the PUAGMAE Festival website with MongoDB database and Nodemailer email functionality.

## 🚀 Features

- **MongoDB Database**: Store subscribers with proper validation
- **Nodemailer Integration**: Send welcome emails and newsletters
- **RESTful API**: Complete CRUD operations for subscribers
- **Email Templates**: Beautiful HTML email templates
- **Admin Dashboard**: Manage subscribers and send newsletters
- **Statistics**: Track subscriber growth and engagement

## 📋 Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** (local or MongoDB Atlas)
3. **Gmail Account** (for sending emails)

## 🛠️ Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the backend directory:

```bash
# Server Configuration
PORT=5000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/puagmae-festival
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/puagmae-festival

# Email Configuration (Gmail)
EMAIL_USER=puagmaef@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=puagmaef@gmail.com

# Website URL
WEBSITE_URL=http://localhost:3000

# JWT Secret (for future admin authentication)
JWT_SECRET=your-super-secret-jwt-key-here
```

### 3. Set Up Gmail App Password

1. **Enable 2-Step Verification** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password in `EMAIL_PASS`

### 4. Set Up MongoDB

#### Option A: Local MongoDB

```bash
# Install MongoDB locally
# Then start the service
mongod
```

#### Option B: MongoDB Atlas (Recommended)

1. Create account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster
3. Get your connection string
4. Replace `MONGODB_URI` in `.env`

## 🚀 Running the Backend

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:5000`

## 📧 API Endpoints

### Newsletter Management

| Method | Endpoint                          | Description                        |
| ------ | --------------------------------- | ---------------------------------- |
| `POST` | `/api/newsletter/subscribe`       | Subscribe to newsletter            |
| `POST` | `/api/newsletter/unsubscribe`     | Unsubscribe from newsletter        |
| `GET`  | `/api/newsletter/subscribers`     | Get all subscribers                |
| `POST` | `/api/newsletter/send-newsletter` | Send newsletter to all subscribers |
| `GET`  | `/api/newsletter/stats`           | Get subscriber statistics          |

### Health Check

| Method | Endpoint  | Description          |
| ------ | --------- | -------------------- |
| `GET`  | `/health` | Server health status |

## 📊 Database Schema

### Subscriber Model

```javascript
{
  email: String (required, unique, lowercase),
  subscribedAt: Date (default: now),
  isActive: Boolean (default: true),
  lastEmailSent: Date,
  source: String (default: 'website'),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Email Templates

The system includes beautiful HTML email templates:

1. **Welcome Email**: Sent to new subscribers
2. **Newsletter Template**: For sending newsletters
3. **Admin Notification**: Notifies admin of new subscribers

## 🔧 Configuration

### Email Settings

- **Service**: Gmail
- **Authentication**: App Password
- **Templates**: Customizable HTML templates

### Database Settings

- **Database**: MongoDB
- **Connection**: Local or Atlas
- **Indexes**: Optimized for email queries

## 🛡️ Security Features

- **Email Validation**: Proper email format checking
- **Duplicate Prevention**: Prevents multiple subscriptions
- **Soft Deletes**: Subscribers marked inactive instead of deleted
- **Error Handling**: Comprehensive error management

## 📈 Monitoring

### Health Check

```bash
curl http://localhost:5000/health
```

### Statistics

```bash
curl http://localhost:5000/api/newsletter/stats
```

## 🔄 Frontend Integration

The frontend has been updated to use these API endpoints:

- **Footer**: Subscribe/unsubscribe functionality
- **Admin Page**: Complete subscriber management
- **Real-time Updates**: Live subscriber count and management

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify connection string in `.env`

2. **Email Sending Failed**
   - Verify Gmail app password
   - Check 2-step verification is enabled
   - Ensure `EMAIL_USER` and `EMAIL_PASS` are correct

3. **CORS Errors**
   - Backend includes CORS middleware
   - Frontend should connect to `http://localhost:5000`

### Debug Mode

```bash
# Enable debug logging
DEBUG=* npm run dev
```

## 📝 Environment Variables

| Variable      | Description               | Default                                      |
| ------------- | ------------------------- | -------------------------------------------- |
| `PORT`        | Server port               | `5000`                                       |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/puagmae-festival` |
| `EMAIL_USER`  | Gmail account             | `puagmaef@gmail.com`                         |
| `EMAIL_PASS`  | Gmail app password        | `your-app-password`                          |
| `ADMIN_EMAIL` | Admin notification email  | `puagmaef@gmail.com`                         |
| `WEBSITE_URL` | Frontend URL              | `http://localhost:3000`                      |
| `JWT_SECRET`  | JWT secret key            | `your-super-secret-jwt-key-here`             |

## 🎯 Next Steps

1. **Set up MongoDB** (local or Atlas)
2. **Configure Gmail** with app password
3. **Create `.env`** file with your settings
4. **Start the backend** with `npm run dev`
5. **Test the API** endpoints
6. **Update frontend** to use the new backend

## 📞 Support

For issues or questions:

- Check the troubleshooting section
- Verify all environment variables
- Ensure MongoDB and Gmail are properly configured
