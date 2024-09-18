const express=require('express')
const { test, updateUser, deleteUser } = require('../controllers/userController'); 
const { verifyToken } = require('../utils/verifyUser');

const router=express.Router();

router.get('/test',test);
router.post('/update/:id',verifyToken,updateUser);
router.delete('/delete/:id',verifyToken,deleteUser);

//export default router;

module.exports=router