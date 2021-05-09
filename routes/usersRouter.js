const { Router } = require('express');
const router = Router();


const { userList,
        userUpdate,
        userPatch,
        userSave,
        userDelete
       } = require('../controllers/userController'); // ruta




router.get('/', userList);

router.put('/:id', userUpdate);

router.patch('/', userPatch);

router.post('/', userSave);

router.delete('/', userDelete);

module.exports = router;