module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('registrations', {
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
            plan_id: {
                type: Sequelize.INTEGER,
                references: { model: 'plans', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
            },
            start_date: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            end_date: {
                allowNull: false,
                type: Sequelize.DATE,
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
        return queryInterface.dropTable('registrations');
    },
};
