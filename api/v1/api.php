<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../../vendor/autoload.php';
require '../../database.php';
$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();
$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
        'secure'=>false
    ],
];
$c = new \Slim\Container($configuration);
$app = new \Slim\App($c);
$app->add(new \Slim\Middleware\JwtAuthentication([
    "path"=>'/',
    "secure" => false,
    "secret" => getenv("JWT_SECRET"),
    "passthrough" => ["/login","/signup"],
    "algorithm" => ["HS256", "HS384"],
     "error" => function ($request, $response, $arguments) {
        $data["status"] = "error";
        $data["message"] = $arguments["message"];
        return $response
            ->withHeader("Content-Type", "application/json")
            ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }
]));
$app->get('/users/{id}', function (Request $request, Response $response) {
    try{
      
     $id = $request->getAttribute('id');
     $response = Bluenergi\Users::find($id);
     
    } catch (Exception $ex){
       $response = $ex->getMessage();
    }
    echo json_encode($response);
});
$app->get('/users', function (Request $request, Response $response) {
    try{
     $user =  new Bluenergi\Users();
     $response = $user->get();
     echo json_encode($response);
    }  catch (Exception $ex){
         throw new Exception($ex->getMessage());
    }
});
$app->post('/users', function (Request $request, Response $response) {
    try {
      $data = $request->getParsedBody();
  
     
     $user = new \Bluenergi\Users();
   
     $user->firstname  = filter_var($data['firstname'],FILTER_SANITIZE_STRING);
     $user->lastname  = filter_var($data['lastname'],FILTER_SANITIZE_STRING);
     $user->email  = filter_var($data['email'],FILTER_SANITIZE_STRING);
     $user->phonenumber  = filter_var($data['phonenumber'],FILTER_SANITIZE_STRING);
     $user->password  = md5(getenv("PASSWORD_SALT").filter_var($data['password'],FILTER_SANITIZE_STRING));
     $user->lastseen  = filter_var($data['lastseen'],FILTER_SANITIZE_STRING);
     $user->level  = filter_var($data['level'],FILTER_SANITIZE_STRING);
    
     $response = $user->save();
        
    } catch (Exception $exc) {
       $response =  $exc->getMessage();
    }
    echo json_encode($response);
});
$app->put('/users/{id}', function (Request $request, Response $response) {
    try {
       $id = $request->getAttribute('id');
       
       $data = $request->getParsedBody();
       
     $user =  \Bluenergi\Users::find($id);
   
     $user->firstname  = filter_var($data['firstname'],FILTER_SANITIZE_STRING);
     $user->lastname  = filter_var($data['lastname'],FILTER_SANITIZE_STRING);
     $user->email  = filter_var($data['email'],FILTER_SANITIZE_STRING);
     $user->phonenumber  = filter_var($data['phonenumber'],FILTER_SANITIZE_STRING);
     $user->password  = md5(getenv("PASSWORD_SALT").filter_var($data['password'],FILTER_SANITIZE_STRING));
     $user->lastseen  = filter_var($data['lastseen'],FILTER_SANITIZE_STRING);
     $user->level  = filter_var($data['level'],FILTER_SANITIZE_STRING);
    
     $response = $user->save();
        
    } catch (Exception $exc) {
       $response =  $exc->getMessage();
    }
    echo json_encode($response);
});
$app->delete('/users/{id}', function (Request $request, Response $response) {
    try {
       $id = $request->getAttribute('id');
   //var_dump($data);
     
     $user =  \Bluenergi\Users::find($id);
    
     $response = $user->delete();
        
    } catch (Exception $exc) {
        $response =  $exc->getMessage();
    }
    echo json_encode($response);
});




