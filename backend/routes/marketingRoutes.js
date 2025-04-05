const express = require('express');
const router = express.Router();
const { authenticateJWT, isAgent } = require('../middleware/authMiddleware');
const marketingController = require('../controllers/marketingController');

// Apply authentication middleware to all marketing routes
router.use(authenticateJWT);

// ========== MARKETING PLANS ROUTES ==========
router.get('/plans', isAgent, marketingController.plans.getPlans);
router.get('/plans/:id', isAgent, marketingController.plans.getPlanById);
router.post('/plans', isAgent, marketingController.plans.createPlan);
router.put('/plans/:id', isAgent, marketingController.plans.updatePlan);
router.delete('/plans/:id', isAgent, marketingController.plans.deletePlan);

// ========== CHECKLISTS ROUTES ==========
router.get('/checklists', isAgent, marketingController.checklists.getChecklists);
router.get('/checklists/:id', isAgent, marketingController.checklists.getChecklistById);
router.post('/checklists', isAgent, marketingController.checklists.createChecklist);
router.put('/checklists/:id', isAgent, marketingController.checklists.updateChecklist);
router.delete('/checklists/:id', isAgent, marketingController.checklists.deleteChecklist);
router.patch('/checklists/:id/items/:itemId', isAgent, marketingController.checklists.toggleChecklistItem);

// ========== SOCIAL MEDIA ROUTES ==========
router.get('/social/posts', isAgent, marketingController.social.getPosts);
router.get('/social/posts/:id', isAgent, marketingController.social.getPostById);
router.post('/social/posts', isAgent, marketingController.social.createPost);
router.put('/social/posts/:id', isAgent, marketingController.social.updatePost);
router.delete('/social/posts/:id', isAgent, marketingController.social.deletePost);
router.get('/social/metrics', isAgent, marketingController.social.getPlatformMetrics);
router.get('/social/metrics/:platformId', isAgent, marketingController.social.getPlatformMetricsById);
router.get('/social/posts/:id/metrics', isAgent, marketingController.social.getPostMetrics);
router.post('/social/posts/:id/schedule', isAgent, marketingController.social.schedulePost);

// ========== TEMPLATES ROUTES ==========
router.get('/templates', isAgent, marketingController.templates.getTemplates);
router.get('/templates/:id', isAgent, marketingController.templates.getTemplateById);
router.post('/templates/custom', isAgent, marketingController.templates.createCustomTemplate);
router.get('/templates/categories', isAgent, marketingController.templates.getTemplateCategories);

module.exports = router;
