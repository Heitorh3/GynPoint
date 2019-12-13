module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('students', 'height', {
            type: Sequelize.DOUBLE,
            allowNull: true,
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('students');
    },
};
