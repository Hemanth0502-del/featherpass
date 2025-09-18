const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');

const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'data', 'requests.json');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  next();
});

async function readRequests() {
  try {
    const file = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(file);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(DATA_FILE, '[]');
      return [];
    }
    throw error;
  }
}

async function writeRequests(requests) {
  await fs.writeFile(DATA_FILE, JSON.stringify(requests, null, 2));
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/requests', async (req, res) => {
  const requests = await readRequests();
  res.json(requests);
});

app.post('/api/requests', async (req, res) => {
  const { itemName, country, websiteOrStore, moreInfo } = req.body || {};

  if (!itemName || !country) {
    res.status(400).json({ error: 'itemName and country are required.' });
    return;
  }

  const newRequest = {
    id: randomUUID(),
    itemName: String(itemName),
    country: String(country),
    websiteOrStore: websiteOrStore ? String(websiteOrStore) : '',
    moreInfo: moreInfo ? String(moreInfo) : '',
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };

  const requests = await readRequests();
  requests.push(newRequest);
  await writeRequests(requests);

  res.status(201).json(newRequest);
});

app.patch('/api/requests/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};

  if (!status) {
    res.status(400).json({ error: 'status is required.' });
    return;
  }

  const requests = await readRequests();
  const requestIndex = requests.findIndex((request) => request.id === id);

  if (requestIndex === -1) {
    res.status(404).json({ error: 'Request not found.' });
    return;
  }

  requests[requestIndex] = { ...requests[requestIndex], status: String(status) };
  await writeRequests(requests);

  res.json(requests[requestIndex]);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`FeatherPass backend listening on http://localhost:${PORT}`);
});
