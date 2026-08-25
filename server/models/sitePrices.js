import mongoose from 'mongoose';

const sitePriceSchema = new mongoose.Schema({
  name: String,
  tier: String,
  price: String,
  desc: String,
  services: [String],
  features: [String]
});

const SitePrice = mongoose.model('SitePrice', sitePriceSchema);

export default SitePrice;