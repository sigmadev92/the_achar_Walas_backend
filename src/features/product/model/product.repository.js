import ProductModel from "./product.schema.js";
import CartModel from "../../cart/model/cart.schema.js";
import OrderModel from "./order.schema.js";
export default class ProductRepository {
  async addProductRepo(productData) {
    try {
      const newProduct = new ProductModel(productData);
      await newProduct.save();
      return {
        success: true,
        newProduct,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error: {
          statusCode: 500,
          msg: error.message,
        },
      };
    }
  }

  //for searching
  async getAllProductsRepo(query) {
    console.log(query);
  }

  async getProductById(productId) {
    return await ProductModel.findById(productId);
  }
  async updateProduct(updatedData) {
    const product = await ProductModel.findById(updatedData._id);
    if (!product) {
      return {
        success: false,
        error: {
          statusCode: 400,
          msg: "Product not found.",
        },
      };
    }
    Object.assign(product, updatedData);
    await product.save();
    return {
      success: true,
      product,
    };
  }

  async removeProduct(productId) {
    return await ProductModel.findByIdAndDelete(productId);
  }

  async addToCart(userId, productId) {
    const newCartItem = new CartModel({ userID: userId, productID: productId });
    await newCartItem.save();
    return {
      success: true,
      newCartItem,
    };
  }

  async updateQuantityInCart(cartItemId) {
    return await CartModel.findOne({ productID: cartItemId });
  }
  async removeFromCart(cartItemId, userId) {
    return await CartModel.findOneAndDelete({
      _id: cartItemId,
      userID: userId,
    });
  }
  //for users
  async generate(userId, productId, options) {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return {
        success: false,
        error: {
          statusCode: 400,
          msg: "Invalid Product ID",
        },
      };
    }
    const newOrder = new OrderModel({
      userID: userId,
      products: [
        {
          productId,
          productName: product.name,
          price: product.price,
          quantity: options.quantity,
        },
      ],
      totalPrice: options.totalPrice,
      serviceTax: 0.08,
      orderType: options.orderType,
      delivery: options.delivery,
      shippingCharges: options.shippingCharges,
    });
  }
}
