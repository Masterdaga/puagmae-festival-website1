const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const ADMIN_STORE = path.join(__dirname, 'config', 'admin.json');

async function resetAdmin() {
  try {
    const defaultUsername = 'admin';
    const defaultPassword = 'puagme2023';
    
    const passwordHash = await bcrypt.hash(defaultPassword, 10);
    
    fs.writeFileSync(ADMIN_STORE, JSON.stringify({ 
      username: defaultUsername, 
      passwordHash 
    }, null, 2));
    
    console.log('✅ Admin credentials reset successfully!');
    console.log('Username:', defaultUsername);
    console.log('Password:', defaultPassword);
    console.log('File saved to:', ADMIN_STORE);
  } catch (error) {
    console.error('❌ Error resetting admin:', error);
  }
}

resetAdmin();
