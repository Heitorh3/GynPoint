import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
    async store(req, res) {
        const schema = Yup.object().shape({
            question: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: 'Validation fails' });
        }

        const { question } = req.body;
        const student_id = req.params.studentID;

        const helpOrder = await HelpOrder.create({
            question,
            student_id,
        });

        return res.json(helpOrder);
    }

    async index(req, res) {
        const helpOrders = await HelpOrder.findAll({
            where: {
                answer: null,
            },
        });
        return res.json(helpOrders);
    }
}
export default new HelpOrderController();
