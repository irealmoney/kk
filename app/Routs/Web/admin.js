const express = require('express');
const router = express.Router();



//controller
const AdminController = require('app/http/Controllers/admin/AdminController');
const PublishpostController = require('app/http/Controllers/admin/PublishpostController');
const ManagementController = require('app/http/Controllers/admin/ManagementController');
const ticketsController = require('app/http/Controllers/admin/ticketsController');
const UserManagementController = require('app/http/Controllers/admin/UserManagementController');
const PermissionController = require('app/http/Controllers/admin/PermissionController');
const RoleController = require('app/http/Controllers/admin/RoleController');

//middleware
const convertFileToField = require('app/http/Middleware/ConvertFileToField');


//validator
const PublishPostValidator =require('app/http/Validators/PublishPostValidator');
const PermissionValidator = require('app/http/Validators/PermissionValidator');
const RoleValidator = require('app/http/Validators/RoleValidator');

// Helpers 
const Upload = require('../../helpers/uploadImage');
const permission = require('../../Models/permission');
const gate = require('app/helpers/gate');

// set master page
router.use((req , res , next) =>{
    
    res.locals.layout = "admin/master";
    
    next();
})


// panel
router.get('/panel' , AdminController.adminDashboardshow);

//Publish post
router.get('/panel/addpost' , gate.can('add-posts') , PublishpostController.postFormShow)
router.post('/panel/addpost', Upload.single('image') , convertFileToField.handle , PublishPostValidator.handle() , PublishpostController.publish)

//Management
router.get('/panel/manageposts' , ManagementController.showPanel); 
router.delete('/panel/manageposts/:id' ,  gate.can('delete-posts') , PublishpostController.destroy);
router.get('/panel/manageposts/:id/edit' , gate.can('edit-posts') , PublishpostController.edit);
router.put('/panel/manageposts/:id', Upload.single('image') , convertFileToField.handle , PublishPostValidator.handle() , PublishpostController.update);

// Manage Users
router.get('/panel/users' , UserManagementController.ShowUsers )
router.get('/panel/users/:id/toggleadmin' ,  gate.can('promote-admin') , UserManagementController.toggleAdmin);
router.get('/panel/users/:id/adminaccess' , gate.can('promote-admin') , UserManagementController.adminAccess);
router.delete('/panel/users/:id' , gate.can('delete-users') , UserManagementController.destroy );
router.get('/panel/users/:id/addrole' , UserManagementController.addrole);
router.put('/panel/users/:id/storeaddrole' , UserManagementController.StoreAddRole)

//permission router
router.get('/panel/users/permissions' , PermissionController.show); 
router.get('/panel/users/permissions/set' , PermissionController.Publishform)
router.post('/panel/users/permissions/set' ,PermissionValidator.handle() , PermissionController.setPermission ); 
router.delete('/panel/users/permissions/:id' , PermissionController.destroy);
router.get('/panel/users/permissions/:id/edit' , PermissionController.edit);
router.put('/panel/users/permissions/:id', PermissionValidator.handle() , PermissionController.update);


//Role router
router.get('/panel/users/roles' , RoleController.show); 
router.get('/panel/users/roles/set' , RoleController.Publishform)
router.post('/panel/users/roles/set' ,RoleValidator.handle() , RoleController.store ); 
router.delete('/panel/users/roles/:id' , RoleController.destroy);
router.get('/panel/users/roles/:id/edit' , RoleController.edit);
router.put('/panel/users/roles/:id', RoleValidator.handle() , RoleController.update);



// tickets form
router.get('/panel/user-tickets' , ticketsController.ShowTickets )

module.exports = router;





