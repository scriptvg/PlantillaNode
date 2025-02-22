const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');

function readDB() {
    const data = fs.readFileSync(dbPath);
    return JSON.parse(data);
}

function writeDB(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

class CashService {
    static getAllCashes() {
        const db = readDB();
        return db.cashes || [];
    }

    static getCashById(id) {
        const db = readDB();
        return db.cashes.find(cash => cash.id === id);
    }

    static createCash(newCash) {
        const db = readDB();
        newCash.id = Date.now().toString();
        db.cashes.push(newCash);
        writeDB(db);
        return newCash;
    }

    static updateCash(id, updatedCash) {
        const db = readDB();
        const index = db.cashes.findIndex(cash => cash.id === id);
        if (index !== -1) {
            db.cashes[index] = { ...db.cashes[index], ...updatedCash };
            writeDB(db);
            return db.cashes[index];
        }
        return null;
    }

    static deleteCash(id) {
        const db = readDB();
        const index = db.cashes.findIndex(cash => cash.id === id);
        if (index !== -1) {
            const deletedCash = db.cashes.splice(index, 1);
            writeDB(db);
            return deletedCash[0];
        }
        return null;
    }
}

module.exports = CashService;