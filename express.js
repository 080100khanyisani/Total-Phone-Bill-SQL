import express from 'express';
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import { totalPhoneBill } from './phone_bill.js';

const app = express();

app.use(express.static('public'));
app.use(express.json());

// add CORS
app.use(cors());

const db = await sqlite.open({
    filename: './data_plan.db',
    driver: sqlite3.Database
});

await db.migrate();



// Create a new price plan
app.post('/api/price_plan/create', async function(req, res) {
    const { name, call_cost, sms_cost } = req.body;
    await db.run('INSERT INTO price_plan (plan_name, call_price, sms_price) VALUES (?, ?, ?)', [name, call_cost, sms_cost]);
    res.json({ message: 'Price plan created successfully' });
});


// Get all price plans
app.get('/api/price_plans', async function(req, res) {
    const result = await db.all('SELECT * FROM price_plan');
    res.json({ result });
});

// Update a price plan
app.post('/api/price_plan/update', async function(req, res) {
    const { id, name, call_cost, sms_cost } = req.body;
    await db.run('UPDATE price_plan SET plan_name = ?, call_price = ?, sms_price = ? WHERE id = ?', [name, call_cost, sms_cost, id]);
    res.json({ message: 'Price plan updated successfully' });
});

// Delete a price plan
app.post('/api/price_plan/delete', async function(req, res) {
    const { id } = req.body;
    await db.run('DELETE FROM price_plan WHERE id = ?', [id]);
    res.json({ message: 'Price plan deleted successfully' });
});

// Calculate phone bill
app.post('/api/phonebill/', async function(req, res) {
    const { price_plan, actions } = req.body;
    const plan = await db.get('SELECT * FROM price_plan WHERE plan_name = ?', [price_plan]);
    if (!plan) {
        return res.status(404).json({ error: 'Price plan not found' });
    }
    const bill = totalPhoneBill(actions, plan.call_price, plan.sms_price);
    res.json({ totalphonebill: bill });
});

const PORT = process.env.PORT || 4011;

app.listen(PORT, function() {
    console.log(`App started on port ${PORT}`);
});
