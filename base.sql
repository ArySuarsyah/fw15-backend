-- Active: 1680730214817@@127.0.0.1@5432@postgres@public

CREATE TABLE
    "users" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "userName" VARCHAR(225),
        "email" VARCHAR(225) UNIQUE,
        "password" VARCHAR(225),
        "fingerprint" VARCHAR(225) UNIQUE,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NULL,

    );

CREATE TABLE
    "profile" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "userId", INTEGER,
        "picture" VARCHAR(225),
        "fullName" VARCHAR(225),
        "phoneNumber" VARCHAR(225),
        "gender" BOOLEAN,
        "profession" VARCHAR(225),
        "nationality" VARCHAR(225),
        "birthdate" DATE,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NULL
    );

CREATE TABLE
    "categories" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "name" VARCHAR(225),
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NULL
    );

CREATE TABLE
    "cities" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "picture" VARCHAR(225),
        "name" VARCHAR(225),
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NULL
    );

CREATE TABLE
    "events" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "picture" VARCHAR(225),
        "title" VARCHAR(225),
        "date" DATE,
        "cityId" INTEGER,
        "description" TEXT,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NULL
    );

CREATE TABLE
    "eventCategories" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "eventId" INTEGER,
        "categoryId" INTEGER,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NULL
    );

CREATE TABLE
    "partners" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "picture" VARCHAR(225),
        "name" VARCHAR(225),
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NULL
    );

CREATE TABLE
    "reservationSection" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "name" VARCHAR(225),
        "price" VARCHAR(225),
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NULL
    );

CREATE TABLE
    "reservationStatus" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "name" VARCHAR(225),
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NULL
    );

CREATE TABLE
    "paymentMethod" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "name" VARCHAR(225),
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NULL
    );

CREATE TABLE
    "reservations" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "eventId" INTEGER,
        "userId" INTEGER,
        "statusId" INTEGER,
        "paymentMethodId" INTEGER,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NULL
    );

CREATE TABLE
    "reservationTicket" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "reservationId" INTEGER,
        "sectionId" INTEGER,
        "quantityId" INTEGER,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NULL
    );

CREATE TABLE
    "wishlist" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "eventId" INTEGER,
        "userId" INTEGER,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NULL
    );