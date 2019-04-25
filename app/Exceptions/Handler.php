<?php

namespace App\Exceptions;

use Exception;

use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Laravel\Lumen\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        AuthorizationException::class,
        HttpException::class,
        ModelNotFoundException::class,
        ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     */
    public function render($request, Exception $exception)
    {
        if (( $exception instanceof HttpException && $exception->getStatusCode() == Response::HTTP_UNAUTHORIZED)
            || $exception instanceof AuthorizationException){
            return response()->json([
                "message" => "You are not authorized to this route."
            ])->setStatusCode(Response::HTTP_UNAUTHORIZED);
            
        }

        if (($exception instanceof HttpException && $exception->getStatusCode() == Response::HTTP_BAD_REQUEST)
        ) {
            return response()->json([
                "message" => "Bad Request Received."
            ])->setStatusCode(Response::HTTP_BAD_REQUEST);
        }

        return parent::render($request, $exception);
    }
}
