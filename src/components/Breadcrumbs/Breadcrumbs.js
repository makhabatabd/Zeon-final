import React from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import "./Breadcrumbs.css";

function toTitleCase(str) {
  if (str === "about") {
    return "О нас";
  }
  if (str === "help") {
    return "Помощь";
  }
  if (str === "news") {
    return "Новости";
  }
  if (str === "offerta") {
    return "Публичная офферта";
  }
  if (str === "collection") {
    return "Коллекции";
  }
  if (str === "summer") {
    return "Лето 2022";
  }
  if (str === "favorite") {
    return "Избранное";
  }
  if (str === "details") {
    return "Вечернее платье";
  }
  if (str === "cart") {
    return "Корзина";
  }
  if (str === "auth") {
    return "Авторизация";
  }
  if (str === "history") {
    return "История покупок";
  }
  if (str === "everyday") {
    return "Повседневная одежда";
  }
  if (str === "jeans") {
    return "Джинсы";
  }
  if (str === "skirts") {
    return "Юбки";
  }
  if (str === "beach") {
    return "Одежда на пляж";
  }
  if (str === "passwordreset") {
    return "Восстановление пароля";
  }
}

export default function BasicBreadCrumbs() {
  let location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <div className="container">
      {pathnames.length > 0 && pathnames.length !== 2 ? (
        <Breadcrumbs className="breadcrumps" style={{ textDecoration: "none" }}>
          <Link
            style={{ textDecoration: "none", color: "#393939" }}
            className="link"
            component={RouterLink}
            to="/"
          >
            Главная
          </Link>
          {location.pathname == "/summer" ? (
            <Link
              style={{ textDecoration: "none", color: "#393939" }}
              className="link"
              component={RouterLink}
              to="/collection"
            >
              Коллекции
            </Link>
          ) : null}
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            return last ? (
              <Typography
                sx={{ fontSize: "14px", fontWeight: "500" }}
                className="typo"
                key={to}
              >
                {toTitleCase(value)}
              </Typography>
            ) : (
              <Link color="inherit" component={RouterLink} to="/" key={to}>
                {toTitleCase(value)}
              </Link>
            );
          })}
        </Breadcrumbs>
      ) : null}
    </div>
  );
}
