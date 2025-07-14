const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const session = require('express-session');

const app = express();
const port = 3000;
const USERS_FILE = path.join(__dirname, 'users.json');

const key = bcrypt.hash("cau cau cau", 10)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: `${key}`, // 🔒 change this!
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,     // ⛔ Prevents JS access
        secure: false,      // Set to true **only** with HTTPS
    },
}));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/signuphtml', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Load users or create empty file
if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

// 🧠 Read users from file
function getUsers() {
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
}

// 📝 Save users to file
function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// 🟢 Sign-up endpoint
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();

    // Check if user exists
    if (users.find(u => u.username === username)) {
        return res.send('<h2>User already exists.</h2><a href="/signup.html">Try again</a>');
    }

    // Hash password and secure
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    ;

    saveUsers(users);
    res.send(`<h2>Account created! ✅</h2><a href="/">Go to login</a><p>For : ${preventXSS(username, req, "s")}</p>`);
});

// 🔐 Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();
    const user = users.find(u => u.username === username);
    if (!user) return res.send('User not found. <a href="/">Try again</a>');

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.send('Wrong password. <a href="/">Try again</a>');

    // ✅ Store session
    req.session.username = user.username;

    res.send(`
    <h2>Welcome, ${preventXSS(user.username, req, "l")}!</h2>
    <p><a href="/delete">Delete your account</a></p>
    <p><a href="/logout">Logout</a></p>
  `);
});

// GET /delete - show delete confirmation form
app.get('/delete', (req, res) => {
    if (!req.session.username) return res.send('Not logged in.');
    res.send(`
    <h2>Are you sure you want to delete your account?</h2>
    <form method="POST" action="/delete">
      <input type="password" name="confirmPassword" placeholder="Confirm password" required />
      <button type="submit">Delete My Account</button>
    </form>
  `);
});

// POST /delete - delete only the logged-in user
app.post('/delete', async (req, res) => {
    const { confirmPassword } = req.body;
    const users = getUsers();
    const currentUser = users.find(u => u.username === req.session.username);
    if (!currentUser) return res.send('Not logged in.');

    const match = await bcrypt.compare(confirmPassword, currentUser.password);
    if (!match) return res.send('Password incorrect. <a href="/delete">Try again</a>');

    const updatedUsers = users.filter(u => u.username !== currentUser.username);
    saveUsers(updatedUsers);

    req.session.destroy(() => {
        res.send('Account deleted. <a href="/">Go home</a>');
    });
});

// GET /logout - end session
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.send('Logged out. <a href="/">Login again</a>');
    });
});

type Action = "l" | "s";

function preventXSS(username: string, req, action: Action): string {
    if (typeof username !== 'string') {
        console.error("Invalid username type:", typeof username);
        return "Error: Invalid username type";
    }

    if (action !== "l" && action !== "s") {
        console.error("Invalid action:", action);
        return "Error: Invalid action";
    }

    if (/&/.test(username) || /</.test(username) || />/.test(username) || /"/.test(username) || /'/.test(username) && action === "s") {
        console.warn('XSS attempt detected in username:', username, 'from IP:', req.ip);
        return sanitizeUsername(username) + ",- please stop trying to hack me!";
    } else if (/&/.test(username) || /</.test(username) || />/.test(username) || /"/.test(username) || /'/.test(username)) {
        console.warn('XSS attempt detected in username:', username, 'from IP:', req.ip);
        return sanitizeUsername(username);
    }

    return username;

    // if (action === "l") {
    //     if (/&/.test(username) || /</.test(username) || />/.test(username) || /"/.test(username) || /'/.test(username)) {
    //         console.warn('XSS attempt detected in username:', username, 'from IP:', req.ip);
    //     }
    //     return sanitizeUsername(username)
    // } else {
    //     if (/&/.test(username) || /</.test(username) || />/.test(username) || /"/.test(username) || /'/.test(username)) {
    //         console.warn('XSS attempt detected in username:', username, 'from IP:', req.ip);
    //         return sanitizeUsername(username) + ",- please stop trying to hack me!";
    //     } else {
    //         return username;
    //     }
    // }

    function sanitizeUsername(username) {
        return username
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});