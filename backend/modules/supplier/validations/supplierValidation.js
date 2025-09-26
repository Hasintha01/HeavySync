// modules/supplier/validations/supplierValidation.js
import Joi from "joi";

export const supplierCreateSchema = Joi.object({
  supplierName: Joi.string().min(2).max(200).required(),
  contactPerson: Joi.string().optional().allow(""),
  email: Joi.string().email().optional().allow(""),
  phone: Joi.string().optional().allow(""),
  address: Joi.string().optional().allow(""),
  category: Joi.string().optional().allow(""),
  status: Joi.string().valid("active", "inactive").optional()
});

export const purchaseCreateSchema = Joi.object({
  supplier: Joi.string().required(),
  items: Joi.array().items(
    Joi.object({
      itemName: Joi.string().required(),
      productId: Joi.string().optional().allow(""),
      quantity: Joi.number().integer().min(1).required(),
      unitPrice: Joi.number().min(0).required()
    })
  ).min(1).required(),
  expectedDeliveryDate: Joi.date().optional().allow(null),
  notes: Joi.string().optional().allow("")
});

export const changeStatusSchema = Joi.object({
  status: Joi.string().valid("pending", "approved", "received", "cancelled").required()
});

export const quotationSchema = Joi.object({
  supplierId: Joi.string().required(),
  items: Joi.array().items(
    Joi.object({
      itemName: Joi.string().required(),
      quantity: Joi.number().integer().min(1).required(),
      unitPrice: Joi.number().min(0).required()
    })
  ).min(1).required(),
  notes: Joi.string().optional().allow("")
});