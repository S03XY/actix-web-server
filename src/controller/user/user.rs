use actix_web::{get, HttpRequest, HttpResponse, Responder};
use log;


// these are the route handlers
pub async fn get_user(r: HttpRequest) -> impl Responder {
    log::info!("requested user {:?}", r);
    HttpResponse::Ok().body("from get user")
}

pub async fn get_user_from_config() -> impl Responder {
    HttpResponse::Ok().body("getting user from config")
}

// these are the services
#[get("/from_config")]
pub async fn called_from_config() -> impl Responder {
    HttpResponse::Ok().body("from config attr")
}
