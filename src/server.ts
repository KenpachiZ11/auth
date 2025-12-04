import express from 'express';
import type { Request, Response } from 'express';
// import mongoose from 'mongoose';
import dotenv from 'dotenv';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/auth_service';

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth Service API',
      version: '1.0.0',
      description: 'API documentation for the Auth Service',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// MongoDB connection
// mongoose
//   .connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err: Error) => console.error('MongoDB connection error:', err));


app.get('/', (_: Request, res: Response) => res.send('Auth Service is running'));
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`) );