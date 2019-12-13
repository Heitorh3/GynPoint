import { subDays } from 'date-fns';
import { Op } from 'sequelize';

import Checkin from '../models/Checkin';

class CheckingController {
    async index(req, res) {
        const student_id = req.params.studentID;

        const checkins = await Checkin.findAll({
            where: {
                student_id,
            },
        });

        return res.json(checkins);
    }

    async store(req, res) {
        const student_id = req.params.studentID;

        const today = new Date();

        // const checkinsTotal = await Checkin.findAll({
        //     attributes: {
        //         include: [[fn('count', 'student_id'), 'total']],
        //     },
        //     where: {
        //         created_at: {
        //             [Op.between]: [startOfWeek(today), endOfWeek(today)],
        //         },
        //         student_id: { [Op.and]: [student_id] },
        //     },
        //     group: ['id'],
        // });

        /*
         * Check if student make 5 checkins in the last 7 days
         */
        const checkinsTotal = await Checkin.count({
            where: {
                student_id,
                created_at: {
                    [Op.gte]: subDays(today, 7),
                },
            },
        });

        if (checkinsTotal >= 5) {
            return res.json({
                message:
                    'Você ultrapassou o limite de 5 checkeins nos ultimos 7 dias.',
            });
        }

        const checkin = await Checkin.create({ student_id });

        return res.json(checkin);
    }
}

export default new CheckingController();
