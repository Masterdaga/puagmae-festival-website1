const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const ADMIN_STORE = path.join(__dirname, '..', 'config', 'admin.json');
const MAX_ATTEMPTS = parseInt(process.env.ADMIN_MAX_ATTEMPTS || '5', 10);
const LOCK_MS = parseInt(process.env.ADMIN_LOCK_MS || String(5 * 60 * 1000), 10); // default 5 minutes

// in-memory tracker: { attempts: number, lockUntil?: number }
const attemptTracker = new Map();

function readAdminStore() {
  try {
    const raw = fs.readFileSync(ADMIN_STORE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return null;
  }
}

async function verifyBasicAuth(header) {
  if (!header || !header.startsWith('Basic ')) return false;
  const encoded = header.slice('Basic '.length);
  const decoded = Buffer.from(encoded, 'base64').toString('utf8');
  const [username, password] = decoded.split(':');
  if (!username || !password) return false;
  const store = readAdminStore();
  if (!store) return false;
  if (username !== store.username) return false;
  const ok = await bcrypt.compare(password, store.passwordHash);
  return ok;
}

function adminAuth(req, res, next) {
  const key = req.ip || req.headers['x-forwarded-for'] || 'unknown';
  const now = Date.now();
  const state = attemptTracker.get(key) || { attempts: 0, lockUntil: 0 };

  // Locked?
  if (state.lockUntil && now < state.lockUntil) {
    const ms = state.lockUntil - now;
    return res.status(423).json({ success: false, error: 'Locked', lockUntil: state.lockUntil, retryAfterMs: ms });
  }

  verifyBasicAuth(req.headers['authorization'])
    .then((ok) => {
      if (!ok) {
        const newAttempts = (state.attempts || 0) + 1;
        let payload = { success: false, error: 'Unauthorized', remainingAttempts: Math.max(MAX_ATTEMPTS - newAttempts, 0) };
        if (newAttempts >= MAX_ATTEMPTS) {
          state.lockUntil = now + LOCK_MS;
          state.attempts = 0;
          attemptTracker.set(key, state);
          return res.status(423).json({ success: false, error: 'Locked', lockUntil: state.lockUntil, retryAfterMs: LOCK_MS });
        }
        state.attempts = newAttempts;
        attemptTracker.set(key, state);
        return res.status(401).json(payload);
      }
      // success -> reset
      attemptTracker.delete(key);
      next();
    })
    .catch(() => res.status(401).json({ success: false, error: 'Unauthorized' }));
}

module.exports = { adminAuth, readAdminStore, ADMIN_STORE };


