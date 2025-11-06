import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // Get MongoDB URI from environment or use fallback
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://sarthaknamdev:sarthaknamdev@cluster0.oqswyt3.mongodb.net/inhabittech?retryWrites=true&w=majority';

    // Ensure the URI has a database name
    let connectionString = mongoURI;
    if (!connectionString.includes('/') || connectionString.split('/').length === 1 || connectionString.split('/')[1].includes('?')) {
      // Add database name if not present
      const dbName = 'inhabittech';
      if (connectionString.includes('?')) {
        connectionString = connectionString.replace('?', `/${dbName}?`);
      } else {
        connectionString = connectionString.endsWith('/')
          ? `${connectionString}${dbName}?retryWrites=true&w=majority`
          : `${connectionString}/${dbName}?retryWrites=true&w=majority`;
      }
    }

    const conn = await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 5, // Maintain at least 5 socket connections
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);

    // Provide more helpful error messages
    if (error.message.includes('IP whitelist') || error.message.includes('whitelist')) {
      console.error('\n💡 Tip: Make sure your current IP address is whitelisted in MongoDB Atlas.');
      console.error('   Visit: https://www.mongodb.com/docs/atlas/security-whitelist/');
    } else if (error.message.includes('authentication') || error.message.includes('auth')) {
      console.error('\n💡 Tip: Check your MongoDB username and password in the connection string.');
    } else if (error.message.includes('timeout') || error.message.includes('server selection')) {
      console.error('\n💡 Tip: Check your network connection and MongoDB Atlas cluster status.');
    }

    throw error;
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err);
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected');
});

