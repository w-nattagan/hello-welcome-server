import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import { setupSwagger } from './swagger';

const app = express();
const PORT = process.env.PORT || 8080;

// Use CORS middleware
app.use(cors());

app.use(express.json());

// Use user routes
app.use('/api', userRoutes);
// Use post routes
app.use('/api', postRoutes);

// Setup Swagger
setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} http://localhost:${PORT}/api-docs`);
});
