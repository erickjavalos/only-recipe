const { User, Recipe } = require('../models');

const router = require('express').Router();
// const { Gallery, Painting } = require('../models');

router.get('/', async (req, res) => {
  if (req.session.loggedIn && req.session.userId){

    try{
      const dbUserData = await User.findByPk(req.session.userId, {
        include: [
          {
            model: Recipe,
            attributes: [
              'recipe_id',
              'recipes_name',
              'allergens',
              'servings',
              'preptime',
              'cooktime',
              'totaltime',
              'images',
              'instructions',
              'difficulty',
            ],
          },
        ],
      });

      const userRecipe = dbUserData.get({ plain: true });
      console.log(userRecipe)
      res.render('homepage',{
        loggedIn: req.session.loggedIn,
        recipes: userRecipe.recipes,
        firstName: userRecipe.first_name,
        lastName: userRecipe.first_name,
        experience: userRecipe.experience,
        
      })
      
    }catch (err) {
      console.log(err);
      res.status(500).json(err);
    }

  }
  else {

    res.render('homepage',{
      loggedIn: req.session.loggedIn
    })
  }
})

// render login page data
router.get('/login', async (req, res) => {
  res.render('login')
})

// render signup data
router.get('/signup', async (req, res) => {
  res.render('signup')
})

router.get('/user/:id', async (req, res) => {
  try {
    console.log('Hello World')
    const dbUserData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Recipe,
          attributes: [
            'recipe_id',
            'recipes_name',
            'allergens',
            'servings',
            'preptime',
            'cooktime',
            'totaltime',
            'instructions',
            'difficulty',
          ],
        },
      ],
    });
    // console.log(dbUserData)
    const userRecipe = dbUserData.get({ plain: true });
    console.log(userRecipe)
    res.status(200).json(userRecipe)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
