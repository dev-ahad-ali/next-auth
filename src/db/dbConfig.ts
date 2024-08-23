import mongoose from 'mongoose';

export async function connectDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env
        .DB_PASS!}@cluster0.rocppxe.mongodb.net/nextAuth`
    );

    const connection = mongoose.connection;
    connection.on('connected', () => {
      console.log('Mongodb connected successfully');
    });
    connection.on('error', (error) => {
      console.log('Mongodb connection error', error);
      process.exit();
    });
  } catch (error) {
    console.log('Something went wrong when while connection database');
  }
}
