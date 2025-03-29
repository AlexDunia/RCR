import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Security middleware
app.use(helmet()); // Adds various HTTP headers for security
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10kb' })); // Limit request body size

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// JWT Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Request validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Price range validation rules
const priceRangeValidation = [
  body('filters.priceRange.min')
    .optional()
    .isNumeric()
    .withMessage('Minimum price must be a number')
    .isInt({ min: 0, max: 1000000000 })
    .withMessage('Price must be between 0 and 1,000,000,000'),
  body('filters.priceRange.max')
    .optional()
    .isNumeric()
    .withMessage('Maximum price must be a number')
    .isInt({ min: 0, max: 1000000000 })
    .withMessage('Price must be between 0 and 1,000,000,000')
    .custom((value, { req }) => {
      const min = req.body.filters.priceRange.min;
      if (min && value < min) {
        throw new Error('Maximum price must be greater than minimum price');
      }
      return true;
    })
];

// Encryption helpers
const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    'aes-256-gcm',
    Buffer.from(process.env.ENCRYPTION_KEY, 'hex'),
    iv
  );
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted,
    authTag: authTag.toString('hex')
  };
};

const decrypt = (encrypted) => {
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    Buffer.from(process.env.ENCRYPTION_KEY, 'hex'),
    Buffer.from(encrypted.iv, 'hex')
  );
  decipher.setAuthTag(Buffer.from(encrypted.authTag, 'hex'));
  let decrypted = decipher.update(encrypted.encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

// API Routes
app.post('/api/properties/search',
  authenticateToken,
  priceRangeValidation,
  validateRequest,
  async (req, res) => {
    try {
      const { filters } = req.body;

      // Validate request timestamp
      const requestTime = new Date(filters.timestamp);
      const now = new Date();
      if (now - requestTime > 5 * 60 * 1000) { // 5 minutes
        return res.status(400).json({ error: 'Request expired' });
      }

      // Decrypt sensitive data if encrypted
      let priceRange = filters.priceRange;
      if (filters.encrypted) {
        priceRange = JSON.parse(decrypt(filters.priceRange));
      }

      // Validate price range
      if (priceRange.min && priceRange.max &&
          parseInt(priceRange.min) > parseInt(priceRange.max)) {
        return res.status(400).json({
          error: 'Invalid price range: minimum price cannot be greater than maximum price'
        });
      }

      // TODO: Implement your database query here
      // const properties = await Property.find({
      //   price: {
      //     $gte: priceRange.min || 0,
      //     $lte: priceRange.max || Number.MAX_SAFE_INTEGER
      //   }
      // });

      // For demo, return mock data
      const properties = [
        { id: 1, price: 200000, title: 'Sample Property 1' },
        { id: 2, price: 300000, title: 'Sample Property 2' }
      ];

      // Encrypt response if needed
      const response = encrypt(JSON.stringify(properties));

      res.json({
        encrypted: true,
        data: response,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error processing property search:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Get available price ranges
app.get('/api/properties/price-ranges',
  authenticateToken,
  async (req, res) => {
    try {
      // TODO: Implement your database query here
      // const ranges = await Property.aggregate([
      //   {
      //     $group: {
      //       _id: null,
      //       minPrice: { $min: '$price' },
      //       maxPrice: { $max: '$price' }
      //     }
      //   }
      // ]);

      // For demo, return mock data
      const ranges = {
        minPrice: 100000,
        maxPrice: 1000000
      };

      res.json(ranges);
    } catch (error) {
      console.error('Error fetching price ranges:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Validate price range
app.post('/api/properties/validate-price',
  authenticateToken,
  [
    body('minPrice').optional().isNumeric(),
    body('maxPrice').optional().isNumeric()
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { minPrice, maxPrice } = req.body;

      // TODO: Add your custom validation logic here
      const isValid = (!minPrice || !maxPrice) ||
                     (parseInt(minPrice) <= parseInt(maxPrice));

      res.json({ isValid });
    } catch (error) {
      console.error('Error validating price range:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
