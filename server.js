const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');
const logger = require('morgan');
const express = require('express');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');

dotenv.config({ path: './config/config.env' });

// connect to MongoDB database
connectDB();

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`.yellow.bold);
});

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red);
	server.close(() => process.exit(1));
});
