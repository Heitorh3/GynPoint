import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import CurrencyFormatter from 'currency-formatter';

import Mail from '../lib/Mail';

class ConfirmationMail {
    get key() {
        return 'ConfirmationMail';
    }

    async handle({ data }) {
        const { registrationConfirmed } = data;

        await Mail.sendMail({
            to: `${registrationConfirmed.student.name} <${registrationConfirmed.student.email}>`,
            subject: 'Inscrição confirmada',
            template: 'registrationConfirmed',
            context: {
                student: registrationConfirmed.student.name,
                plan: registrationConfirmed.plan.title,
                start_date: format(
                    parseISO(registrationConfirmed.start_date),
                    'MM/dd/yyyy',
                    {
                        locale: pt,
                    }
                ),
                end_date: format(
                    parseISO(registrationConfirmed.end_date),
                    'MM/dd/yyyy',
                    {
                        locale: pt,
                    }
                ),
                price: CurrencyFormatter.format(registrationConfirmed.price, {
                    format: {
                        symbol: '$',
                        decimal: ',',
                        thousand: '.',
                        precision: 1,
                        format: `%v %s`,
                    },
                }),
            },
        });
    }
}

export default new ConfirmationMail();