$app->get('/purchase/{id}', function (Request $request, Response $response) {
    try{
     $id = $request->getAttribute('id');
     $response = Bluenergi\Purchase::find($id);
     $response = json_encode($response);
    }  catch (Exception $ex){
        $response = $ex->getMessage();
    }
    echo $response;
});
$app->get('/purchase', function (Request $request, Response $response) {
    try{
         
     $purchase =  new Bluenergi\Purchase();
     $response = $purchase->join("users","users.id","=","purchases.users_Id")
                  ->join("products","products.id","=","purchases.product_Id")
                 ->select("purchases.*","users.firstname as firstname","users.lastname as lastname","products.name as product")
                 ->get();
      $response =  json_encode($response);
    }catch(Exception $ex){
        $response =  $ex->getMessage();
    }
    echo $response;
});
$app->post('/purchase', function (Request $request, Response $response) {
    try {
      $data = $request->getParsedBody();
      
     
     $purchase = new \Bluenergi\Purchase();
   
     $purchase->truck_number  = filter_var($data['truck_number'],FILTER_SANITIZE_STRING);
     $purchase->users_Id  = filter_var($data['users_Id'],FILTER_SANITIZE_STRING);
     $purchase->product_Id  = filter_var($data['product_Id'],FILTER_SANITIZE_STRING);
     $purchase->quantity  = filter_var($data['quantity'],FILTER_SANITIZE_STRING);
     $purchase->amount_payed  = filter_var($data['amount_payed'],FILTER_SANITIZE_STRING);
     $purchase->bank  = filter_var($data['bank'],FILTER_SANITIZE_STRING);
     $purchase->ticket_no  = filter_var($data['ticket_no'],FILTER_SANITIZE_STRING);
     $purchase->depot  = filter_var($data['depot'],FILTER_SANITIZE_STRING);
     $purchase->quantity_confirmed  = filter_var($data['quantity_confirmed'],FILTER_SANITIZE_STRING);
     $purchase->product_Id_confirmed  = filter_var($data['product_Id_confirmed'],FILTER_SANITIZE_STRING);   
     $purchase->clearance_amount  = filter_var($data['clearance_amount'],FILTER_SANITIZE_STRING);
     $purchase->clearance_bank  = filter_var($data['clearance_bank'],FILTER_SANITIZE_STRING);
     $purchase->product_cleared  = filter_var($data['product_cleared'],FILTER_SANITIZE_STRING);
     $purchase->price_per_litre  = filter_var($data['price_per_litre'],FILTER_SANITIZE_STRING);
     $purchase->purchase_date  = filter_var($data['purchase_date'],FILTER_SANITIZE_STRING);
     
     $product = Bluenergi\Products::find($purchase->product_Id);
  
     $response = $purchase->save();
     $insertedId = $purchase->id;
     
     $adminDetail = \Bluenergi\Users::where('level',5)->get();
     
     $accountant =  \Bluenergi\Users::where('level',4)->get();
      $agent =  \Bluenergi\Users::where('level',2)->get();
      $customMessage = "A payment has been made for ".$product->name ." purchase code is:  ".$insertedId;
      foreach ($adminDetail as $currDetail){
          $message = new \Bluenergi\MessageManager("Bluenergi");
          $num = substr($currDetail->phonenumber,0,1 ) == 0 ? "234". substr($currDetail->phonenumber,1) : 
                                                             $currDetail->phonenumber;
          $message->setTo($num);
          $message->setMessage($customMessage);
         
          $message->sendSms();
          
           $email = new \Bluenergi\EmailManager();
          $email->setTo($currDetail->email);
          $email->setSubject("New Purchase code");
          $email->setMessage($customMessage);
          $email->sendMailUsingPHPMail();
      }
      foreach ($accountant as $currDetail){
          $message = new \Bluenergi\MessageManager("Bluenergi");
          $num = substr($currDetail->phonenumber,0,1 ) == 0 ? "234". substr($currDetail->phonenumber,1) : 
                                                             $currDetail->phonenumber;
          $message->setTo($num);
          $message->setMessage($customMessage);
          $message->sendSms();
          
           $email = new \Bluenergi\EmailManager();
          $email->setTo($currDetail->email);
          $email->setSubject("New Purchase code");
          $email->setMessage($customMessage);
          $email->sendMailUsingPHPMail();
      }
      foreach ($agent as $currDetail){
          $message = new \Bluenergi\MessageManager("Bluenergi");
          $num = substr($currDetail->phonenumber,0,1 ) == 0 ? "234". substr($currDetail->phonenumber,1) : 
                                                             $currDetail->phonenumber;
          $message->setTo($num);
          $message->setMessage($message);
          $message->sendSms();
          
          $email = new \Bluenergi\EmailManager();
          $email->setTo($currDetail->email);
          $email->setSubject("New Purchase code");
          $email->setMessage($customMessage);
          $email->sendMailUsingPHPMail();
          
      }
       
    } catch (Exception $exc) {
        $response = $exc->getMessage();
    }
    echo json_encode($response);
});

