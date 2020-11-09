# iCommerce Shop API

## Requirements

- [X] At least ​two​ backend application services to serve an API call operation. The example implementation ​must​ demonstrate inter-service communication between these services.

- [X] A high-level solution diagram for the components/infrastructure design if any.
- [X] Sequence diagram for a specific workflow.

- [] Entity relationship diagram for the database.
- [] Some level of testing should be implemented. *(Unit Test only, not fully covered)*

- [X] Software development principles, patterns & practices being applied
- [X] Code folder structure and the libraries / frameworks being used.
- [X] All the required steps in order to get the applications run on local
computer.
- [X] CURL commands to verify the APIs. *Using Postman collection attached inside repo*

## High Level Design

![Architecture Design](<https://github.com/thanhlam2410/iComerce/blob/master/iCommerce-design.png>)

## Common Use Cases

![Common Use Cases](<https://github.com/thanhlam2410/iComerce/blob/master/iCommerce-use-case.png>)

- User is able to query their products
- User is able to query shop hotline for placing order
- Admin is able to update product's availability
- Admin is able to create order on behalf of users then send confirmation email to users
- Order and Search is logged into analytic server

## Pre-requisites

- MongoDB server for storage (<https://docs.mongodb.com/manual/installation/>)
- Redis server for state storage (<https://redislabs.com/>)
- RabbitMQ for transfering messages (<https://www.rabbitmq.com/download.html>)
- Countly server for logging (<https://count.ly/>)

## Configure and Run Admin Service

[a relative link](admin/README.md.md)

## Configure and Run Product Service

[a relative link](products/README.md.md)

## Technical Stack

- MongoDB, Redis
- RabbitMQ
- Countly
- NodeJS
- Typescript
- Jest
- Docker

## Patterns

### Functional Programming

- Provide flexibility for organizing the code and testing
- Easily for de-coupling and reuse

### Microservices

- Divide the application into smaller part based on business view (Users, Admins)
