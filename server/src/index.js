import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';
import cors from 'cors';
import express from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..', '..');
const dataDir = path.join(rootDir, 'data');
const publicDir = path.join(rootDir, 'client', 'dist');
fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, 'shoptop.sqlite'));
db.pragma('foreign_keys = ON');
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    avatar TEXT NOT NULL,
    coins INTEGER NOT NULL DEFAULT 100,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS stores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_id INTEGER NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    category TEXT NOT NULL DEFAULT 'Разное',
    neon_color TEXT NOT NULL DEFAULT '#a855f7',
    background TEXT NOT NULL DEFAULT 'atrium',
    decor TEXT NOT NULL DEFAULT 'neon,shelves',
    visitors INTEGER NOT NULL DEFAULT 0,
    followers INTEGER NOT NULL DEFAULT 0,
    rating REAL NOT NULL DEFAULT 5,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    store_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    price TEXT NOT NULL DEFAULT '',
    category TEXT NOT NULL DEFAULT 'Разное',
    description TEXT NOT NULL DEFAULT '',
    referral_url TEXT NOT NULL,
    likes INTEGER NOT NULL DEFAULT 0,
    clicks INTEGER NOT NULL DEFAULT 0,
    active_slot INTEGER,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    store_id INTEGER,
    product_id INTEGER,
    user_id INTEGER NOT NULL,
    body TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS followers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    store_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(store_id, user_id),
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS activity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    text TEXT NOT NULL,
    coins INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

const app = express();
const PORT = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json({ limit: '1mb' }));

function avatar(displayName) {
  return displayName
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'SM';
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, saved) {
  const [salt, hash] = saved.split(':');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(hashPassword(password, salt).split(':')[1], 'hex'));
}

function token() {
  return crypto.randomBytes(32).toString('hex');
}

function getUserByToken(req) {
  const raw = req.headers.authorization || '';
  const sessionToken = raw.startsWith('Bearer ') ? raw.slice(7) : '';
  if (!sessionToken) return null;
  return db
    .prepare(
      `SELECT u.* FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token = ?`
    )
    .get(sessionToken);
}

function requireUser(req, res, next) {
  const user = getUserByToken(req);
  if (!user) {
    res.status(401).json({ message: 'Нужно войти в аккаунт' });
    return;
  }
  req.user = user;
  next();
}

function publicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    username: user.username,
    displayName: user.display_name,
    avatar: user.avatar,
    coins: user.coins
  };
}

function addActivity(userId, text, coins = 0) {
  db.prepare('INSERT INTO activity (user_id, text, coins) VALUES (?, ?, ?)').run(userId, text, coins);
  db.prepare('UPDATE users SET coins = MAX(coins + ?, 0) WHERE id = ?').run(coins, userId);
}

function storeSelect(where = '') {
  return `
    SELECT
      s.*,
      u.display_name AS owner_name,
      u.username AS owner_username,
      u.avatar AS owner_avatar,
      COUNT(DISTINCT p.id) AS products_count,
      COUNT(DISTINCT CASE WHEN p.active_slot IS NOT NULL THEN p.id END) AS active_count
    FROM stores s
    JOIN users u ON u.id = s.owner_id
    LEFT JOIN products p ON p.store_id = s.id
    ${where}
    GROUP BY s.id
  `;
}

function productRows(storeId, activeOnly = false) {
  return db
    .prepare(
      `SELECT * FROM products
       WHERE store_id = ? ${activeOnly ? 'AND active_slot IS NOT NULL' : ''}
       ORDER BY active_slot IS NULL, active_slot ASC, id DESC
       ${activeOnly ? 'LIMIT 5' : 'LIMIT 100'}`
    )
    .all(storeId);
}

app.get('/api/health', (_req, res) => res.json({ ok: true, name: 'ShopTop API' }));

