####

The project is REST API (API First) + MVC
For API clients

use a header "requestPath" and set its value to "API" for every request that you made.
Why is it necessary?
-> For handling Undefined / Wrong paths
-> We are using microservices structure
-> we are sending responses in json to API Clients and rendering Views.
-> To differenciate we need headers. You cannot access routes other than /api/...
--> If header "requestPath" is missing, you cannot access api routes