$app->put('/purchase/{id}', function (Request $request, Response $response) {
    try {
      $data = $request->getParsedBody();
     $id = $request->getAttribute('id');  
     $purchase = \Bluenergi\Purchase::find($id);
   
     $purchase->truck_number  = filter_var($data['truck_number'],FILTER_SANITIZE_STRING);
     $purchase->users_Id  = filter_var($data['users_Id'],FILTER_SANITIZE_STRING);
     $purchase->product_Id  = filter_var($data['product_Id'],FILTER_SANITIZE_STRING);
     $purchase->quantity  = filter_var($data['quantity'],FILTER_SANITIZE_STRING);
     $purchase->amount_payed  = filter_var($data['amount_payed'],FILTER_SANITIZE_STRING);
     $purchase->bank  = filter_var($data['bank'],FILTER_SANITIZE_STRING);
     $purchase->ticket_no  = filter_var($data['ticket_no'],FILTER_SANITIZE_STRING);
     $purchase->depot  = filter_var($data['depot'],FILTER_SANITIZE_STRING);
     $purchase->quantity_confirmed  = filter_var($data['quantity_confirmed'],FILTER_SANITIZE_STRING);
     $purchase->product_Id_confirmed  = filter_var($data['product_Id_confirmed'],FILTER_SANITIZE_STRING);   
     $purchase->clearance_amount  = filter_var($data['clearance_amount'],FILTER_SANITIZE_STRING);
     $purchase->clearance_bank  = filter_var($data['clearance_bank'],FILTER_SANITIZE_STRING);
     $purchase->product_cleared  = filter_var($data['product_cleared'],FILTER_SANITIZE_STRING);
     $purchase->price_per_litre  = filter_var($data['price_per_litre'],FILTER_SANITIZE_STRING);
     $purchase->purchase_date  = filter_var($data['purchase_date'],FILTER_SANITIZE_STRING);
  
     $response = $purchase->save();
        
    } catch (Exception $exc) {
       $response = $exc->getMessage();
    }
    echo json_encode($response);
});

$app->put('/purchase/loading/{id}', function (Request $request, Response $response) {
    try {
      $data = $request->getParsedBody();
     $id = $request->getAttribute('id');  
     $purchase = \Bluenergi\Purchase::find($id);
   
     $purchase->ticket_no  = filter_var($data['ticket_no'],FILTER_SANITIZE_STRING);
     $purchase->depot  = filter_var($data['depot'],FILTER_SANITIZE_STRING);
     $purchase->quantity_confirmed  = filter_var($data['quantity_confirmed'],FILTER_SANITIZE_STRING);
     $purchase->product_Id_confirmed  = filter_var($data['product_Id_confirmed'],FILTER_SANITIZE_STRING);   
     
     $response = $purchase->save();
        
    } catch (Exception $exc) {
       $response = $exc->getMessage();
    }
    echo json_encode($response);
});

