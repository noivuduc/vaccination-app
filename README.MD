# Vaccination Booking App

## Use Cases

COVID-19 is a global pandemic and to allow country wide activities to resume, vaccinations are
introduced to decrease the death rate from the infection.
You are tasked to build a reservation system for COVID-19 vaccinations in Singapore.
This means a user should at least be able to schedule their 1st vaccination dose. Each
vaccination centre has a different number of nurses that work on different days; the amount of
patients each centre can handle will differ.
The system should support following features:
Support multiple vaccination centres in Singapore

+ Keep into account the daily supply of the nurses for each centre and their duty schedule
+ Model the daily capacity of a centre and accordingly allocate the vaccination slots to
the residents
+ Support CRUD operations for the slot reservation
+ Avoid double reservation (What happens if the same user books again?)
+ The solution should handle the resource contention (What happens if 2 different users
book the same time slot?)

## Author

**Vu Duc Noi**@Software Engineer

## Tech stack

+ **Node.js** version **14.xx**
+ **MongoDB** version **4.x**
+ **Express** version **4.16.2**

## Project structure

![alt text](https://i.ibb.co/1z1q5Qg/Screenshot-2021-11-15-at-6-27-41-PM.png)

## What I have done?

+ List all the vaccination centre
+ List all schedule of a vaccination centre
+ Create schedule
+ Create a vaccination reservation
+ View the reservation details
+ Update the reservation
+ Handling the resource contention case if 2 different users book the same time slot

## What need to be improved?

+ Add validation for the input
+ Integrate Front-end
+ Remind user for the reservation
+ Send an email/sms to inform about the reservation

## Assumption

+ User will need to login via SingPass app
+ Each vaccination will have **X** nurses, and there are 2 shifts. Shift one from 8AM to 2PM, shift two from 2PM to 8PM. 
+ Time needs to take one vaccination is 5 minutes.
+ Time slot will be 8:00, 8:05, ...
+ Maximum user for each slot is: **X(number of nurse) / 2**
+ User can only book the vaccination centre that has scheduled.
+ Admin has to create schedules for each vaccination centre.

## How to run?

```bash
# install the package
npm install

# start the application
npm start
```
After starting the application:
1. Create vaccination centre if any
2. Create schedule for the vaccination centre
3. List all schedule of the vaccination centre
4. Place the booking
5. View booking details.

## API Documentation

### List all vaccination centre

```http
GET http://localhost:8080/centre
```

#### Responses

```json
{
    "status": 200,
    "data": [
        {
            "_id": "618f2dd37a292b3b2e4faab1",
            "name": "76A Redhill",
            "address": {
                "street": "76A Redhill"
            },
            "__v": 0,
            "numberOfNurse": 10
        }
    ]
}
```

### Get schedules

```http
GET http://localhost:8080/schedule/:centreId
```

#### Responses

```json
{
    "status": 200,
    "data": [
        {
            "_id": "619113e702a7c23bf2042fd5",
            "timeSlot": "2021-11-15T00:00:00.000Z",
            "capacity": 5,
            "used": -2,
            "vaccinationCentre": "618f2dd37a292b3b2e4faab1",
            "__v": 0
        },
        {
            "_id": "619113e702a7c23bf2042fd8",
            "timeSlot": "2021-11-15T00:15:00.000Z",
            "capacity": 5,
            "used": 3,
            "vaccinationCentre": "618f2dd37a292b3b2e4faab1",
            "__v": 0
        },
        {
            "_id": "619113e702a7c23bf2042fda",
            "timeSlot": "2021-11-15T00:25:00.000Z",
            "capacity": 5,
            "used": 1,
            "vaccinationCentre": "618f2dd37a292b3b2e4faab1",
            "__v": 0
        }
]
}
```

### Make reservation

```http
POST http://localhost:8080/booking
body {
{
    "centre": "618f2dd37a292b3b2e4faab1",
    "user": {
        "fin":  "G7812384F5",
        "name": "Lucy Nas",
        "address": {
            "street": "76A Redhill",
            "floor": 7,
            "number": 8
        },
        "gender": "male",
        "birthdate": "14-06-1993"
    },
    "timeSlotId": "619113e702a7c23bf2042fd8"
}
}
```

#### Responses
```json
{
    "status": 201,
    "message": "You have successfully booked your slot"
}
```

### View Reservation details

```http
GET http://localhost:8080/booking/:bookingId
```

#### Responses
```json
{
    "status": 200,
    "data": {
        "_id": "619124faf40bae4a2cfb3737",
        "vaccinationCentre": {
            "_id": "618f2dd37a292b3b2e4faab1",
            "name": "76A Redhill",
            "address": {
                "street": "76A Redhill"
            },
            "__v": 0,
            "numberOfNurse": 10
        },
        "schedule": "619113e702a7c23bf2042fda",
        "status": "ONGOING",
        "user": {
            "fin": "G7812384F5",
            "name": "Lucy Nas",
            "address": {
                "street": "76A Redhill",
                "floor": 7,
                "number": 8
            },
            "gender": "male",
            "birthdate": "14-06-1993"
        },
        "dateTime": "2021-11-15T00:25:00.000Z",
        "__v": 0
    }
}
```
### Update reservation

```http
PUT http://localhost:8080/booking/:bookingId
body {   
    "centre": "618f2dd37a292b3b2e4faab1",
    "timeSlotId": "619113e702a7c23bf2042fda"
}
```



### List all reservations

```http
GET http://localhost:8080/booking?page=<page>&limit=<item per page>
```

#### Responses
```json
{
    "status": 200,
    "data": [
        {
            "_id": "618f373edf8009fdc0afdab7",
            "vaccinationCentre": {
                "_id": "618f2dd37a292b3b2e4faab1",
                "name": "76A Redhill",
                "address": {
                    "street": "76A Redhill"
                },
                "__v": 0,
                "numberOfNurse": 10
            },
            "status": "ONGOING",
            "user": {
                "fin": "G781239F",
                "name": "Lucy Nas",
                "address": {
                    "street": "76A Redhill",
                    "floor": 7,
                    "number": 8
                },
                "gender": "male",
                "birthdate": "14-06-1993"
            },
            "dateTime": "2021-11-13T10:00:00.000Z",
            "__v": 0
        }]
}
```

### Add schedule

```http
POST http://localhost:8080/schedule
body {
    "centreId": "618f2dd37a292b3b2e4faab1",
    "dateFrom": "2021-11-22",
    "dateTo": "2021-11-22"
}
```

### Create vaccination centre

```http
POST http://localhost:8080/centre
body {
    "name": "Queentown community centre",
    "address": {
        "street": "Queentown",
        "number": "09-21"
    },
    "numberOfNurse": 20
}
```
