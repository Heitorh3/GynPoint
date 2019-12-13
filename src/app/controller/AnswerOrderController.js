import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import User from '../models/User';

import Queue from '../lib/Queue';
import AnswerMailConfirmed from '../jobs/AnswerMail';

class AnswerOrderController {
    async store(req, res) {
        const schema = Yup.object().shape({
            answer: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: 'Validation fails' });
        }

        const order = await HelpOrder.findByPk(req.params.helpOderID);
        const { answer } = req.body;

        await order.update({
            answer,
            user_id: req.userId,
        });

        const helpOder = await HelpOrder.findOne({
            where: { id: order.id },
            include: [
                {
                    model: Student,
                    as: 'student',
                    attributes: ['name', 'email'],
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['name'],
                },
            ],
        });

        await Queue.add(AnswerMailConfirmed.key, {
            helpOder,
        });

        return res.json(helpOder);
    }
}
export default new AnswerOrderController();
