const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();



// const { validarCampos } = require('../middlewares/validarCampos');
// const { validarJWT } = require('../middlewares/validarToken');
// const { esAdminRol, tieneRole } = require('../middlewares/validarRoles');

const { validarCampos, validarJWT, esAdminRol, tieneRole } = require('../middlewares')

const { esRolevalido, emailExiste, usuarioIdExiste } = require('../helpers/db-validators')


const { userList, userUpdate, userPatch, userSave, userDelete } = require('../controllers/userController'); // ruta





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
      
       validarJWT,
       esAdminRol,
       tieneRole('ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE'),    
       check('id', 'NO ES IN ID VALIDO').isMongoId(),  
       check('id').custom( usuarioIdExiste ) ,
       validarCampos
    ], userDelete );

router.patch('/', userPatch);

module.exports = router;