create schema yourqueen;
use yourqueen;
create table role
(
    role_id   int auto_increment primary key not null,
    role_name varchar(20)                    not null
);
create table status
(
    status_id   int auto_increment primary key not null,
    status_name varchar(10)                    not null
);
create table sex
(
    id   int primary key not null auto_increment,
    name varchar(10)     not null
);
create table account
(
    id        int primary key auto_increment not null,
    username  varchar(20)                    not null unique,
    password  varchar(20)                    not null,
    role_id   int                            not null,
    foreign key (role_id) references role (role_id),
    status_id int                            not null,
    foreign key (status_id) references status (status_id)
);

create table userDetails
(
    user_id  int,
    name     varchar(40) not null,
    sex_id   int,
    birthday date        not null,
    height   int,
    weight   int,
    foreign key (user_id) references account (id),
    foreign key (sex_id) references sex (id)
);
create table product
(
    product_id   int primary key auto_increment not null,
    product_name varchar(40)                    not null,
    price        int                            not null,
    provider_id  int                            not null,
    foreign key (provider_id) references account (id),
    description  text
);
create table invoice
(
    invoice_id  int primary key auto_increment not null,
    date        date                           not null,
    provider_id int                            not null,
    user_id     int                            not null,
    foreign key (provider_id) references account (id),
    foreign key (user_id) references account (id)
);
create table invoiceDetails
(
    invoice_id int,
    product_id int,
    discount   int,
    foreign key (invoice_id) references invoice (invoice_id),
    foreign key (product_id) references product (product_id)
);
create table picture
(
    user_id    int,
    foreign key (user_id) references account (id),
    link_avt   text,
    link_pic_1 text,
    link_pic_2 text,
    link_pic_3 text,
    link_pic_4 text,
    text_1     text,
    text_2     text,
    text_3     text
);

create table imgCarousel
(
    id  int not null primary key auto_increment unique,
    url text
);


INSERT INTO role (role_name)
VALUES ('admin');
INSERT INTO role (role_name)
VALUES ('provider');
INSERT INTO role (role_name)
VALUES ('user');

INSERT INTO sex (name)
VALUES ('male');
INSERT INTO sex (name)
VALUES ('female');

INSERT INTO status (status_name)
VALUES ('ready');
INSERT INTO status (status_name)
VALUES ('not ready');

INSERT INTO account (username, password, role_id, status_id)
VALUES ('admin', '1', 1, 1);
INSERT INTO account (username, password, role_id, status_id)
VALUES ('manman', '1', 2, 2);
INSERT INTO account (username, password, role_id, status_id)
VALUES ('layla', '1', 2, 2);
INSERT INTO account (username, password, role_id, status_id)
VALUES ('NganNT', '1', 2, 2);
INSERT INTO account (username, password, role_id, status_id)
VALUES ('LinhTM', '1', 2, 1);
INSERT INTO account (username, password, role_id, status_id)
VALUES ('baby', '1', 2, 1);
INSERT INTO account (username, password, role_id, status_id)
VALUES ('shiro', '1', 2, 1);
INSERT INTO account (username, password, role_id, status_id)
VALUES ('yuni', '1', 2, 2);
INSERT INTO account (username, password, role_id, status_id)
VALUES ('chaoo', '1', 2, 2);
INSERT INTO account (username, password, role_id, status_id)
VALUES ('ju', '1', 3, 2);
INSERT INTO account (username, password, role_id, status_id)
VALUES ('Hoan', '1', 3, 2);
INSERT INTO account (username, password, role_id, status_id)
VALUES ('Huong', '1', 3, 2);
INSERT INTO account (username, password, role_id, status_id)
VALUES ('thaobb', '1', 3, 2);
INSERT INTO account (username, password, role_id, status_id)
VALUES ('haiac', '1', 3, 2);


