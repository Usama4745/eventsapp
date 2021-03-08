<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Event extends CI_Model {

    public function __construct() {
        parent::__construct();
        
        // Load the database library
        $this->load->database();
        
        $this->eventTbl = 'events';
    }

    /*
     * Get rows from the users table
     */
    function getRows($params = array()){
        $this->db->select('*');
        $this->db->from($this->eventTbl);
        
        //fetch data by conditions
        if(array_key_exists("conditions",$params)){
            foreach($params['conditions'] as $key => $value){
                $this->db->where($key,$value);
            }
        }
        
        if(array_key_exists("id",$params)){
            $this->db->where('id',$params['id']);
            $query = $this->db->get();
            $result = $query->row_array();
        }else{
            //set start and limit
            if(array_key_exists("start",$params) && array_key_exists("limit",$params)){
                $this->db->limit($params['limit'],$params['start']);
            }elseif(!array_key_exists("start",$params) && array_key_exists("limit",$params)){
                $this->db->limit($params['limit']);
            }
            
            if(array_key_exists("returnType",$params) && $params['returnType'] == 'count'){
                $result = $this->db->count_all_results();    
            }elseif(array_key_exists("returnType",$params) && $params['returnType'] == 'single'){
                $query = $this->db->get();
                $result = ($query->num_rows() > 0)?$query->row_array():false;
            }else{
                $query = $this->db->get();
                $result = ($query->num_rows() > 0)?$query->result_array():false;
            }
        }

        //return fetched data
        return $result;
    }
    /*
     * update registered user ids from the users table
     */
    function updateregister($params = array()){
        $this->db->select('*');
        $this->db->from($this->eventTbl);
        
        //fetch data by conditions
        if(array_key_exists("conditions",$params)){
            foreach($params['conditions'] as $key => $value){
                $this->db->where($key,$value);
            }
        }
        
        if(array_key_exists("id",$params)){
            $this->db->where('id',$params['id']);
            $query = $this->db->get();
            $result = $query->row_array();
        }else{
            //set start and limit
            if(array_key_exists("start",$params) && array_key_exists("limit",$params)){
                $this->db->limit($params['limit'],$params['start']);
            }elseif(!array_key_exists("start",$params) && array_key_exists("limit",$params)){
                $this->db->limit($params['limit']);
            }
            
            if(array_key_exists("returnType",$params) && $params['returnType'] == 'count'){
                $result = $this->db->count_all_results();    
            }elseif(array_key_exists("returnType",$params) && $params['returnType'] == 'single'){
                $query = $this->db->get();
                $result = ($query->num_rows() > 0)?$query->row_array():false;
            }else{
                $query = $this->db->get();
                $result = ($query->num_rows() > 0)?$query->result_array():false;
            }
        }

        //return fetched data
        return $result;
    }
    
    /*
     * Insert user data
     */
    public function insert($data){
        //add CreatedDate and UpdatedDate  if not exists
        if(!array_key_exists("CreatedDate", $data)){
            $data['CreatedDate'] = date("Y-m-d H:i:s");
        }
        if(!array_key_exists("UpdatedDate", $data)){
            $data['UpdatedDate'] = date("Y-m-d H:i:s");
        }
        
        //insert user data to users table
        $insert = $this->db->insert($this->eventTbl, $data);
        
        //return the status
        return $insert?$this->db->insert_id():false;
    }
    
    /*
     * Update user data
     */
    public function update($data, $id){
        //add UpdatedDate date if not exists
        if(!array_key_exists('UpdatedDate', $data)){
            $data['UpdatedDate'] = date("Y-m-d H:i:s");
        }
        
        //update user data in users table
        $update = $this->db->update($this->eventTbl, $data, array('id'=>$id));
        
        //return the status
        return $update?true:false;
    }
    
    /*
     * Update user data
     */
    public function updatereguser($data, $id){
        $this->db->select('*');
        $this->db->from($this->eventTbl);

        //add UpdatedDate date if not exists
        if(!array_key_exists('UpdatedDate', $data)){
            $data['UpdatedDate'] = date("Y-m-d H:i:s");
        }
        $this->db->where('id',intval($id));
        $query = $this->db->get();
        $result = $query->row_array();

        $arr=array();
        if(isset($result["registered_users"])){
            print_r("regsitered isset result");
            $arr=json_decode($result["registered_users"],true);
            array_push($arr,$data["registered_users"]);
        }else{
            array_push($arr,$data["registered_users"]);
        }
        $data["registered_users"]=json_encode($arr, JSON_FORCE_OBJECT);
        //update user data in users table
        $update = $this->db->update($this->eventTbl, $data, array('id'=>$id));
        
        //return the status
        return $update?true:false;
    }
    
    /*
     * Delete user data
     */
    public function delete($id){
        //update user from users table
        $delete = $this->db->delete('events',array('id'=>$id));
        //return the status
        return $delete?true:false;
    }

}