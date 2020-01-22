import * as Yup from 'yup';
import { isPast, addMonths, parseISO } from 'date-fns';

import Plan from '../models/Plan';
import Registration from '../models/Registration';
import Student from '../models/Student';

import Queue from '../lib/Queue';
import RegistrationMail from '../jobs/RegistrationMail';

class RegistrationController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const registrations = await Registration.findAll({
            attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
            order: ['start_date'],
            limit: 20,
            offset: (page - 1) * 20,
            include: [
                {
                    model: Student,
                    as: 'student',
                    attributes: ['name', 'email'],
                },
                {
                    model: Plan,
                    as: 'plan',
                    attributes: ['title', 'price', 'duration'],
                },
            ],
        });

        return res.json(registrations);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            student_id: Yup.number().required(),
            plan_id: Yup.number().required(),
            start_date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: 'Validation fails' });
        }

        const { student_id, plan_id, start_date } = req.body;

        const selectedPlan = await Plan.findByPk(plan_id);

        const past = isPast(parseISO(start_date));

        if (past) {
            return res.status(401).json({
                error: 'Past dates are not permitted',
            });
        }

        const end_date = addMonths(parseISO(start_date), selectedPlan.duration);
        const price = selectedPlan.duration * selectedPlan.price;

        const registration = await Registration.create({
            student_id,
            plan_id,
            start_date,
            end_date,
            price,
        });

        // TODO: Quando um aluno realiza uma matrícula
        // ele recebe um e-mail com detalhes da sua inscrição na academia como plano,
        // data de término, valor e uma mensagem de boas-vidas.

        const registrationConfirmed = await Registration.findOne({
            where: { id: registration.id },

            include: [
                {
                    model: Student,
                    as: 'student',
                    attributes: ['name', 'email'],
                },
                {
                    model: Plan,
                    as: 'plan',
                    attributes: ['title', 'duration', 'price'],
                },
            ],
        });

        await Queue.add(RegistrationMail.key, {
            registrationConfirmed,
        });

        return res.json(registration);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            plan_id: Yup.number().required(),
            start_date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: 'Validation fails' });
        }

        const { plan_id, start_date } = req.body;

        const registration = await Registration.findByPk(
            req.params.registrationId
        );

        const past = isPast(parseISO(start_date));

        if (past) {
            return res.status(401).json({
                error: 'Past dates are not permitted',
            });
        }

        const plan = await Plan.findByPk(plan_id);

        const end_date = addMonths(parseISO(start_date), plan.duration);
        const price = plan.duration * plan.price;

        await registration.update({
            plan_id,
            start_date,
            end_date,
            price,
        });

        const registrationConfirmed = await Registration.findOne({
            where: { id: registration.id },

            include: [
                {
                    model: Student,
                    as: 'student',
                    attributes: ['name', 'email'],
                },
                {
                    model: Plan,
                    as: 'plan',
                    attributes: ['title', 'duration', 'price'],
                },
            ],
        });

        await Queue.add(RegistrationMail.key, {
            registrationConfirmed,
        });

        return res.json(registration);
    }

    async delete(req, res) {
        await Registration.destroy(req.params.registrationId);

        return res
            .status(204)
            .json({ menssage: 'Restrattion delete with sucesses' });
    }
}

export default new RegistrationController();