INSERT INTO userdetails (user_id, name, sex_id, birthday, height, weight)
VALUES (2, 'Hương Hương ', 2, '2006-06-20 00:00:00', 170, 45);
INSERT INTO userdetails (user_id, name, sex_id, birthday, height, weight)
VALUES (3, 'Nguyễn Thị Khánh Huyền', 2, '2006-06-20 00:00:00', 180, 75);
INSERT INTO userdetails (user_id, name, sex_id, birthday, height, weight)
VALUES (4, 'Nguyễn Thu Ngân', 2, '2006-06-20 00:00:00', 180, 75);
INSERT INTO userdetails (user_id, name, sex_id, birthday, height, weight)
VALUES (5, 'Nguyễn Phương Anh', 2, '2006-06-20 00:00:00', 180, 75);
INSERT INTO userdetails (user_id, name, sex_id, birthday, height, weight)
VALUES (6, 'Trần Mỹ Linh', 2, '2006-06-20 00:00:00', 180, 75);
INSERT INTO userdetails (user_id, name, sex_id, birthday, height, weight)
VALUES (7, 'Trần Thanh Hoa', 2, '2006-06-20 00:00:00', 180, 75);
INSERT INTO userdetails (user_id, name, sex_id, birthday, height, weight)
VALUES (8, 'Nguyễn Thị Ngọc Trâm', 2, '2006-06-20 00:00:00', 180, 75);
INSERT INTO userdetails (user_id, name, sex_id, birthday, height, weight)
VALUES (9, 'Thùy Linh', 2, '2006-06-20 00:00:00', 180, 75);


INSERT INTO product (product_name, price, provider_id, description)
VALUES ('Nắm tay', 12, 2, 'Chỉ là nắm tay thôi');
INSERT INTO product (product_name, price, provider_id, description)
VALUES ('Nắm tay', 11, 3, 'Chỉ là nắm tay thôi');
INSERT INTO product (product_name, price, provider_id, description)
VALUES ('Nắm tay', 12, 4, 'Chỉ là nắm tay thôi');
INSERT INTO product (product_name, price, provider_id, description)
VALUES ('Nắm tay', 12, 5, 'Chỉ là nắm tay thôi');
INSERT INTO product (product_name, price, provider_id, description)
VALUES ('Nắm tay', 30, 6, 'Chỉ là nắm tay thôi');
INSERT INTO product (product_name, price, provider_id, description)
VALUES ('Nắm tay', 32, 7, 'Chỉ là nắm tay thôi');


INSERT INTO product (product_name, price, provider_id, description)
VALUES ('Hôn môi', 50, 3, 'Hôn thôi ông ê, tay chân để nguyên vị trí');
INSERT INTO product (product_name, price, provider_id, description)
VALUES ('Hôn môi', 35, 4, 'Hôn thôi ông ê, tay chân để nguyên vị trí');
INSERT INTO product (product_name, price, provider_id, description)
VALUES ('Hôn môi', 55, 5, 'Hôn thôi ông ê, tay chân để nguyên vị trí');
INSERT INTO product (product_name, price, provider_id, description)
VALUES ('Hôn môi', 34, 7, 'Hôn thôi ông ê, tay chân để nguyên vị trí');
INSERT INTO product (product_name, price, provider_id, description)
VALUES ('Hôn môi', 77, 8, 'Hôn thôi ông ê, tay chân để nguyên vị trí');
INSERT INTO product (product_name, price, provider_id, description)
VALUES ('Hôn môi', 52, 9, 'Hôn thôi ông ê, tay chân để nguyên vị trí');


INSERT INTO product (product_name, price, provider_id, description)
VALUES ('Đi tour', 5000, 4, 'Du lịch 2 ngày 1 đêm');
INSERT INTO product (product_name, price, provider_id, description)
VALUES ('Đi tour', 5000, 5, 'Du lịch 2 ngày 1 đêm');
INSERT INTO product (product_name, price, provider_id, description)
VALUES ('Đi tour', 5000, 6, 'Du lịch 2 ngày 1 đêm');
INSERT INTO product (product_name, price, provider_id, description)
VALUES ('Đi tour', 5000, 8, 'Du lịch 2 ngày 1 đêm');
INSERT INTO product (product_name, price, provider_id, description)
VALUES ('Đi tour', 5000, 9, 'Du lịch 2 ngày 1 đêm');


INSERT INTO invoice (date, provider_id, user_id)
VALUES ('2016-06-20', 2, 11);
INSERT INTO invoice (date, provider_id, user_id)
VALUES ('2011-10-11', 2, 12);
INSERT INTO invoice (date, provider_id, user_id)
VALUES ('2021-11-22', 2, 12);
INSERT INTO invoice (date, provider_id, user_id)
VALUES ('2019-10-30', 3, 14);
INSERT INTO invoice (date, provider_id, user_id)
VALUES ('2019-11-06', 4, 12);
INSERT INTO invoice (date, provider_id, user_id)
VALUES ('2018-12-04', 5, 13);
INSERT INTO invoice (date, provider_id, user_id)
VALUES ('2005-08-22', 9, 13);
INSERT INTO invoice (date, provider_id, user_id)
VALUES ('2018-04-27', 3, 11);
INSERT INTO invoice (date, provider_id, user_id)
VALUES ('2019-04-10', 4, 14);
INSERT INTO invoice (date, provider_id, user_id)
VALUES ('2021-04-1', 7, 12);
INSERT INTO invoice (date, provider_id, user_id)
VALUES ('2022-03-08', 8, 14);
INSERT INTO invoice (date, provider_id, user_id)
VALUES ('2022-05-12', 8, 11);

