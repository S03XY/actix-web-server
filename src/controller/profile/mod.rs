use actix_web::{HttpResponse, Responder};

pub async fn get_user() -> impl Responder {
    print!("getting user");
    HttpResponse::Ok().body("from get user")
}
