<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Bluenergi;

/**
 * Description of EmailManager
 *
 * @author OLUWATOSIN
 */
class EmailManager {
    private $from;
    private $to;
    private $message;
    private $subject;
    
    function __construct() {
        ;
    }
    function getFrom() {
        return $this->from;
    }

    function getTo() {
        return $this->to;
    }

    function getMessage() {
        return $this->message;
    }

    function setFrom($from) {
        $this->from = $from;
    }

    function setTo($to) {
        $this->to = $to;
    }

    function setMessage($message) {
        $this->message = $message;
    }

    function sendMailUsingPHPMail(){
        mail($this->getTo(),$this->getSubject(),$this->getMessage());
    }
    function getSubject() {
        return $this->subject;
    }

    function setSubject($subject) {
        $this->subject = $subject;
    }


    
}
