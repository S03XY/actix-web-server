use actix_web::{web, App, HttpServer};
use env_logger;

mod controller;
mod routes;

use crate::controller::user::user::get_user;
use crate::routes::user::GET_USER;
use crate::routes::user::{user_config, user_config_from_attr};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
    HttpServer::new(|| {
        App::new()
            .configure(user_config)
            .configure(user_config_from_attr)
            .route(GET_USER, web::to(get_user))
    })
    .bind(("127.0.0.1", 3000))?
    .run()
    .await
}

// app.service -> attribute function , web::resource -> routes , routes-> web::to or you can use configs
// components -> server, app
