const express=require('express');
const mongoose = require('mongoose');
const registration=require('./SchemaRegistration');

const app=express();
app.use(express.json()); 