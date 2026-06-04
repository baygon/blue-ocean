const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// --- Tenant resolution by Api-key header ---------------------------------

const API_KEY_TO_TENANT = {
  wolfykey: 'wolfy',
  pantalookey: 'pantaloo',
};

const TOKENS_BY_TENANT = {
  wolfy: 'wolfy-token-abc123',
  pantaloo: 'pantaloo-token-xyz789',
};

function resolveTenant(req, res, next) {
  const apiKey = req.header('Api-key');
  if (!apiKey) {
    return res.status(401).json({ error: 'Missing Api-key header' });
  }
  const tenant = API_KEY_TO_TENANT[apiKey];
  if (!tenant) {
    return res.status(401).json({ error: 'Unknown Api-key' });
  }
  req.tenant = tenant;
  next();
}

function requireToken(req, res, next) {
  const auth = req.header('Authorization') || '';
  const token = auth.replace(/^Bearer\s+/i, '').trim();
  if (!token) {
    return res.status(401).json({ error: 'Missing Authorization token' });
  }
  if (TOKENS_BY_TENANT[req.tenant] !== token) {
    return res.status(403).json({ error: 'Invalid token for this tenant' });
  }
  next();
}

function loadTenantData(tenant) {
  const file = path.join(__dirname, 'data', `${tenant}.json`);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

// --- Routes --------------------------------------------------------------

app.get('/health', (_req, res) => res.json({ ok: true }));

// Auth: get a token. Requires Api-key header to identify the tenant.
app.post('/auth/token', resolveTenant, (req, res) => {
  res.json({ token: TOKENS_BY_TENANT[req.tenant] });
});

// Casino config: name, template, theme, menu, sections.
app.get('/casino', resolveTenant, requireToken, (req, res) => {
  res.json(loadTenantData(req.tenant));
});

// Sections only.
app.get('/sections', resolveTenant, requireToken, (req, res) => {
  res.json(loadTenantData(req.tenant).sections);
});

// --- Start ---------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Mock API listening on http://localhost:${PORT}`);
  console.log('Tenants:');
  for (const [key, tenant] of Object.entries(API_KEY_TO_TENANT)) {
    console.log(`  Api-key: ${key} -> ${tenant}`);
  }
});
