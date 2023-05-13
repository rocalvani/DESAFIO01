import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productCollection = "products";

// SCHEMAS

const stringTypeSchemaUniqueRequired = {
  type: String,
  unique: true,
  required: true,
};

const stringTypeSchemaNonUniqueRequired = {
  type: String,
  required: true,
};

const numberTypeSchemaNonUniqueRequired = {
    type: Number,
    required: true,
  };

const productSchema = new mongoose.Schema({
  title: stringTypeSchemaNonUniqueRequired,
  description: stringTypeSchemaNonUniqueRequired,
  price: numberTypeSchemaNonUniqueRequired,
  thumbnail: {
    type: [
        {
            img: {
                type: String,
                required: true
            }
        }
    ],
    default:[]
},
  code: stringTypeSchemaUniqueRequired,
  stock: numberTypeSchemaNonUniqueRequired,
  status: {type: Boolean, required: true},
  category: {
    type: String,
    index: true
  },
});

productSchema.plugin(mongoosePaginate)

export const productModel = mongoose.model(productCollection, productSchema)