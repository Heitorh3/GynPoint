import * as Yup from 'yup';

import Plan from '../models/Plan';

class PlanController {
    async index(req, res) {
        const plans = await Plan.findAll();
        res.json(plans);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            duration: Yup.number().required(),
            price: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: 'Validation fails' });
        }

        const plan = req.body;

        const { title, duration, price } = await Plan.create(plan);

        return res.json({
            title,
            duration,
            price,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            duration: Yup.number().required(),
            price: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: 'Validation fails' });
        }

        const plan = await Plan.findByPk(req.params.planId);

        const { title, duration, price } = await plan.update(req.body);

        return res.json({
            title,
            duration,
            price,
        });
    }

    async delete(req, res) {
        const plan = await Plan.findByPk(req.params.planId);

        if (plan) {
            await plan.destroy(plan);
            return res
                .status(200)
                .json({ message: ' Plan delete with success' });
        }

        return res.status(401).json({ message: ' Plan delete with success' });
    }
}

export default new PlanController();
