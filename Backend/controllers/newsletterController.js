import Newsletter from '../models/Newsletter.js';

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
export const subscribe = async (req, res, next) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Get IP address
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Check if already subscribed
    const existing = await Newsletter.findOne({ where: { email } });

    if (existing) {
      if (existing.status === 'subscribed') {
        return res.status(400).json({
          success: false,
          message: 'Email is already subscribed'
        });
      } else {
        // Resubscribe
        await existing.update({
          status: 'subscribed',
          subscribedAt: new Date(),
          unsubscribedAt: null,
          name: name || existing.name
        });

        return res.json({
          success: true,
          message: 'Successfully resubscribed to newsletter',
          data: existing
        });
      }
    }

    // Create new subscription
    const subscriber = await Newsletter.create({
      email,
      name,
      ipAddress,
      status: 'subscribed'
    });

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: subscriber
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Unsubscribe from newsletter
// @route   POST /api/newsletter/unsubscribe
// @access  Public
export const unsubscribe = async (req, res, next) => {
  try {
    const { email } = req.body;

    const subscriber = await Newsletter.findOne({ where: { email } });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in newsletter list'
      });
    }

    await subscriber.update({
      status: 'unsubscribed',
      unsubscribedAt: new Date()
    });

    res.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all newsletter subscribers
// @route   GET /api/newsletter
// @access  Private/Admin
export const getAllSubscribers = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (status) where.status = status;

    const subscribers = await Newsletter.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['subscribedAt', 'DESC']]
    });

    res.json({
      success: true,
      count: subscribers.count,
      data: subscribers.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(subscribers.count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete subscriber
// @route   DELETE /api/newsletter/:id
// @access  Private/Admin
export const deleteSubscriber = async (req, res, next) => {
  try {
    const subscriber = await Newsletter.findByPk(req.params.id);

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found'
      });
    }

    await subscriber.destroy();

    res.json({
      success: true,
      message: 'Subscriber deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
