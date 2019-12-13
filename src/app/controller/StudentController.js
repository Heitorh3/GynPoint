import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const studentExists = await Student.findOne({
            where: { email: req.body.email },
        });

        if (studentExists) {
            return res.status(400).json({ error: 'Student already exists' });
        }

        const student = await Student.create(req.body);
        return res.json(student);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const isUpdate = await Student.update(req.body, {
            where: { id: req.params.studentId },
        });

        if (isUpdate) {
            const student = await Student.findOne({
                where: { id: req.params.studentId },
                attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
            });
            return res.json(student);
        }

        return res.status(400).json({ error: 'Update fails' });
    }
}

export default new StudentController();