INSERT INTO invoicedetails (invoice_id, product_id)
VALUES (1, 1);
INSERT INTO invoicedetails (invoice_id, product_id)
VALUES (2, 3);
INSERT INTO invoicedetails (invoice_id, product_id)
VALUES (3, 2);
INSERT INTO invoicedetails (invoice_id, product_id)
VALUES (4, 13);
INSERT INTO invoicedetails (invoice_id, product_id)
VALUES (5, 17);
INSERT INTO invoicedetails (invoice_id, product_id)
VALUES (6, 4);
INSERT INTO invoicedetails (invoice_id, product_id)
VALUES (7, 5);
INSERT INTO invoicedetails (invoice_id, product_id)
VALUES (7, 12);
INSERT INTO invoicedetails (invoice_id, product_id)
VALUES (8, 3);
INSERT INTO invoicedetails (invoice_id, product_id)
VALUES (9, 1);
INSERT INTO invoicedetails (invoice_id, product_id)
VALUES (10, 5);
INSERT INTO invoicedetails (invoice_id, product_id)
VALUES (11, 11);
INSERT INTO invoicedetails (invoice_id, product_id)
VALUES (12, 5);
INSERT INTO invoicedetails (invoice_id, product_id)
VALUES (12, 8);

insert into imgcarousel(url) value ('https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/307137007_417997273807839_7247206086903916310_n.jpg?stp=dst-jpg_p640x640&_nc_cat=107&ccb=1-7&_nc_sid=8631f5&_nc_ohc=OX-XLVw4LZkAX-iI2mV&_nc_ht=scontent.fhan15-2.fna&oh=00_AfAZM3xUc1XcHS2RoxMUJb_DuQ_Rq8KJubcBWaTNwENLUA&oe=635F33A8');
insert into imgcarousel(url) value ('https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/242118187_4247804481955624_4879521228934339593_n.jpg?stp=dst-jpg_p640x640&_nc_cat=102&ccb=1-7&_nc_sid=8631f5&_nc_ohc=JNmqSQUsSsAAX9LFYx4&_nc_ht=scontent.fhan15-1.fna&oh=00_AfAxdlEVmN3l4r8HLPZUA5NF1wOtBpqHYXQVqk1BbFxyDA&oe=635F4567');
insert into imgcarousel(url) value ('https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/242318843_4269679526434786_1095755638687379465_n.jpg?stp=dst-jpg_p640x640&_nc_cat=109&ccb=1-7&_nc_sid=8631f5&_nc_ohc=ON_beGfMg70AX-7slJ8&_nc_ht=scontent.fhan15-1.fna&oh=00_AfCFEn6sCZah0ncpZQH2eGaAqx63mM_0uzgNEC2GV_g6Yg&oe=635F03FA');

insert into picture(user_id, link_avt, link_pic_1, link_pic_2) value (2,
                                                                      'https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/313049109_3296367190682505_5710967585206103207_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=102&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=KL6DTSL56lEAX_78mgy&_nc_ht=scontent.fsgn2-8.fna&oh=00_AT_bL8mKe2LaN2_xa4ZvS4t6Gu19svD20-zKszMkuMvnXg&oe=635DE0A5',
                                                                      'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/310245031_612770827164971_907319404441024726_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=111&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=-2oloOrutuEAX_Esskg&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT_72YY9S2n7GcWtOKLPMPkpXnCkg21dJu4jmU3LhtHpsA&oe=635DCA03',
                                                                      'https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-6/307306038_602464304862290_3826572744375493180_n.jpg?stp=dst-jpg_p720x720&_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=khL6r8nk25kAX8-y0sm&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT9rjI0CLkw5hp6UtH7CcqXdL48S08-YIYewFz-8BzPHWg&oe=635DDF3F');
insert into picture(user_id, link_avt) value (3,
                                              'https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.6435-9/180496505_2881240708861824_8193348717570308990_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=111&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=mBtbvye0SrMAX8ktW4U&tn=LDvXWjC7JwMpkFk0&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT_UgQsX-m57FS5WT7AoWDZ6Ecu_12iQd4yBW1OG8_LMhA&oe=637E2FAE');
