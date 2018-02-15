Expedia Hotels Offers App

In this project I'am using multiple technologies to achieve the development stack. The main idea was to spearate the FE from the BE for many reasons includeing:
1- Only the requests that matter the BE side will reach the backend server, and only the requests that matter the FE will reach the FE.
2- Let the FE server worry about handling the assets and FE relevant load.
3- More scalable, we usually need less FE servers on production than BE servers.
4- BE this way can support multiple clients like FE, mobile, ..etc.
5- Easier to move to the Microservices architecture.
6- Separating the development stack allows us to let more people specialized in something to work without worrying about things he/she doesn't care about (easier for team management).


## FE stack
Nodejs - Express server to host the application
Angular for FE routing, two way databinding, layouting, ..etc
html5
css, ssas
jquery
bootstrap


## BE stack
- Language: Java
Java is one of the most used language for enterprise purposes. It is robust compiled language.

I have around 7 years of experience in using Java for web development and android so I am comfortable with it.

Despite that I have the capability to develop web applications using other languages like: Nodejs, Python and C#.
But when I have the choice I always go for Java.

-Frameworks:
Spring boot: a very robust framework for developing web applications using Java, it provides a robust code architecture and data flow.
It provides dependancy injection and tens of integrations for data, security or web

Internally it uses Spring MVC for exposing APIs and Spring security to manage the application security.


So the Expedia App uses the data flow as follows:
User requests the page on the browser with chosing some search filters
--> browser executes an angular http ajax request to the backend
--> the backend validates the inputs and makes some data transformation then calls expedia offers API.

The application that I have developed is so simple and missing many things to be taken into consideration like:

* Separating the internal data model from the external API data model and making an internal translation to move the data.
By doing this we will not need to search the project if a tag has been changed in the response of the external API

* Better organizing the code inside the backend project,
I usually tend to separate each component of my application in a standalone project to easily manage it inside the teams without having code conflicts.

* Better organize the FE code to be component based eg: filters shall be in a separate component

* Expose a better API documentation, right now you can check a simple API documentation by calling /mappings API


