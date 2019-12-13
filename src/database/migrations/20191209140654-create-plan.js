module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('plans', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            duration: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            price: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('plans');
    },
};
