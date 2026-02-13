const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'resume.json');

/**
 * Read resume data from JSON file
 */
const readData = () => {
    try {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(raw);
    } catch (err) {
        console.error('Error reading data file:', err.message);
        return {};
    }
};

/**
 * Write resume data to JSON file
 */
const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
        return true;
    } catch (err) {
        console.error('Error writing data file:', err.message);
        return false;
    }
};

// ──────────── Home Controller ────────────

exports.getHomePage = (req, res, next) => {
    try {
        const data = readData();
        res.render('index', { ...data, title: `${data.name || 'My'} Resume` });
    } catch (err) {
        next(err);
    }
};

exports.getSkillsPage = (req, res, next) => {
    try {
        const data = readData();
        res.render('skills', { ...data, title: 'My Skills - ' + (data.name || 'Resume') });
    } catch (err) {
        next(err);
    }
};

exports.addSkill = (req, res, next) => {
    try {
        const data = readData();
        const { skillName } = req.body;

        if (!skillName || !skillName.trim()) {
            return res.redirect('/skills');
        }

        const newSkill = skillName.trim();

        // Add if not already present
        if (!data.skills) {
            data.skills = [];
        }

        if (!data.skills.includes(newSkill)) {
            data.skills.push(newSkill);
            writeData(data);
        }

        res.redirect('/skills');
    } catch (err) {
        next(err);
    }
};

exports.getProjectsPage = (req, res, next) => {
    try {
        const data = readData();
        res.render('projects', { ...data, title: 'My Projects - ' + (data.name || 'Resume') });
    } catch (err) {
        next(err);
    }
};

exports.getAddressPage = (req, res, next) => {
    try {
        const data = readData();
        res.render('address', { ...data, title: 'Contact Address - ' + (data.name || 'Resume') });
    } catch (err) {
        next(err);
    }
};

exports.getExperiencePage = (req, res, next) => {
    try {
        const data = readData();
        res.render('experience', { ...data, title: 'Experience - ' + (data.name || 'Resume') });
    } catch (err) {
        next(err);
    }
};

exports.addExperiencePublic = (req, res, next) => {
    try {
        const data = readData();
        const { role, company, duration, description } = req.body;

        if (!role || !company || !duration) {
            return res.redirect('/experience');
        }

        const newExperience = {
            id: Date.now().toString(),
            role: role.trim(),
            company: company.trim(),
            duration: duration.trim(),
            description: description ? description.trim() : '',
        };

        data.experience = data.experience || [];
        data.experience.push(newExperience);
        writeData(data);

        res.redirect('/experience');
    } catch (err) {
        next(err);
    }
};

exports.deleteExperiencePublic = (req, res, next) => {
    try {
        const data = readData();
        const { id } = req.params;
        data.experience = (data.experience || []).filter((e) => e.id !== id);
        writeData(data);
        res.redirect('/experience');
    } catch (err) {
        next(err);
    }
};

// ──────────── Admin Controller ────────────

exports.getAdminDashboard = (req, res, next) => {
    try {
        const data = readData();
        const success = req.query.success || null;
        const error = req.query.error || null;
        res.render('admin', { ...data, title: 'Admin Dashboard', success, error });
    } catch (err) {
        next(err);
    }
};

exports.addProject = (req, res, next) => {
    try {
        const data = readData();
        const { title, description, technologies, link } = req.body;

        if (!title || !description) {
            return res.redirect('/admin?error=Project title and description are required.');
        }

        const newProject = {
            id: Date.now().toString(),
            title: title.trim(),
            description: description.trim(),
            technologies: technologies
                ? technologies.split(',').map((t) => t.trim()).filter(Boolean)
                : [],
            link: link ? link.trim() : '',
        };

        data.projects = data.projects || [];
        data.projects.push(newProject);
        writeData(data);

        res.redirect('/admin?success=Project added successfully!');
    } catch (err) {
        next(err);
    }
};

exports.deleteProject = (req, res, next) => {
    try {
        const data = readData();
        const { id } = req.params;
        data.projects = (data.projects || []).filter((p) => p.id !== id);
        writeData(data);
        res.redirect('/admin?success=Project deleted successfully!');
    } catch (err) {
        next(err);
    }
};

exports.updateSkills = (req, res, next) => {
    try {
        const data = readData();
        const { skills } = req.body;

        data.skills = skills
            ? skills.split(',').map((s) => s.trim()).filter(Boolean)
            : [];

        writeData(data);
        res.redirect('/admin?success=Skills updated successfully!');
    } catch (err) {
        next(err);
    }
};

exports.updateSummary = (req, res, next) => {
    try {
        const data = readData();
        const { summary } = req.body;

        if (!summary || !summary.trim()) {
            return res.redirect('/admin?error=Summary cannot be empty.');
        }

        data.summary = summary.trim();
        writeData(data);
        res.redirect('/admin?success=Summary updated successfully!');
    } catch (err) {
        next(err);
    }
};

exports.updateProfile = (req, res, next) => {
    try {
        const data = readData();
        const { name, title: jobTitle, email, phone, location, linkedin, github } = req.body;

        if (name) data.name = name.trim();
        if (jobTitle) data.title = jobTitle.trim();
        if (email) data.email = email.trim();
        if (phone) data.phone = phone.trim();
        if (location) data.location = location.trim();
        if (linkedin) data.linkedin = linkedin.trim();
        if (github) data.github = github.trim();

        writeData(data);
        res.redirect('/admin?success=Profile updated successfully!');
    } catch (err) {
        next(err);
    }
};

exports.addExperience = (req, res, next) => {
    try {
        const data = readData();
        const { role, company, duration, description } = req.body;

        if (!role || !company || !duration) {
            return res.redirect('/admin?error=Role, company, and duration are required.');
        }

        const newExperience = {
            id: Date.now().toString(),
            role: role.trim(),
            company: company.trim(),
            duration: duration.trim(),
            description: description ? description.trim() : '',
        };

        data.experience = data.experience || [];
        data.experience.push(newExperience);
        writeData(data);

        res.redirect('/admin?success=Experience added successfully!');
    } catch (err) {
        next(err);
    }
};

exports.deleteExperience = (req, res, next) => {
    try {
        const data = readData();
        const { id } = req.params;
        data.experience = (data.experience || []).filter((e) => e.id !== id);
        writeData(data);
        res.redirect('/admin?success=Experience deleted successfully!');
    } catch (err) {
        next(err);
    }
};

// ──────────── API Controller ────────────

exports.apiGetResume = (req, res) => {
    const data = readData();
    res.json({ success: true, data });
};

exports.apiUpdateResume = (req, res) => {
    const data = readData();
    const updates = req.body;
    const merged = { ...data, ...updates };
    const result = writeData(merged);
    res.json({ success: result, data: merged });
};
