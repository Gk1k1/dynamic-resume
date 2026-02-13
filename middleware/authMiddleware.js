exports.isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect('/login?error=Please log in to access this page');
};

exports.isAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    res.redirect('/?error=Unauthorized access');
};

exports.injectUser = (req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
};