app.post('/api/auth/register', (req, res) => {
  const username = String(req.body.username || '').trim().toLowerCase();
  const displayName = String(req.body.displayName || '').trim();
  const password = String(req.body.password || '');
  const storeName = String(req.body.storeName || `${displayName || username} Shop`).trim();

  if (!/^[a-z0-9_]{3,24}$/.test(username)) {
    res.status(400).json({ message: 'Логин: 3-24 символа, латиница, цифры или _' });
    return;
  }
  if (displayName.length < 2 || password.length < 6 || storeName.length < 2) {
    res.status(400).json({ message: 'Заполните имя, пароль от 6 символов и название витрины' });
    return;
  }

  try {
    const tx = db.transaction(() => {
      const userId = db
        .prepare(
          `INSERT INTO users (username, display_name, password_hash, avatar)
           VALUES (?, ?, ?, ?)`
        )
        .run(username, displayName, hashPassword(password), avatar(displayName)).lastInsertRowid;

      db.prepare(
        `INSERT INTO stores (owner_id, name, description)
         VALUES (?, ?, 'Новая витрина. Автор скоро добавит описание и первые товары.')`
      ).run(userId, storeName);

      addActivity(userId, 'Создан аккаунт и первая витрина', 100);
      return userId;
    });

    const userId = tx();
    const sessionToken = token();
    db.prepare('INSERT INTO sessions (token, user_id) VALUES (?, ?)').run(sessionToken, userId);
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    res.status(201).json({ token: sessionToken, user: publicUser(user) });
  } catch (error) {
    if (String(error.message).includes('UNIQUE')) {
      res.status(409).json({ message: 'Такой логин уже занят' });
      return;
    }
    throw error;
  }
});

app.post('/api/auth/login', (req, res) => {
  const username = String(req.body.username || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user || !verifyPassword(password, user.password_hash)) {
    res.status(401).json({ message: 'Неверный логин или пароль' });
    return;
  }
  const sessionToken = token();
  db.prepare('INSERT INTO sessions (token, user_id) VALUES (?, ?)').run(sessionToken, user.id);
  res.json({ token: sessionToken, user: publicUser(user) });
});

app.get('/api/me', requireUser, (req, res) => {
  const store = db.prepare(storeSelect('WHERE s.owner_id = ?')).get(req.user.id);
  res.json({ user: publicUser(req.user), store });
});

app.get('/api/stores', (req, res) => {
  const search = String(req.query.search || '').trim();
  const params = [];
  let where = '';
  if (search) {
    where = 'WHERE s.name LIKE ? OR s.description LIKE ? OR s.category LIKE ? OR u.display_name LIKE ?';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
  }
  const stores = db.prepare(`${storeSelect(where)} ORDER BY s.created_at DESC`).all(...params);
  res.json(stores);
});

app.get('/api/stores/:id', (req, res) => {
  const store = db.prepare(storeSelect('WHERE s.id = ?')).get(req.params.id);
  if (!store) {
    res.status(404).json({ message: 'Витрина не найдена' });
    return;
  }
  db.prepare('UPDATE stores SET visitors = visitors + 1 WHERE id = ?').run(store.id);
  const comments = db
    .prepare(
      `SELECT c.*, u.display_name AS author_name, u.avatar AS author_avatar
       FROM comments c JOIN users u ON u.id = c.user_id
       WHERE c.store_id = ? AND c.product_id IS NULL
       ORDER BY c.id DESC`
    )
    .all(store.id);
  res.json({
    store: db.prepare(storeSelect('WHERE s.id = ?')).get(store.id),
    products: productRows(store.id, true),
    comments
  });
});

app.patch('/api/my/store', requireUser, (req, res) => {
  const name = String(req.body.name || '').trim();
  const description = String(req.body.description || '').trim();
  const category = String(req.body.category || '').trim();
  const neonColor = String(req.body.neonColor || '#a855f7').trim();
  if (!name || !description || !category) {
    res.status(400).json({ message: 'Заполните название, описание и категорию' });
    return;
  }
  db.prepare(
    `UPDATE stores
     SET name = ?, description = ?, category = ?, neon_color = ?
     WHERE owner_id = ?`
  ).run(name, description, category, neonColor, req.user.id);
  addActivity(req.user.id, 'Обновлена витрина', 5);
  res.json(db.prepare(storeSelect('WHERE s.owner_id = ?')).get(req.user.id));
});

