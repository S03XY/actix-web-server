use actix_web::web;

use crate::controller::user::user::{called_from_config, get_user_from_config};
pub const GET_USER: &str = "/user/get_user";

pub fn user_config(cfg: &mut web::ServiceConfig) {
    cfg.route("/get_from_config", web::to(get_user_from_config));
}

pub fn user_config_from_attr(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/user").service(called_from_config));
    // cfg.service(called_from_config)
    // cfg.service(web::resource("/resource").route(web::to(get_user_from_config))); // in resource we can get get post patch delete request
    // cfg.service(web::resource("/resource").route(web::to(get_user_from_config))); // in resource we can get get post patch delete request
}
