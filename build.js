const fs = require('fs');
const path = require('path');

const dirs = [
  'src/components',
  'src/app/(main)',
  'src/app/(main)/pets',
  'src/app/(main)/login',
  'src/app/(main)/register',
  'src/app/(dashboard)',
  'src/app/(dashboard)/dashboard',
  'src/app/(dashboard)/dashboard/requests',
  'src/app/(dashboard)/dashboard/add-pet',
  'src/app/(dashboard)/dashboard/listings',
];

dirs.forEach(d => fs.mkdirSync(path.join(__dirname, d), { recursive: true }));

console.log('Directories created');
