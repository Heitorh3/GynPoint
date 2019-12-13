import Sequelize, { Model } from 'sequelize';

class HelpOrder extends Model {
    static init(sequelize) {
        super.init(
            {
                question: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                answer: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                answer_at: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
            },
            {
                sequelize,
            }
        );

        this.addHook('beforeSave', async order => {
            if (order.user_id) {
                order.answer_at = new Date();
            }
        });

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Student, {
            foreignKey: 'student_id',
            as: 'student',
        });
        this.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
        });
    }
}

export default HelpOrder;
