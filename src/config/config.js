module.exports = {
  mongoose: {
    url: process.env.MONGODB_URL,
  },
  port: process.env.PORT,
  THIRD_PARTY_API_URL:
    "https://s3.amazonaws.com/roxiler.com/product_transaction.json",
};
