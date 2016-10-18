--this script written for MariaDB 10.1 https://mariadb.org/

create database steam2;

use steam2;

create table if not exists games (
  appid int not null,
  name varchar(1000) not null,
  primary key (appid)
);

create table if not exists heatmap (
  steamid varchar(50) not null,
  date date not null,
  minutes int not null,
  primary key (steamid, date)
);

create table if not exists recentlyPlayed (
  steamid varchar(50) not null,
  date date not null,
  appid int not null,
  name varchar(1000) not null,
  playtime_2weeks int not null,
  playtime_forever int not null,
  img_icon_url varchar(255),
  img_logo_url varchar(255),
  primary key (steamid, date)
);
