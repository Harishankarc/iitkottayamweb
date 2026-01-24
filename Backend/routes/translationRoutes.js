import express from 'express';
import { translateText } from '../utils/translation.js';

const router = express.Router();

// Bulk translate endpoint
router.post('/translate-bulk', async (req, res) => {
  try {
    const { texts, targetLang } = req.body;

    if (!texts || !Array.isArray(texts)) {
      return res.status(400).json({
        success: false,
        message: 'texts array is required'
      });
    }

    if (!targetLang) {
      return res.status(400).json({
        success: false,
        message: 'targetLang is required'
      });
    }

    // Translate all texts
    const translations = await Promise.all(
      texts.map(async (text) => {
        const translatedText = await translateText(text, targetLang);
        return { originalText: text, translatedText };
      })
    );

    res.json({
      success: true,
      data: {
        texts,
        translations,
        targetLang
      }
    });
  } catch (error) {
    console.error('Bulk translation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error translating texts',
      error: error.message
    });
  }
});

export default router;