$app->put('/purchase/clearance/{id}', function (Request $request, Response $response) {
    try {
      $data = $request->getParsedBody();
     $id = $request->getAttribute('id');  
     $purchase = \Bluenergi\Purchase::find($id);
   
     $purchase->clearance_amount  = filter_var($data['clearance_amount'],FILTER_SANITIZE_STRING);
     $purchase->clearance_bank  = filter_var($data['clearance_bank'],FILTER_SANITIZE_STRING);
     $purchase->product_cleared  = filter_var($data['product_cleared'],FILTER_SANITIZE_STRING);
     
     $response = $purchase->save();
     if($response){
     $adminDetail = \Bluenergi\Users::where('level',5)->get();
     
     $accountant =  \Bluenergi\Users::where('level',4)->get();
      $agent =  \Bluenergi\Users::where('level',2)->get();
      $customMessage = "A product ".$product->name ." with purchase id:  ".$id ." has been cleared";
      foreach ($adminDetail as $currDetail){
          $message = new \Bluenergi\MessageManager("Bluenergi");
          $num = substr($currDetail->phonenumber,0,1 ) == 0 ? "234". substr($currDetail->phonenumber,1) : 
                                                             $currDetail->phonenumber;
          $message->setTo($num);
          $message->setMessage($customMessage);
           
          $message->sendSms();
          
           $email = new \Bluenergi\EmailManager();
          $email->setTo($currDetail->email);
          $email->setSubject("New Purchase code");
          $email->setMessage($customMessage);
      
          $email->sendMailUsingPHPMail();
      }
      foreach ($accountant as $currDetail){
          $message = new \Bluenergi\MessageManager("Bluenergi");
          $num = substr($currDetail->phonenumber,0,1 ) == 0 ? "234". substr($currDetail->phonenumber,1) : 
                                                             $currDetail->phonenumber;
          $message->setTo($num);
          $message->setMessage($customMessage);
          $message->sendSms();
          
           $email = new \Bluenergi\EmailManager();
          $email->setTo($currDetail->email);
          $email->setSubject("New Purchase code");
          $email->setMessage($customMessage);
          $email->sendMailUsingPHPMail();
      }
      foreach ($agent as $currDetail){
          $message = new \Bluenergi\MessageManager("Bluenergi");
          $num = substr($currDetail->phonenumber,0,1 ) == 0 ? "234". substr($currDetail->phonenumber,1) : 
                                                             $currDetail->phonenumber;
          $message->setTo($num);
          $message->setMessage($message);
          $message->sendSms();
          
          $email = new \Bluenergi\EmailManager();
          $email->setTo($currDetail->email);
          $email->setSubject("New Purchase code");
          $email->setMessage($customMessage);
          $email->sendMailUsingPHPMail();
          
      }
       
     }
        
    } catch (Exception $exc) {
       $response = $exc->getMessage();
    }
    echo json_encode($response);
});



$app->delete('/purchase/{id}', function (Request $request, Response $response) {
    try {
     
       $id = $request->getAttribute('id');  
     $purchase = \Bluenergi\Purchase::find($id);
     $response = $purchase->delete();
        
    } catch (Exception $exc) {
        $response =  $exc->getMessage();
    }
    echo json_encode($response);
});

 
$app->get('/product/{id}', function (Request $request, Response $response) {
    try{
     $id = $request->getAttribute('id');
     $response = Bluenergi\Products::find($id);
    
    }  catch (Exception $ex){
       $response =  $ex->getMessage();
    }
     echo json_encode($response);
});
$app->get('/products', function (Request $request, Response $response) {
 
    try{
     
     $product=  new Bluenergi\Products();
     $response = $product->get();
       
    }  catch (Exception $ex){
        $response = $ex->getMessage();
    }
    echo json_encode($response); 
});

$app->put('/product/{id}', function (Request $request, Response $response) {
    $response =NULL;
    try {
       $id = $request->getAttribute('id');
       $data = $request->getParsedBody();
      
     
     $product = \Bluenergi\Products::find($id);
   
     $product->name  = filter_var($data['name'],FILTER_SANITIZE_STRING);
     $product->description  = filter_var($data['description'],FILTER_SANITIZE_STRING);
      
    
     $response = $product->save();
        
    } catch (Exception $exc) {
       $response =  $exc->getMessage();
    }
    echo json_encode($response);
});


$app->post('/product', function (Request $request, Response $response) {
    try {
       
     $data = $request->getParsedBody();
     $product = new \Bluenergi\Products();
   
     $product->name  = filter_var($data['name'],FILTER_SANITIZE_STRING);
     $product->description  = filter_var($data['description'],FILTER_SANITIZE_STRING);
      
    
     $response = $product->save();
        
    } catch (Exception $exc) {
        $response =  $exc->getMessage();
    }
    echo json_encode($response);
});

$app->delete('/product/{id}', function (Request $request, Response $response) {
    try {
       $id = $request->getAttribute('id');
    
     $product = \Bluenergi\Products::find($id);
   
     $response = $product->delete();
        
    } catch (Exception $exc) {
        $response =  $exc->getMessage();
    }
    echo json_encode($response);
});


