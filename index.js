const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cors = require('cors');

const port = 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  'mongodb+srv://admin_aaa:mongo1234@mycluster.frbme.mongodb.net/csp2-ecommerce_API?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error!'));
db.on('open', () => console.log('We are connected to the database!'));

app.get('/', (req, res) => {
  res.send('Welcome to Buy, Juan! Take, Juan! store!');
});

app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

app.listen(port, () => console.log(`Server is listening to port ${port}`));
