import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node'

interface DbSchema {
    items: { id: number; name: string }[];
}

// Set up the database
const adapter = new JSONFile<DbSchema>('db.json');
const db = new Low(adapter, {
    items: []
});

// Initialize the database with default values
async function initializeDb() {
    await db.read();
    db.data ||= { items: [] };
    await db.write();
}

export { db, initializeDb };