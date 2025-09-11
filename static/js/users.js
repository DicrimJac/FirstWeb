
const LS_KEYS = {
    USERS: "APP_USERS",
    CURRENT_USER: "APP_CURRENT_USER"
};

const ALLOWED_DOMAINS_RE = /@(?:duocuc\.cl|duoc\.cl|gmail\.com)$/i;
const AUTO_LOGIN_AFTER_REGISTER = true;

// Declaracion de usuarios
const seedUsers = [
    { name: "Admin", email: "admin@gmail.com", pass: "123456", role: "admin" },
    { name: "Usuario", email: "user@duoc.cl", pass: "123456", role: "user" }
];

// se inicializan los usuarios
function loadUsers() {
    const raw = localStorage.getItem(LS_KEYS.USERS);
    if (!raw) localStorage.setItem(LS_KEYS.USERS, JSON.stringify(seedUsers));
}

// Leer usuarios
function getUsers() {
    try { return JSON.parse(localStorage.getItem(LS_KEYS.USERS)) || []; }
    catch { return []; }
}

// Guardar usuarios
function saveUsers(users) {
    localStorage.setItem(LS_KEYS.USERS, JSON.stringify(users));
}

// Validar dominio de email
function emailDomainOk(email) {
    return ALLOWED_DOMAINS_RE.test((email || "").trim());
}

// Buscar usuario por email
function findUserByEmail(email) {
    return getUsers().find(u => u.email.toLowerCase() === (email || "").toLowerCase().trim());
}

// Establecer sesión
function setSession(user) {
    localStorage.setItem(LS_KEYS.CURRENT_USER, JSON.stringify({
        name: user.name,
        email: user.email,
        role: user.role
    }));
}

//  Registro de usuario 
function registerUser({ name, email, pass }) {
    if (!name?.trim() || !email?.trim() || !pass?.trim()) {
        return { ok: false, code: "missing_fields", message: "Todos los campos son obligatorios." };
    }
    if (!emailDomainOk(email)) {
        return { ok: false, code: "bad_domain", message: "Dominio no permitido. Usa @duocuc.cl, @duoc.cl o @gmail.com." };
    }
    if (findUserByEmail(email)) {
        return { ok: false, code: "already_exists", message: "El correo ya está registrado." };
    }
    const users = getUsers();
    const newUser = { name: name.trim(), email: email.trim(), pass: pass.trim(), role: "user" };
    users.push(newUser);
    saveUsers(users);
    if (AUTO_LOGIN_AFTER_REGISTER) setSession(newUser);
    return { ok: true, code: "registered_and_logged_in", user: newUser };
}

//  Login de usuario 
function loginUser(email, pass) {
    if (!email?.trim() || !pass?.trim()) {
        return { ok: false, code: "missing_fields", message: "Correo y contraseña son obligatorios." };
    }
    if (!emailDomainOk(email)) {
        return { ok: false, code: "bad_domain", message: "Dominio no permitido." };
    }
    const user = findUserByEmail(email);
    if (!user) return { ok: false, code: "not_found", message: "Este correo no está registrado." };
    if (user.pass !== pass) return { ok: false, code: "bad_credentials", message: "Usuario o contraseña incorrectos." };
    setSession(user);
    return { ok: true, code: "logged_in", user };
}

//  Eliminar usuario - SIN UTILIDAD TODAVIA
function deleteUser(email) {
    let users = getUsers();
    users = users.filter(u => u.email.toLowerCase() !== email.toLowerCase());
    saveUsers(users);
}

//  Obtener usuario actual  - SIN UTILIDAD TODAVIA
function getCurrentUser() {
    try { return JSON.parse(localStorage.getItem(LS_KEYS.CURRENT_USER)) || null; }
    catch { return null; }
}

//  Cerrar sesión - SIN UTILIDAD TODAVIA
function logout() {
    localStorage.removeItem(LS_KEYS.CURRENT_USER);
}

// Inicializar
loadUsers();

// Exponer funciones globalmente
window.users = {
    LS_KEYS,
    registerUser,
    loginUser,
    getCurrentUser,
    logout,
    deleteUser,
    getUsers
};
