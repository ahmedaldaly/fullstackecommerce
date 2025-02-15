const router = require ('express').Router();
const {addOrder,delet,getAllOrder,getUserOrder ,updateOrder} = require('../controller/OrderController')
const {verifyTokenAndAdmin,
    verifyTokenAndOnlyUser,
    verifyTokenAndAuthorization,
    vrifayToken} = require('../middleware/authratition')
//  /api/vi/order/add
router.route('/add').post(vrifayToken,addOrder);
router.route('/').get(getAllOrder);
router.route('/userorder').get(getUserOrder);
router.route('/:id').delete( vrifayToken,delet).put(updateOrder)

module.exports=router;