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

class Events extends REST_Controller {

    public function __construct() { 
        parent::__construct();
        
        // Load the user model
        $this->load->model('event');
    }
    
    
    public function addevent_post() {
        // Get the post data
        $name = strip_tags($this->post('name'));
        $description = strip_tags($this->post('description'));
        $picurl = $this->post('picurl');
        $industry = $this->post('industry');
        $location = $this->post('location');
        $user_id  = $this->post('user_id');
        $begin_date  = $this->post('begin_date');
        $end_date  = $this->post('end_date');
        
        $end_date=(date("Y-m-d H:i:s", strtotime($end_date)));
        $begin_date=(date("Y-m-d H:i:s", strtotime($begin_date)));
        // Validate the post data
        if(!empty($name) && !empty($description) && !empty($picurl) && !empty($industry)  && !empty($begin_date)  && !empty($end_date) && !empty($user_id) && !empty($location)){
            
                // Insert user data
                $eventData = array(
                    'name' => $name,
                    'description' => $description,
                    'picurl' => ($picurl),
                    'industry' => $industry,
                    'user_id' => intval($user_id),
                    'location' => $location,
                    'begin_date' => $begin_date,
                    'end_date' => $end_date
                );
                $insert = $this->event->insert($eventData);
                
                // Check if the user data is inserted
                if($insert){
                    // Set the response and exit
                    $this->response([
                        'status' => TRUE,
                        'message' => 'The event has been added successfully.',
                        'data' => $insert
                    ], REST_Controller::HTTP_OK);
                }else{
                    // Set the response and exit
                    $this->response([
                        'status' => False,
                        'message' => 'Some problems occurred, please try again.',
                    ], REST_Controller::HTTP_OK);
                }
        }else{
            // Set the response and exit
            $this->response([
                'status' => False,
                'message' => 'Provide complete event info to add.',
            ], REST_Controller::HTTP_OK);
        }
    }
    
    public function event_get($id = 0) {
        $con = $id?array('id' => $id):'';
        $events = $this->event->getRows($con);
        
        if(!empty($events)){
            // Set the response and exit
            //OK (200) being the HTTP response code
            $this->response($events, REST_Controller::HTTP_OK);
        }else{
            // Set the response and exit
            //NOT_FOUND (404) being the HTTP response code
            $this->response([
                'status' => FALSE,
                'message' => 'No user was found.'
            ], REST_Controller::HTTP_NOT_FOUND);
        }
    }
    
    public function userevent_get($id = 0) {
        $con = $id?array('id' => $id):'';
        $events = $this->event->getRows($con);
        
        if(!empty($events)){
            // Set the response and exit
            //OK (200) being the HTTP response code
            $this->response($events, REST_Controller::HTTP_OK);
        }else{
            // Set the response and exit
            //NOT_FOUND (404) being the HTTP response code
            $this->response([
                'status' => FALSE,
                'message' => 'No user was found.'
            ], REST_Controller::HTTP_NOT_FOUND);
        }
    }
    public function eventall_get() {
        $events = $this->event->getRows();
        
        if(!empty($events)){
            // Set the response and exit
            //OK (200) being the HTTP response code
            $this->response($events, REST_Controller::HTTP_OK);
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
            $eventData = array();
            if(!empty($name)){
                $eventData['name'] = $name;
            }
            
            if(!empty($username)){
                $eventData['username'] = $username;
            }
            if(!empty($password)){
                $eventData['password'] = ($password);
            }
            if(!empty($address)){
                $eventData['address'] = $address;
            }
            $update = $this->event->update($eventData, $id);
            
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
    
    public function updatereg_put() {
        $id = $this->put('id');
        
        // Get the post data
        $userid = $this->put('userid');
        // Validate the post data
        if(!empty($userid) && !empty($id)){
            // Update user's account data
            $eventData = array();
            if(!empty($userid)){
                $eventData['registered_users'] = $userid;
            }
           
            $update = $this->event->updatereguser($eventData, $id);
            
            // Check if the user data is updated
            if($update){
                // Set the response and exit
                $this->response([
                    'status' => TRUE,
                    'message' => 'The event info has been updated successfully.'
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