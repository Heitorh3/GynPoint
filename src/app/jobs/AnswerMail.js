import Mail from '../lib/Mail';

class AnswerMailConfirmed {
    get key() {
        return 'AnswerMail';
    }

    async handle({ data }) {
        const { helpOder } = data;

        await Mail.sendMail({
            to: `${helpOder.student.name} <${helpOder.student.email}>`,
            subject: 'Pergunta respondida',
            template: 'answerConfirmed',
            context: {
                student: helpOder.student.name,
                user: helpOder.user.name,
                question: helpOder.question,
                answer: helpOder.answer,
            },
        });
    }
}

export default new AnswerMailConfirmed();
