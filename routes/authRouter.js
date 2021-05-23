const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { login } = require('../controllers/authControllers');
const { validarCampos } = require('../middlewares/validarCampos');

router.post('/login',[
                      check('email', 'El email no es valido').isEmail(),
                      check('password', 'el password es oblogatorio').not().isEmpty(),
                     ],
                    validarCampos,
        login);

module.exports = router;
