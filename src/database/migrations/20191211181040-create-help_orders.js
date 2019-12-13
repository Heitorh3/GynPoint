module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('help_orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            student_id: {
                type: Sequelize.INTEGER,
                references: { model: 'students', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: { model: 'users', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
            },
            question: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            answer: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            answer_at: {
                allowNull: true,
                type: Sequelize.DATE,
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

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('help_orders');
    },
};
