const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  const filePath = path.resolve(__dirname, '../db.json');
  const data = fs.readFileSync(filePath, 'utf8');
  return {
    statusCode: 200,
    body: data,
    headers: {
      'Content-Type': 'application/json'
    }
  };
};