$app->get('/dispatch/{id}', function (Request $request, Response $response) {
    try{
     $id = $request->getAttribute('id');
     $response = Bluenergi\Dispatches::find($id);
     
    }  catch (Exception $ex){
        $response = $ex->getMessage();
    }
    echo json_encode($response);
});
$app->get('/dispatch', function (Request $request, Response $response) {
    try{
     $dispatch =  new Bluenergi\Dispatches();
     $response = $dispatch->join('users','users.id','=','dispatches.customer_Id')
                          ->join('purchases','purchases.id','=','dispatches.purchase_Id')
                          ->select("dispatches.*","users.firstname as firstname","users.lastname as lastname","purchases.price_per_litre as purchase_rate")
                          ->get();
     
    }  catch (Exception $ex){
     $response = $ex->getMessage();   
    }
    echo json_encode($response);
});

$app->put('/dispatch/{id}', function (Request $request, Response $response) {
    try {
       $id = $request->getAttribute('id');
       $data = $request->getParsedBody();
      
     
     $dispatch = \Bluenergi\Dispatches::find($id);
   
     $dispatch->purchase_Id         = filter_var($data['purchase_Id'],FILTER_SANITIZE_STRING);
     $dispatch->customer_Id         = filter_var($data['customer_Id'],FILTER_SANITIZE_STRING);
     $dispatch->sold_qty            = filter_var($data['sold_qty'],FILTER_SANITIZE_STRING);
     $dispatch->storage_balance     = filter_var($data['storage_balance'],FILTER_SANITIZE_STRING);
     $dispatch->sold_rate           = filter_var($data['sold_rate'],FILTER_SANITIZE_STRING);
     $dispatch->outstanding         = filter_var($data['outstanding'],FILTER_SANITIZE_STRING);
     $dispatch->payment_due_date    = filter_var($data['payment_due_date'],FILTER_SANITIZE_STRING);
     $dispatch->actual_payment_date = filter_var($data['actual_payment_date'],FILTER_SANITIZE_STRING);
     $dispatch->amount_paid         = filter_var($data['amount_paid'],FILTER_SANITIZE_STRING);
     $dispatch->comment             = filter_var($data['comment'],FILTER_SANITIZE_STRING);
      
    
     $response = $product->save();
     
        
    } catch (Exception $exc) {
        $response =  $exc->getMessage();
    }
    echo json_encode($response);
});
$app->post('/dispatch', function (Request $request, Response $response) {
    try {
       
     $data = $request->getParsedBody();
     $dispatch = new \Bluenergi\Dispatches();
   
      $dispatch->purchase_Id         = filter_var($data['purchase_Id'],FILTER_SANITIZE_STRING);
     $dispatch->customer_Id         = filter_var($data['customer_Id'],FILTER_SANITIZE_STRING);
     $dispatch->sold_qty            = filter_var($data['sold_qty'],FILTER_SANITIZE_STRING);
     $dispatch->storage_balance     = filter_var($data['storage_balance'],FILTER_SANITIZE_STRING);
     $dispatch->sold_rate           = filter_var($data['sold_rate'],FILTER_SANITIZE_STRING);
     $dispatch->outstanding         = filter_var($data['outstanding'],FILTER_SANITIZE_STRING);
     $dispatch->payment_due_date    = filter_var($data['payment_due_date'],FILTER_SANITIZE_STRING);
     $dispatch->actual_payment_date = filter_var($data['actual_payment_date'],FILTER_SANITIZE_STRING);
     $dispatch->amount_paid         = filter_var($data['amount_paid'],FILTER_SANITIZE_STRING);
      $dispatch->comment             = filter_var($data['comment'],FILTER_SANITIZE_STRING);
      
    
     $response = $dispatch->save();
     //send sms to admin
     if($response){
     
          $customer  = Bluenergi\Users::find($dispatch->customer_Id); 
          $purchase =  new Bluenergi\Purchase();
         $purchaseDetails = $purchase->join("products","products.id","=","purchases.product_Id")
                 ->select("products.name as product")
                 ->where("purchases.id","=",$dispatch->purchase_Id)
                 ->get();
         if(!$purchaseDetails || (is_array($purchaseDetails) && empty($purchaseDetails))){
             // logger details
         }
            $adminDetail = \Bluenergi\Users::where('level',5)->get();
          
    
      $customMessage = "A purchase of [".$dispatch->sold_qty." litres] has been made for ".$purchaseDetails[0]->name ." by :  ".$customer->firstname . " ".$customer->firstname;
      foreach ($adminDetail as $currDetail){
          $message = new \Bluenergi\MessageManager("Bluenergi");
          $num = substr($currDetail->phonenumber,0,1 ) == 0 ? "234". substr($currDetail->phonenumber,1) : 
                                                             $currDetail->phonenumber;
          $message->setTo($num);
          $message->setMessage($customMessage);
         
          $message->sendSms();
          
           $email = new \Bluenergi\EmailManager();
          $email->setTo($currDetail->email);
          $email->setSubject("New Purchase code");
          $email->setMessage($customMessage);
          $email->sendMailUsingPHPMail();
      }
     }
     
        
    } catch (Exception $exc) {
        $response =  $exc->getMessage();
    }
    echo json_encode($response);
});
$app->delete('/dispatch/{id}', function (Request $request, Response $response) {
   
    try {
     
       $id = $request->getAttribute('id');  
     $purchase = \Bluenergi\Dispatches::find($id);
     $response = $purchase->delete();
        
    } catch (Exception $exc) {
        $response =  $exc->getMessage();
    }
    echo json_encode($response);
});
$app->post('/login', function (Request $request, Response $response) {
     $returnValue = NULL;
    try {
    
      $data = $request->getParsedBody();
       if(!isset($data['email']) || !($data['email'])){
           throw new Exception("Email required");
       }
       if(!isset($data['password']) || !($data['password'])){
           throw new Exception("Password required");
       }
       $email = filter_var($data['email'],FILTER_SANITIZE_STRING);
       $password = filter_var($data['password'],FILTER_SANITIZE_STRING);
       
       $password= md5(getenv("PASSWORD_SALT").$password);
       $user = \Bluenergi\Users::where('email',$email)->get();
      if(count($user) == 0){
         if(!$email){
           throw new Exception("Email does not exist");
       } 
      }
      $user = \Bluenergi\Users::where([['email','=',$email],['password','=',$password]])->get(['email','id','firstname','lastname','level']);
      if(count($user) == 0){
          throw new Exception("Incorrect Password/User Combination");
      } 
       
    } catch (Exception $exc) {
       return $response = $response->withJson(array('status'=>0,'data'=>$exc->getMessage()),500);
       
    }
    $jwt = Firebase\JWT\JWT::encode($user[0],getenv("JWT_SECRET"),'HS256');
     return $response->withJson(array('status'=>1,'data'=>  base64_encode(json_encode(['token'=> $jwt,'user'=>$user[0]]))));
});

