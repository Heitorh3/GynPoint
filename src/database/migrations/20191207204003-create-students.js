module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('students', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING,
            },
            age: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            weight: {
                type: Sequelize.DOUBLE,
                allowNull: true,
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
        return queryInterface.dropTable('students');
    },
};
