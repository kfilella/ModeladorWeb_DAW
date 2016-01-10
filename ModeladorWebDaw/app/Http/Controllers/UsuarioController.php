<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Usuario;

use Illuminate\Database\Eloquent\Collection;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Crypt;



class UsuarioController extends Controller
{

    public function index()
    {
        session_start();
        if ( isset( $_SESSION['key'] ) )
        {
            $user = Usuario::getUserById( $_SESSION[ 'key' ] );

            if( isset( $user ) ){
                return view( 'principal' , [ 'user' => $user ] );
            }else{
                return view('welcome');
            }
        }
        else
        {
            dd('no hah set');
        }
    }

    public function guardar(Request $req)
    {
                $usuario = new Usuario;
                $usuario->nombres =$req->nombresReg;
                $usuario->email =$req->emailReg;
                $usuario->password = Crypt::encrypt($req->passwordRegistro);
                $usuario->usuario = $req->username;
                $usuario->save();

        return view("login");
    }


    public function login(Request $req){
        session_start();
        $contrasena = "";
        $usuario = Usuario::where('usuario', $req->username)
                 ->first();

        if(isset($usuario))
        {
            //try {
            $contrasena = Crypt::decrypt($usuario->password);
            //}
            //catch (DecryptException $e) {
            //    dd('errrordecrypt');
            //}

            if($contrasena != $req->passwordLog)

                $usuario = null;


        }
        //dd($usuario);

        if(isset($usuario))
        {
            if(isset($_SESSION['key'])){
                session_unset();
            }

            $_SESSION['key'] = $usuario->id;

            return view( 'principal' , [ 'user' => $usuario ] );
        }
        return view('welcome');
    }



}