insert into picture(user_id, link_avt) value (4,
                                              'https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-6/307534098_3262931704026054_4639029628021644345_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=Gi3YFIVyD68AX-UKeXe&tn=LDvXWjC7JwMpkFk0&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT_q3587GZtRw51BaoK_MLTd7UFOVc6vp7qDV-4l6G5dKw&oe=635D8DB0');
insert into picture(user_id, link_avt) value (5,
                                              'https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/312050274_784206216218155_7399498721312237529_n.jpg?stp=dst-jpg_p720x720&_nc_cat=109&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=1oDeaHB-BFgAX_OJxY3&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT8NGmhmAP-1Bgd0O0Merokt2H3JUUn-S3z1RzcFzgvf-g&oe=635DBC0F');
insert into picture(user_id, link_avt) value (6,
                                              'https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-6/310341771_784206229551487_5240146300332704579_n.jpg?stp=dst-jpg_p720x720&_nc_cat=105&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=PN9Yjdg3yU8AX-1KE9A&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT8DJk5__u-w5Z1UgzWYgHfrqtL1GXwMACknWEf7UwsE0Q&oe=635D9BA9');
insert into picture(user_id, link_avt) value (7,
                                              'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/227901907_507839990521447_408280691648925920_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=yzJ6pnsq1oUAX-XhwzB&_nc_ht=scontent.fsgn2-7.fna&oh=00_AT_mLdRxGLyc2aNCAF5PiiTI9LqhZ3QGXtKLHmYx_C2F6g&oe=635EB38A');
insert into picture(user_id, link_avt) value (8,
                                              'https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/305579663_1412676205925566_1577667346099805598_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=YjMox2KqFjIAX9Y2qd9&tn=LDvXWjC7JwMpkFk0&_nc_ht=scontent.fsgn2-8.fna&oh=00_AT_YsnzzwdPSptxqyuTdReMbVQyX8sRq34DJxfgu7QFXFw&oe=635DFBCE');
insert into picture(user_id, link_avt) value (9,
                                              'https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/296189244_1350179815508539_8238585547797524218_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=HcfLQbMSPWkAX9MKlao&tn=LDvXWjC7JwMpkFk0&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT_s-0lfwwi6z5f8L1dUf2NeD5dwnQHo1YSRO38pMUSs4Q&oe=635DFA58');
insert into picture(user_id, link_avt) value (10,
                                              'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/292237381_1335231470336707_5467144174737487355_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=108&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=BTh37qtd9nAAX8-TOqM&tn=LDvXWjC7JwMpkFk0&_nc_ht=scontent.fsgn2-7.fna&oh=00_AT9UaBQxFZ72f79OMY1AjFLBZFoBQxkUPz6nqJLC6Roi_Q&oe=635E31C8');
insert into picture(user_id, link_avt) value (11,
                                              'https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/242268737_3199478433705931_1526097102650225369_n.jpg?stp=dst-jpg_p960x960&_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=ztUrmzz0pn0AX-v12kE&tn=LDvXWjC7JwMpkFk0&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT8ztsNzE7fHwK_VFqZoWchH9LBfpamNkiNRJFxOi2nVzA&oe=635E4528');
insert into picture(user_id, link_avt) value (12,
                                              'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/240520040_3203271799993261_4138831616037063344_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=104&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=KizUlq6Tm58AX-jwfg_&_nc_ht=scontent.fsgn2-5.fna&oh=00_AT9yhVaBn0FhmpRVU2Zk3RBaVP8iNVep3aOQzVnuHGZOGw&oe=635D12C4');
insert into picture(user_id, link_avt) value (13,
                                              'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/307961761_3480089768978128_3516794983199891482_n.jpg?stp=cp6_dst-jpg_s1080x2048&_nc_cat=110&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=huAArg8Pi9wAX-POamg&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT_jHxxLltOxt_htH-CaA0coOHh0d6EHFM-bfTW9n75qwg&oe=635DB911');
insert into picture(user_id, link_avt) value (14,
                                              'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/311176893_619048679870519_6701219411942221802_n.jpg?stp=dst-jpg_p960x960&_nc_cat=111&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=ifHiluxmjKUAX_-lm6r&_nc_oc=AQmjk18mpQhS02KWQgqyofbqT5v2zkT0o0FnlwNKtcSAKs_LdV1suKHSYl6IUMf6dZk&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT867SrsMDzlygiFpRWUwPS1hra5AcxzHjD_1v-0BhZOKg&oe=635D07EE');
