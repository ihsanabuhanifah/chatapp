const express = require('express')
const router = express.Router()
const UserModel = require('../models/UserModel')
const ProfileModel = require('../models/ProfileModel')
const FollowerModel = require('../models/FollowerModel')


const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const isEmail = require('validator/lib/isEmail')
const userPng =
  "https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png";

router.get('/' , async(req, res)=> {
    console.log('ok')
})

module.exports = router