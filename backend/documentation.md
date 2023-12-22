REGISTER
url = https://readrave-3ki6jankma-uc.a.run.app/regist
method = POST
request body =
    {
    "name":"malik",                 string
    "email":"malik@gmail.com",      string 
    "password": "hallo",            string
    "confPassword":"hallo"          string
}
respon = "msg": "Register Berhasil"
respon password sama = msg: "Password dan Confirm Password tidak cocok"
respon = msg: "Email atau username sudah digunakan"

GETALLBOOKS
https://readrave-3ki6jankma-uc.a.run.app/books
method = GET
Respon = res.json(books);
{
"id_user": null,                                                                    INT
        "id": 27,                                                                   INT      
        "book_id": 1,                                                               INT        
        "isbn": 439785960,                                                          INT
        "authors": "J.K. Rowling, Mary GrandPré",                                   STRING
        "original_publication_year": 2005,                                          FLOAT
        "title": "Harry Potter and the Half-Blood Prince (Harry Potter, #6)",       STRING
        "average_rating": 4.54,                                                     FLOAT
        "ratings_count": 1678823,                                                   INT
        "small_image_url": "https://images.gr-assets.com/books/1361039191s/1.jpg"   STRING
}

