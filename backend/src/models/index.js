    const User = require('./user');
const Category = require('./category');
const Listing = require('./listing');

User.hasMany(Listing, { foreignKey: 'userId', onDelete: 'CASCADE' });
Listing.belongsTo(User, { foreignKey: 'userId' });

Category.hasMany(Listing, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
Listing.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = { User, Category, Listing };
