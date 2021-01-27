const { User } = require('../db/models');
const bcrypt = require('bcryptjs')

module.exports = {
    async list(req, res) {
        const users = await User.findAll({
            attributes: ['id', 'email']
        })
        // meta
        res.json({
            meta: {
                status: 'success',
                count: users.length
            },
            data: {
                users,
            }
        })
    },
    async create(req, res) {
        const body = req.body

        /* User.create(body)
            .then(user => {
                res.json({
                    meta: {
                        status: 'success',
                    },
                    data: {
                        user,
                    }
                })
            })
            .catch(error => {
                res.status(500).json({
                    meta: {
                        status: 'error',
                    },
                    data: {
                        error
                    }
                })
            }) */
            
           

        try {
            const password = bcrypt.hashSync(body.password, 10);
            const user = await User.create({
                ...body,
                password
            })
            res.json({
                meta: {
                    status: 'success',
                },
                data: {
                    user,
                }
            })
        } catch(error) {
            res.status(500).json({
                meta: {
                    status: 'error',
                },
                error: 'Ups intente nuevamente',
            })
        }

        
    },
    async update(req, res) {
        const { id } = req.params
        const body = req.body
        
        try{
            await User.update(body, {
                where: {
                    id,
                },

            })

            const user = await User.findByPk(id)

            res.json({
                meta: {
                    status: 'success',
                },
                data: {
                    user,
                }
            })
        } catch(err) {
            res.status(500).json({
                meta: {
                    status: 'error',
                },
                error: 'Ups intente nuevamente',
            })
        }
    },
    async delete(req, res) {
        const { id } = req.params
        try {
            await User.destroy({
                where: {
                    id,
                }  
            })
            res.json({
                meta: {
                    status: 'success',
                },
            })
        } catch(err) {
            res.status(500).json({
                meta: {
                    status: 'error',
                },
                error: 'Ups no pudimos borrarlo',
            })
        }
    },
    async login(req, res) {
        const { email, password } = req.body

        const user = await User.findOne({
            where: {
                email,
            }
        })

        console.log('user', user)

        if (user && bcrypt.compareSync(password, user.password)) {
            res.json({
                meta: {
                    status: 'success',
                },
                data: {
                    user
                }
            })
            return
        }

        res.status(400).json({
            meta: {
                status: 'error',
            },
            error: 'Email o password incorrecto',
        })
    

        

    }
};