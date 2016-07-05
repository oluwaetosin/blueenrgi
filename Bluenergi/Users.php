<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace Bluenergi;
/**
 * Description of Users
 *
 * @author OLUWATOSIN
 */
class Users extends \Illuminate\Database\Eloquent\Model {
    //put your code here
//    public $users_Id;
//    public $firstname;
//    public $lastname;
//    public $email;
//    public $phonenumber;
//    public $password;
//    public $lastseen;
//    public $level;
    
    function __construct(array $attributes = array()) {
        parent::__construct($attributes);
    }
//            function getUsers_Id() {
//        return $this->users_Id;
//    }
//
//    function getFirstname() {
//        return $this->firstname;
//    }
//
//    function getLastname() {
//        return $this->lastname;
//    }
//
//    function getEmail() {
//        return $this->email;
//    }
//
//    function getPhonenumber() {
//        return $this->phonenumber;
//    }
//
//    function getPassword() {
//        return $this->password;
//    }
//
//    function getLastseen() {
//        return $this->lastseen;
//    }
//
//    function getLevel() {
//        return $this->level;
//    }
//
//    function setUsers_Id($users_Id) {
//        $this->users_Id = $users_Id;
//    }
//
//    function setFirstname($firstname) {
//        $this->firstname = $firstname;
//    }
//
//    function setLastname($lastname) {
//        $this->lastname = $lastname;
//    }
//
//    function setEmail($email) {
//        $this->email = $email;
//    }
//
//    function setPhonenumber($phonenumber) {
//        $this->phonenumber = $phonenumber;
//    }
//
//    function setPassword($password) {
//        $this->password = $password;
//    }
//
//    function setLastseen($lastseen) {
//        $this->lastseen = $lastseen;
//    }
//
//    function setLevel($level) {
//        $this->level = $level;
//    }


}
