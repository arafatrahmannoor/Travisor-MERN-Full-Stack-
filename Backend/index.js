const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { connectDB } = require('./config/db');
const { seedAdmin } = require('./utils/seedAdmin');

const authRoutes = require('./routes/auth');
const requestRoutes = require('./routes/requests');
const adminRoutes = require('./routes/admin');
const purchaseRoutes = require('./routes/purchases');
const dashboardRoutes = require('./routes/dashboard');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
app.use(cors({ origin: (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(','), credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/', (req, res) => res.json({ ok: true, status: 'running' }));

const { authRequired } = require('./middlewares/auth');
app.use('/auth', authRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/dashboard', dashboardRoutes);


const allowed = (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',');
app.use(cors({
    origin: (origin, cb) => (!origin || allowed.includes(origin) ? cb(null, true) : cb(new Error('Not allowed by CORS'))),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


const userRouter = require('./routes/userRouter');
app.use('/api/users', authRequired, userRouter);
const PORT = process.env.PORT || 5000;

(async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await seedAdmin();
        app.listen(PORT, () => console.log(`🚀 API running at http://localhost:${PORT}`));
    } catch (err) {
        console.error("❌ Server start failed:", err.message);
        process.exit(1);
    }
})();
