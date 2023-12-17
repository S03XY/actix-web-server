use actix_web::{HttpRequest,HttpResponse, Responder};
use log;

pub async fn get_user(r:HttpRequest) -> impl Responder {
    log::info!("requested user {:?}",r);
    HttpResponse::Ok().body("from get user")
}