$app->post('/signup', function (Request $request, Response $response) {
     $returnValue = NULL;
    try {
    
      $data = $request->getParsedBody();
       if(!isset($data['email']) || !($data['email'])){
           throw new Exception("Email required");
       }
       if(!isset($data['firstname']) || !($data['firstname'])){
           throw new Exception("Firstname required");
       }
       if(!isset($data['lastname']) || !($data['lastname'])){
           throw new Exception("Lastname required");
       }
       if(!isset($data['phonenumber']) || !($data['phonenumber'])){
           throw new Exception("Phone Number required");
       }
       if(!isset($data['password']) || !($data['password'])){
           throw new Exception("Password required");
       }
       $email = filter_var($data['email'],FILTER_SANITIZE_STRING);
       $password = filter_var($data['password'],FILTER_SANITIZE_STRING);
       $firstname = filter_var($data['firstname'],FILTER_SANITIZE_STRING);
       $lastname = filter_var($data['lastname'],FILTER_SANITIZE_STRING);
       $phonenumber = filter_var($data['phonenumber'],FILTER_SANITIZE_STRING);
       
       $password= md5(getenv("PASSWORD_SALT").$password);
       $founduser = \Bluenergi\Users::where('email',$email)->get();
      if(count($founduser)){
         
           throw new Exception("Email already exist");
      
      };
      $user = new Bluenergi\Users();
      $user->email =  $email;
      $user->password = $password;
      $user->firstname = $firstname;
      $user->lastname = $lastname;
      $user->phonenumber = $phonenumber;
       $user->level = 1;
       $result = $user->save();
       if($result){
           $returnValue = array('status'=>1,'data'=>'Registeration Successful');
       }else{
             $returnValue = array('status'=>0,'data'=>'Error Occured while registering');
       }
    } catch (Exception $exc) {
       return $response = $response->withJson(array('status'=>0,'data'=>$exc->getMessage()),500);
       
    }
    
     return $response->withJson($returnValue);
});
$app->run();

