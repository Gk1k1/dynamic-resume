const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

// Import routes
const homeRoutes = require('./routes/homeRoutes');
const adminRoutes = require('./routes/adminRoutes');
const apiRoutes = require('./routes/apiRoutes');

// Import error handler
const { notFoundHandler, globalErrorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const { injectUser } = require('./middleware/authMiddleware');

// ──────────────── Middleware ────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: 'resume-secret-key-12345',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(injectUser);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// ──────────────── Routes ────────────────
app.use('/', homeRoutes);
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

// ──────────────── Error Handling ────────────────
app.use(notFoundHandler);
app.use(globalErrorHandler);

// ──────────────── Start Server ────────────────
app.listen(PORT, () => {
  console.log(`🚀 Dynamic Resume server running at http://localhost:${PORT}`);
  console.log(`📋 Admin dashboard at http://localhost:${PORT}/admin`);
});

module.exports = app;
