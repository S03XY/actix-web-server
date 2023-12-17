use actix_web::{web, App, HttpServer};

mod controller;
mod routes;

use crate::controller::profile::get_user;
use crate::routes::user::GET_USER;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().route(GET_USER, web::to(get_user)))
        .bind(("127.0.0.1", 3000))?
        .run()
        .await
}
