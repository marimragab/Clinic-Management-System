const mongoose = require("mongoose");
const {
  body,
  query,
  param,
  validationResult,
  Result,
} = require("express-validator");
const { request } = require("express");
require("./../Models/clinicServices");
const servicesSchema = mongoose.model("clinicServices");

exports.getAllServices = (request, response, next) => {
  let query = {};
  //filter by name
  if (request.query.name) {
    query.name = request.query.name;
  }
  servicesSchema
    .find(query)
    .populate("name")
    //sort by name
    .skip(0)
    .limit(5)
    .sort({ name: 1 })
    //servicesSchema.find()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.addServices = (request, response, next) => {
  let newServices = new servicesSchema({
    name: request.body.name,
    price: request.body.price,
  });
  newServices
    .save()
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((error) => next(error));
};

exports.updateServices = (request, response, next) => {
  servicesSchema
    .updateOne(
      {
        _id: request.body._id,
      },
      {
        $set: { name: request.body.name, price: request.body.price },
      }
    )
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((error) => next(error));
};

exports.deleteServices = (request, response, next) => {
  servicesSchema
    .deleteOne({
      _id: request.body._id,
    })
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((error) => next(error));
};
