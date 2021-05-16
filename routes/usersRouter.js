const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validarCampos');
const { esRolevalido, emailExiste, usuarioIdExiste } = require('../helpers/db-validators')
const router = Router();


const { userList,
        userUpdate,
        userPatch,
        userSave,
        userDelete
       } = require('../controllers/userController'); // ruta




router.get('/', userList);

router.put('/:id',[
                     check('id', 'NO ES IN ID VALIDO').isMongoId(),  
                     check('id').custom( usuarioIdExiste ),
                     check('role').custom( esRolevalido ), 
                     validarCampos  
                  ], userUpdate);

router.patch('/', userPatch);

router.post('/', [
                     
                     check('name', 'campo vacio o invalido').not().isEmpty(),
                     check('password', 'La contraseña tiene que tener mas de 6 caracteres y como maximo 30').isLength({min:6, max:30}),
                     check('email', 'correno no valido').isEmail(),                   
                     check('email').custom( emailExiste ),
                     check('role').custom( esRolevalido ),
                     validarCampos
                 ], userSave);

router.delete('/:id',[
       check('id', 'NO ES IN ID VALIDO').isMongoId(),  
       check('id').custom( usuarioIdExiste ) ,
       validarCampos
    ], userDelete );

router.patch('/', userPatch);

module.exports = router;