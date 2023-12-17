use actix_web::{web, App, HttpServer};
use env_logger;

mod controller;
mod routes;

use crate::controller::profile::get_user;
use crate::routes::user::GET_USER;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
    HttpServer::new(|| App::new().route(GET_USER, web::to(get_user)))
        .bind(("127.0.0.1", 3000))?
        .run()
        .await
}

// app.service -> attribute function , web::resource -> routes , routes-> web::to
