const express = require('express');
const cors = require('cors')
const connectDB = require('./config/database');
const authRoutes = require('./api/v1/routes/auth.routes');
const kycRoutes = require('./api/v1/routes/kyc.route');
const adminRoutes = require('./api/v1/routes/admin.route');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/kyc', kycRoutes);
app.use('/api/v1/admin', adminRoutes);

connectDB()
    .then(() => {
        console.log(`Database connected successfully`);
    })
    .catch((err) => {
        console.error(`Failed to connect to database:`, err);
    });


app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });