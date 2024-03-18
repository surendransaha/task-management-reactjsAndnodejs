Api Details:

Get:
http://localhost:8080/api/todo?page=1&limit=10


Post:
http://localhost:8080/api/todo

{
    "title":"evening task",
    "description":"create a section",
    "dueDate":"2024-01-11",
    "priority": "high",
    "status" : 1
}

Update:
http://localhost:8080/api/todo/update-todo

{
    "title":"evening task updated",
    "description":"create a section",
    "dueDate":"2024-01-11",
    "priority": "high",
    "status" : 1,
    "id": "65f819e78978754c083243ef"
}


Delete - Soft Delete

http://localhost:8080/api/todo/update-status
{
    "status" : 2,
    "id": "65f819e78978754c083243ef"
}

---------------------------------------------------------------------------------------------------------

Front-end Details:
------------------