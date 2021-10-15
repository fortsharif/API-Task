const request = require('supertest')
const app = require('./index')


describe('User API', () => {
    it('GET /api/v1/user --> gets all users', () => {
        return request(app)
            .get('/api/v1/user')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            Id: expect.any(Number),
                            Email: expect.any(String),
                            GivenName: expect.any(String),
                            FamilyName: expect.any(String),
                            Created: expect.any(String)
                        })
                    ])
                )
            })
    })

    it('POST /api/v1/user/add --> adds user', () => {
        return request(app).post('/api/v1/user/add').send({
            email: 'testing@gmail.com',
            firstName: 'testing',
            surname: 'testing'
        }).expect('Content-Type', /json/).expect(200).then((res) => {
            expect(res.body).toEqual(
                expect.objectContaining({
                    status: 'success'
                })
            )
        })
    })

    it('POST /api/v1/user/add --> bad email 500 error', () => {
        return request(app).post('/api/v1/user/add').send({
            email: 'tesgmail.com',
            firstName: 'testing',
            surname: 'testing'
        }).expect('Content-Type', /json/).expect(500).then((res) => {
            expect(res.body).toEqual(
                expect.objectContaining({
                    error: "user was not added"
                })
            )
        })
    })

    it('DELETE /api/v1/user/delete/:id --> deletes user by id', () => { })

    it('PUT /api/v1/user/update/:id --> updates user by id', () => {
        return request(app).put('/api/v1/user/update/1').send({
            email: 'testemail@gmail.com',

        }).expect('Content-Type', /json/).expect(200).then((res) => {
            expect(res.body).toEqual(
                expect.objectContaining({
                    status: 'success'
                })
            )
        })
    })

    it('PUT /api/v1/user/update/:id --> error if id doesnt exist', () => {
        return request(app).put('/api/v1/user/update/1000').send({
            email: 'testemail@gmail.com',

        }).expect('Content-Type', /json/).expect(500).then((res) => {
            expect(res.body).toEqual(
                expect.objectContaining({
                    error: 'user was not updated'
                })
            )
        })
    })
})