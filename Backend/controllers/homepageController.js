import Homepage from '../models/Homepage.js';

// @desc    Get homepage settings
// @route   GET /api/homepage
// @access  Public
export const getHomepageSettings = async (req, res, next) => {
  try {
    let settings = await Homepage.findOne({
      where: { isActive: true }
    });

    // If no settings exist, create default
    if (!settings) {
      settings = await Homepage.create({
        visionContent: '"Generating knowledge for the future" — aspiring to be a top-tier, research-driven organization in IT and allied fields.',
        visionLink: '/institute/governance',
        missionContent: [
          'Produce competent and ethical graduates.',
          'Solve local & global problems through technology.',
          'Promote significance of ethics and integrity.'
        ],
        quickLinks: [
          { name: 'Admissions', path: '/institute/admission' },
          { name: 'Academics', path: '/institute/academics' },
          { name: 'Departments', path: '/course/btech-cse' },
          { name: 'Research', path: '/research/faculty-research-papers' },
          { name: 'Placements', path: '/placement' },
          { name: 'Alumni', path: '/people/alumni' }
        ]
      });
    }

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update homepage settings
// @route   PUT /api/homepage/:id
// @access  Private/Admin
export const updateHomepageSettings = async (req, res, next) => {
  try {
    const settings = await Homepage.findByPk(req.params.id);

    if (!settings) {
      return res.status(404).json({
        success: false,
        message: 'Homepage settings not found'
      });
    }

    await settings.update(req.body);

    res.json({
      success: true,
      message: 'Homepage settings updated successfully',
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get homepage statistics (aggregated from multiple sources)
// @route   GET /api/homepage/stats
// @access  Public
export const getHomepageStats = async (req, res, next) => {
  try {
    const News = (await import('../models/News.js')).default;
    const Event = (await import('../models/Event.js')).default;
    const Faculty = (await import('../models/Faculty.js')).default;
    const Student = (await import('../models/Student.js')).default;
    const Placement = (await import('../models/Placement.js')).default;
    const ResearchPublication = (await import('../models/ResearchPublication.js')).default;

    const [
      newsCount,
      eventsCount,
      facultyCount,
      studentsCount,
      placementsCount,
      researchCount
    ] = await Promise.all([
      News.count({ where: { isPublished: true } }),
      Event.count({ where: { isPublished: true } }),
      Faculty.count({ where: { isActive: true } }),
      Student.count({ where: { isActive: true } }),
      Placement.count({ where: { isPublished: true } }),
      ResearchPublication.count({ where: { isPublished: true } })
    ]);

    res.json({
      success: true,
      data: {
        news: newsCount,
        events: eventsCount,
        faculty: facultyCount,
        students: studentsCount,
        placements: placementsCount,
        research: researchCount,
        totalContent: newsCount + eventsCount + facultyCount + studentsCount + placementsCount + researchCount
      }
    });
  } catch (error) {
    next(error);
  }
};
