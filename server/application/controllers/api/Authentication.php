<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	header('Access-Control-Allow-Methods: *');
	header('Access-Control-Allow-Headers: *');
	exit;
}
// Load the Rest Controller library
require APPPATH . '/libraries/REST_Controller.php';

class Authentication extends REST_Controller {

    public function __construct() { 
        parent::__construct();
        
        // Load the user model
        $this->load->model('user');
    }
    
    public function login_post() {
        // Get the post data
        $username = $this->post('username');
        $password = $this->post('password');

        // Validate the post data
        if(!empty($username) && !empty($password)){
            
            // Check if any user exists with the given credentials
            $con['returnType'] = 'single';
            $con['conditions'] = array(
                'username' => $username,
                'password' => md5($password),
                'status' => 1
            );
            $user = $this->user->getRows($con);
            
            if($user){
                // Set the response and exit
                $this->response([
                    'status' => TRUE,
                    'message' => 'User login successful.',
                    'data' => $user
                ], REST_Controller::HTTP_OK);
            }else{
                // Set the response and exit
                //BAD_REQUEST (400) being the HTTP response code
                $this->response("Wrong username or password.", REST_Controller::HTTP_BAD_REQUEST);
            }
        }else{
            // Set the response and exit
            $this->response("Provide username and password.", REST_Controller::HTTP_BAD_REQUEST);
        }
    }
    
    public function registration_post() {
        // Get the post data
        $name = strip_tags($this->post('name'));
        $username = strip_tags($this->post('username'));
        $password = $this->post('password');
        $address = strip_tags($this->post('address'));
        
        // Validate the post data
        if(!empty($name) && !empty($username) && !empty($password)){
            
            // Check if the given username already exists
            $con['returnType'] = 'count';
            $con['conditions'] = array(
                'username' => $username,
            );
            $userCount = $this->user->getRows($con);
            
            if($userCount > 0){
                // Set the response and exit
                // $this->response("The given username already exists.", REST_Controller::HTTP_BAD_REQUEST);
                $this->response([
                    'status' => FALSE,
                    'message' => 'The given username already exists.',
                ], REST_Controller::HTTP_OK);
            }else{
                // Insert user data
                $userData = array(
                    'name' => $name,
                    'username' => $username,
                    'password' => md5($password),
                    'address' => $address,
                    'isAdmin' => "0"
                );
                $insert = $this->user->insert($userData);
                
                // Check if the user data is inserted
                if($insert){
                    // Set the response and exit
                    $this->response([
                        'status' => TRUE,
                        'message' => 'The user has been added successfully.',
                        'data' => $insert
                    ], REST_Controller::HTTP_OK);
                }else{
                    // Set the response and exit
                    $this->response("Some problems occurred, please try again.", REST_Controller::HTTP_BAD_REQUEST);
                }
            }
        }else{
            // Set the response and exit
            $this->response("Provide complete user info to add.", REST_Controller::HTTP_BAD_REQUEST);
        }
    }
    
    public function user_get($id = 0) {
        // Returns all the users data if the id not specified,
        // Otherwise, a single user will be returned.
        $con = $id?array('id' => $id):'';
        $users = $this->user->getRows($con);
        
        // Check if the user data exists
        if(!empty($users)){
            // Set the response and exit
            //OK (200) being the HTTP response code
            $this->response($users, REST_Controller::HTTP_OK);
        }else{
            // Set the response and exit
            //NOT_FOUND (404) being the HTTP response code
            $this->response([
                'status' => FALSE,
                'message' => 'No user was found.'
            ], REST_Controller::HTTP_NOT_FOUND);
        }
    }
    
    public function user_put() {
        $id = $this->put('id');
        
        // Get the post data
        $name = strip_tags($this->put('name'));
        $username = strip_tags($this->put('username'));
        $password = $this->put('password');
        $address = strip_tags($this->put('address'));
        
        // Validate the post data
        if(!empty($id) && (!empty($name) || !empty($username) || !empty($password) || !empty($address))){
            // Update user's account data
            $userData = array();
            if(!empty($name)){
                $userData['name'] = $name;
            }
            
            if(!empty($username)){
                $userData['username'] = $username;
            }
            if(!empty($password)){
                $userData['password'] = md5($password);
            }
            if(!empty($address)){
                $userData['address'] = $address;
            }
            $update = $this->user->update($userData, $id);
            
            // Check if the user data is updated
            if($update){
                // Set the response and exit
                $this->response([
                    'status' => TRUE,
                    'message' => 'The user info has been updated successfully.'
                ], REST_Controller::HTTP_OK);
            }else{
                // Set the response and exit
                $this->response("Some problems occurred, please try again.", REST_Controller::HTTP_BAD_REQUEST);
            }
        }else{
            // Set the response and exit
            $this->response("Provide at least one user info to update.", REST_Controller::HTTP_BAD_REQUEST);
        }
    }

}