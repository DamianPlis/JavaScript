const express = require('express');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const USERS_FILE = path.join(__dirname, 'users.json');

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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    saveUsers(users);
    res.send('<h2>Account created! ✅</h2><a href="/">Go to login</a>');
});

// 🔐 Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();

    const user = users.find(u => u.username === username);
    if (!user) return res.send('<h2>User not found.</h2><a href="/">Try again</a>');

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        res.send(`
            <p>LOGIN SUCSESSFULL</p>
            <h1>hello ${user.username}</h1>
            <form action="/delete" method="POST">
                <input type="hidden" name="username" value="${user.username}">
                <button type="submit">Delete your account</button>
            </form>
            `);
    } else {
        res.send('<h2>Wrong password 😬</h2><a href="/">Try again</a>');
    }
});

app.post("/delete", (req, res) => {
    const { username } = req.body;
    const users = getUsers();

    // Filter out the user to delete
    const updatedUsers = users.filter(u => u.username !== username);

    // Save updated users
    saveUsers(updatedUsers);

    res.send('<h2>Account deleted successfully.</h2><a href="/">Go to login</a>');
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});