# insert into picture(user_id, link_avt) value (17,
#                                               'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/285426238_329199829373636_8391452016900534383_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=104&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=QVi2PAmO3PgAX-WqReW&_nc_ht=scontent.fsgn2-5.fna&oh=00_AT8AtZyydZ85Io3ZD1fOpFaXy45q13SbH5wFJzzey8TB2A&oe=635DE824');
# insert into picture(user_id, link_avt) value (18,
#                                               'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/306604128_407877018172583_8103860650196199788_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=diF9gh4fVJcAX_5d0-0&tn=LDvXWjC7JwMpkFk0&_nc_ht=scontent.fsgn2-5.fna&oh=00_AT_dZjm1QjLDEtHKfvkD4bI6hnL8Gi02NDuoA-5P9CBghw&oe=635CF073');
# insert into picture(user_id, link_avt) value (19,
#                                               'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/310437865_411819821111636_627825820159425833_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=111&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=V7NIkJzvOiYAX_Mm6qa&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT8Cqlvymo_Sw7DTU10llxu3uQvw2J-XsvhGfgqbTtuj6g&oe=635E663A');
# insert into picture(user_id, link_avt) value (20,
#                                               'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/278283940_2123572977809104_2729596876575842409_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=108&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=IkBfv2PJGngAX-oXrMJ&_nc_ht=scontent.fsgn2-7.fna&oh=00_AT-gVW4sNGydwyXtuJcO5IZ6FZi_-GJ2ee6hV0eRETVVPA&oe=635D4D85');
# insert into picture(user_id, link_avt) value (21,
#                                               'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/278566769_2132266136939788_6514663510898475617_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=104&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=F-uJSj2rJ6QAX-O2XUl&tn=LDvXWjC7JwMpkFk0&_nc_ht=scontent.fsgn2-5.fna&oh=00_AT9pu9rgOhFLmD5wfsI7kNtCxWIawmxS4EXD_hdk6SNJPQ&oe=635EC047');
# insert into picture(user_id, link_avt) value (22,
#                                               'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/279251853_2139712409528494_1590704873757916331_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=mZf3JecOAtgAX8uIyeN&_nc_ht=scontent.fsgn2-7.fna&oh=00_AT9sFr9uViHIVmFBe_2g1GDotIAAfuWM2KAH3DREOubwNw&oe=635E0DB5');
# insert into picture(user_id, link_avt) value (23,
#                                               'https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/278789424_524767245669063_6186607262634949124_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=109&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=jZoHrZ4v_rQAX_k7KXp&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT8n9daeQAYpD_B2Di-aT8s8gzu_926Lgj6P9yUOuR0sjQ&oe=635DA064');
# insert into picture(user_id, link_avt) value (24,
#                                               'https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/281394285_543131910499263_947098679672361167_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=ydAiFK3E6pAAX8ekUBn&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT9cZw3GEJoQlE9gJYG2mcFmDCpG4K6wr0C1fGjKpeUQ4Q&oe=635ED40F');
# insert into picture(user_id, link_avt) value (25,
#                                               'https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/306622740_620095526136234_6060908459662538154_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=PWMkgtEU3mgAX-gL5al&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT_xXJvMq3ke8Qdo5U6O0ylAEsuZ9GJFbOuw5rhQ1lcLZw&oe=635E1464');
# insert into picture(user_id, link_avt) value (26,
#                                               'https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/277079191_689580712175813_4363856384398448121_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=qsXsNwTzj7wAX-jl_cp&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT_QXmNYEIlF3Ygty7XRU4F3G-mrqeF6SpI6hZ4NPM_3VA&oe=635D71A5');
# insert into picture(user_id, link_avt) value (27,
#                                               'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/290861607_747890213011529_2239305119730075386_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=uAwwNhMkvKEAX8AQmYu&_nc_ht=scontent.fsgn2-5.fna&oh=00_AT9zy7_q3JNmXWyjQMN5Vfza-MEuacDguOrp9V2zNwZUGQ&oe=635CEECD');
# insert into picture(user_id, link_avt) value (28,
#                                               'https://scontent.fsgn2-2.fna.fbcdn.net/v/t39.30808-6/278648656_706669643800253_354255430990783689_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=174925&_nc_ohc=Do6gGBQySCkAX9afWjV&_nc_ht=scontent.fsgn2-2.fna&oh=00_AT9wmBMZFmSJR1zLiV5AuVzUvPMrJYpUYY80zimLBmjRdw&oe=635D1EC3');

