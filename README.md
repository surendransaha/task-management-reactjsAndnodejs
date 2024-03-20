**How to run our application:**

**backend:**
--------
open in command promt for folder "MC-Task-Management/todotaskbackend"
run,
 1. npm install
 2. npm start
 
**frontend:**
--------
open in command promt for folder "MC-Task-Management/todotaskfrontend"
run,
 1. npm install
 2. npm start

--------------------------------------------------------------------------------------------------------------------------------------------------

**Api Details:**

**1. Get**:
**url** : http://localhost:8080/api/todo?page=1&limit=10

**2. Post**:
**url** : http://localhost:8080/api/todo

{
    "title":"evening task",
    "description":"create a section",
    "dueDate":"2024-01-11",
    "priority": "high",
    "status" : 1
}

**3. Update**:
**url** : http://localhost:8080/api/todo/update-todo

{
    "title":"evening task updated",
    "description":"create a section",
    "dueDate":"2024-01-11",
    "priority": "high",
    "status" : 1,
    "id": "65f819e78978754c083243ef"
}


**4. Delete - Soft Delete**

**url** : http://localhost:8080/api/todo/update-status
{
    "status" : 2,
    "id": "65f819e78978754c083243ef"
}

-----------------------------------------------------------------------------------------------------------------------------------------------------

**Front-end Details**:

**Add Task**: ![MC-Add-Task](https://github.com/surendransaha/MC-Task-Management/assets/71213725/b907f2f4-50cf-4278-a9ce-d42d882f3bec)

**List Task**: ![MC-List-Task](https://github.com/surendransaha/MC-Task-Management/assets/71213725/945c9a77-331d-4d57-bb4e-c335dcbca791)

**Edit Task**: ![MC-Edit-Task](https://github.com/surendransaha/MC-Task-Management/assets/71213725/98c78bdf-61e2-4358-ab83-7709c93ebf07)

**Detele Task**: ![MC-Delete-Task](https://github.com/surendransaha/MC-Task-Management/assets/71213725/95a6fac9-9a81-49fb-b2e1-0b5427a22ab0)

------------------