app.get('/api/my/dashboard', requireUser, (req, res) => {
  const store = db.prepare(storeSelect('WHERE s.owner_id = ?')).get(req.user.id);
  const products = store ? productRows(store.id, false) : [];
  const activity = db.prepare('SELECT * FROM activity WHERE user_id = ? ORDER BY id DESC LIMIT 30').all(req.user.id);
  const clicks = products.reduce((sum, product) => sum + product.clicks, 0);
  res.json({ user: publicUser(req.user), store, products, activity, stats: { clicks, estimatedIncome: clicks * 0.18 } });
});

app.post('/api/my/products', requireUser, (req, res) => {
  const store = db.prepare('SELECT * FROM stores WHERE owner_id = ?').get(req.user.id);
  const count = db.prepare('SELECT COUNT(*) AS count FROM products WHERE store_id = ?').get(store.id).count;
  if (count >= 100) {
    res.status(400).json({ message: 'Лимит коллекции: 100 товаров' });
    return;
  }
  const name = String(req.body.name || '').trim();
  const price = String(req.body.price || '').trim();
  const category = String(req.body.category || '').trim();
  const description = String(req.body.description || '').trim();
  const referralUrl = String(req.body.referralUrl || '').trim();
  if (!name || !referralUrl) {
    res.status(400).json({ message: 'Название и реферальная ссылка обязательны' });
    return;
  }
  db.prepare(
    `INSERT INTO products (store_id, name, price, category, description, referral_url)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(store.id, name, price, category || 'Разное', description, referralUrl);
  addActivity(req.user.id, `Добавлен товар: ${name}`, 8);
  res.status(201).json(productRows(store.id, false));
});

app.patch('/api/my/products/:id/active', requireUser, (req, res) => {
  const store = db.prepare('SELECT * FROM stores WHERE owner_id = ?').get(req.user.id);
  const product = db.prepare('SELECT * FROM products WHERE id = ? AND store_id = ?').get(req.params.id, store.id);
  if (!product) {
    res.status(404).json({ message: 'Товар не найден' });
    return;
  }
  if (product.active_slot) {
    db.prepare('UPDATE products SET active_slot = NULL WHERE id = ?').run(product.id);
  } else {
    const active = db.prepare('SELECT id, active_slot FROM products WHERE store_id = ? AND active_slot IS NOT NULL ORDER BY active_slot ASC').all(store.id);
    if (active.length >= 5) db.prepare('UPDATE products SET active_slot = NULL WHERE id = ?').run(active[0].id);
    const used = new Set(db.prepare('SELECT active_slot FROM products WHERE store_id = ? AND active_slot IS NOT NULL').all(store.id).map((row) => row.active_slot));
    const slot = [1, 2, 3, 4, 5].find((item) => !used.has(item)) || 5;
    db.prepare('UPDATE products SET active_slot = ? WHERE id = ?').run(slot, product.id);
  }
  res.json(productRows(store.id, false));
});

app.post('/api/stores/:id/comments', requireUser, (req, res) => {
  const body = String(req.body.body || '').trim();
  if (body.length < 2) {
    res.status(400).json({ message: 'Комментарий слишком короткий' });
    return;
  }
  db.prepare('INSERT INTO comments (store_id, user_id, body) VALUES (?, ?, ?)').run(req.params.id, req.user.id, body);
  addActivity(req.user.id, 'Оставлен комментарий', 3);
  res.status(201).json({ ok: true });
});

app.post('/api/products/:id/like', requireUser, (req, res) => {
  db.prepare('UPDATE products SET likes = likes + 1 WHERE id = ?').run(req.params.id);
  addActivity(req.user.id, 'Поставлен лайк товару', 1);
  res.json({ ok: true });
});

app.post('/api/products/:id/click', (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!product) {
    res.status(404).json({ message: 'Товар не найден' });
    return;
  }
  db.prepare('UPDATE products SET clicks = clicks + 1 WHERE id = ?').run(product.id);
  res.json({ url: product.referral_url });
});

app.use(express.static(publicDir));
app.get('*', (_req, res) => {
  const indexPath = path.join(publicDir, 'index.html');
  if (fs.existsSync(indexPath)) res.sendFile(indexPath);
  else res.status(200).send('ShopTop API is running. Build the client with npm run build --prefix client.');
});

app.listen(PORT, () => {
  console.log(`ShopTop is running on http://localhost:${PORT}`);
});
