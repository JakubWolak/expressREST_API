# expressREST_API
Zadanie rekrutacyjne dla firmy Crypto Voucher

## Opis
Proste REST API służące do zarządania postami

## Wykorzystane technologie
- backend => express.js
- API authorization => JWT
- database => PostgreSQL


## Uruchomienie
### Tworzenie bazy danych w konsoli psql
- ```CREATE USER psqluser WITH PASSWORD '1234';```
- ```CREATE DATABASE psqldb OWNER psqluser;```
- ```ALTER USER psqluser WITH SUPERUSER;```
### Klonowanie repozytorium
- ```git clone https://github.com/JakubWolak/expressREST_API.git```
- ```cd expressREST_API```
- ```npm install```
- ```npx sequelize db:migrate```
- ```npm run start```
- Teoretycznie powinno teraz działać :D

- node v14.2.0


## Wskazówki
Aby rozpocząć korzystanie z REST API należy zarejestrować konto, następnie zalogować się. Uzyskany "token" należy przekazywać jako nagłówek "Authorization" w formacie "Bearer token". Po ustawieniu odpowiedniego nagłówka można rozpocząć korzystanie z funkcji modyfikacji postów.

## REST API

### Konta użytkowników

#### ✅ Rejestracja
- przykładowa struktura pozytywnej odpowiedzi
```bash
{
    "success": true,
    "message": "User created successfully",
    "data": {
        "user": {
            "id": "00459d15-70e7-462e-a5ec-b8dda1403e97",
            "username": "grzegorz"
        }
    }
}
```
- przykładowa struktura negatywnej odpowiedzi
```bash
{
    "success": false
    "message": "Password is too long or empty"
}
```

##### POST /api/register
- tworzy nowego użytkownika
- struktura zapytania
```bash
{
    "username": "grzegorzbrzeczyszczykiewicz",
    "password": "password"
}
```
- Argumenty:
- username : string, 1 - 100 znakow,
- password : string, 9 - 100 znakow

#### ✅ Logowanie
- przykładowa struktura pozytywnej odpowiedzi
```bash
{
    "success": true,
    "message": "You are logged in",
    "token": "eyJhbGciOiJIUzI1NiJ9.Z3J6ZWdvcnox.GfHgMuTTJcGmzV5II3AV0rz46V5sJ_Xn03iZ_d_0uK4"
}
```
- przykładowa struktura negatywnej odpowiedzi
```bash
{
    "success": false,
    "message": "Password is too short"
}
```

##### POST /api/login
- loguje zarejestrowanego użytkownika i zwraca token
- struktura zapytania
```bash
{
    "username": "grzegorzbrzeczyszczykiewicz",
    "password": "password"
}
```
- Argumenty:
- username : string, 1 - 100 znakow,
- password : string, 9 - 100 znakow


### Posty

#### ✔️ Dodawanie Postów
- przykładowa struktura pozywytnej odpowiedzi
```bash
{
    "success": true,
    "message": "Post has been created successfully",
    "data": {
        "posts": {
            "id": "78179632-0ba0-4e21-9c4c-2b4a354e2e15",
            "title": "title",
            "lead": "lead",
            "content": "content",
            "updatedAt": "2020-08-05",
            "createdAt": "2020-08-05"
        }
    }
}
```
- przykładowa struktura negatywnej odpowiedzi
```bash
{
    "success": false,
    "message": "Value of lead can not be empty"
}
```
##### POST /api/posts
- dodaje nowy post
- struktura zapytania
```bash
{
    "title": "exampletitle",
    "lead": "examplelead",
    "content": "examplecontent"
}
```
- Argumenty:
- title : string, 1 - 100 znaków,
- lead : string, 1 - 100 znaków,
- content : string, 1 - 1000 znaków

#### ✔️ Edycja Postów
- przykładowa struktura poprawnej odpowiedzi
```bash
{
    "success": true,
    "message": "Post has been updated successfully",
    "data": {
        "posts": [
            1
        ]
    }
}
```
- przykładowa struktura negatywnej odpowiedzi
```bash
{
    "success": false,
    "message": "Value of lead can not be empty"
}
```
##### PATCH /api/posts/{id}
- aktualizuje jedną lub więcej własności posta jednorazowo
- wymaga podania ID posta w adresie url
- struktura zapytania (może zawierać dowolną z trzech wartości [title, lead, content] lub kilka z nich)
```bash
{
    "title": "exampletitle",
    "lead": "examplelead"
}
```
- Argumenty:
- title : string, 1 - 100 znaków,
- lead : string, 1 - 100 znaków,
- content : string, 1 - 1000 znaków

#### ✔️ Pobieranie Postów
- przykładowa struktura poprawnej odpowiedzi
```bash
{
    "success": true,
    "message": "Posts have been found succesfully",
    "data": {
        "posts": [
            {
                "id": "dcc1ff4f-1199-4ea8-8395-10e8503b46bc",
                "title": "edytowany tytul",
                "lead": "sga",
                "content": "asdfashgasdhgasd",
                "createdAt": "2020-08-04",
                "updatedAt": "2020-08-04"
            },
            {
                "id": "acd1af20-1a5d-4312-abe5-cf4288e1cf91",
                "title": "edytowany tytul",
                "lead": "sga",
                "content": "asdfashgasdhgasd",
                "createdAt": "2020-08-04",
                "updatedAt": "2020-08-04"
            }
}
```
- przykładowa struktura negatywnej odpowiedzi
```bash
{
    "success": false,
    "message": "Invalid post's ID given"
}
```
##### GET /api/posts/{id}
- pobiera dane jednego posta jednorazowo
- wymaga podania ID posta w adresie url
- brak struktury zapytania, wymagane jedynie ID posta

##### GET /api/posts
- pobiera wszystkie dodane posty
- w przypdaku braku postów w bazie, tablica "posts" jest pusta

#### ✔️ Usuwanie Postów
- przykładowa struktura prawidłowej odpowiedzi
```bash
{
    "success": true,
    "message": "Post have been deleted successfully"
}
```
- przykładowa struktura negatywnej odpowiedzi
```bash 
{
    "success": false,
    "message": "Invalid post's ID given"
}
```

##### DELETE /api/posts/{id}
- usuwa pojedynczy post
- wymaga podania ID posta w adresie url
- brak struktry zapytania, wyamagane jedynie ID posta

##### DELETE /api/posts/
- usuwa wszystkie posty

