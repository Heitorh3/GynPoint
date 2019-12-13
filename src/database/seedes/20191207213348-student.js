module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            'students',
            [
                {
                    name: 'John Doe',
                    email: 'johnDoe@gympoint.com',
                    age: 12,
                    weight: 59.5,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: queryInterface => queryInterface.bulkDelete('students', null, {}),
};
