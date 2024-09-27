// const express=require('express')
// const { test, updateUser, deleteUser } = require('../controllers/userController'); 
// const { verifyToken } = require('../utils/verifyUser');

// const router=express.Router();

// router.get('/test',test);
// router.post('/update/:id',verifyToken,updateUser);
// router.delete('/delete/:id',verifyToken,deleteUser);
// //router.get('/:id', verifyToken, getUser)

// //export default router;

// module.exports=router

const express=require('express')
const { test, updateUser, deleteUser } = require('../controllers/userController'); 
const { verifyToken } = require('../utils/verifyUser');

const router=express.Router();

router.get('/test',test);
router.post('/update/:id',updateUser);
router.delete('/delete/:id',deleteUser);
//router.get('/:id', verifyToken, getUser)

//export default router;

module.exports=router