

import axios from 'axios';

class Goglobalauth {
    verify = false;
    url = "";
    app = ""

    async initializeApp(app_id, key, url, email, password) {
        try {
            const logIn = await axios({
                method: 'post',
                url: url + "/admin/login",
                data: {
                    email,
                    password
                }
            })
            if (!logIn.data) {
                this.url = "";
                this.verify = false;
                this.app = ""
            }
            const init = await axios({
                method: 'post',
                url: url + "/app/init",
                data: {
                    app_id,
                    key
                }
            });
            if (init.data.status) {
                this.url = url;
                this.verify = true;
                this.app = app_id
            }
        } catch (error) {
            return error
        }
    }
    async createUser({ user_id, email, password, firstName, lastName, role }) {

        try {

            if (!this.verify) {
                return {
                    message: "You not register yet!",
                    status: false
                }
            }
            const user = await axios({
                method: 'post',
                url: this.url + "/user/create",
                data: {
                    user_id,
                    email,
                    password,
                    firstName,
                    lastName,
                    role,
                    app: this.app
                }
            });
            if (user.data.status) {
                return {
                    message: "Create User Success!",
                    status: true,
                    data: user
                }
            } else {
                return {
                    message: user.data.message,
                    status: false,
                }
            }

        } catch (error) {

            return {
                message: error.message,
                status: false,
            }
        }

    }
    async updateUser(user_id, email, password, firstName, lastName, role) {

        try {
            if (!this.verify) {
                return {
                    message: "You not register yet!",
                    status: false
                }
            }
            const user = await axios({
                method: 'post',
                url: this.url + "/user/update",
                data: {
                    user_id,
                    email,
                    password,
                    firstName,
                    lastName,
                    role,
                    app: this.app
                }
            });

            if (user.data.status) {
                return {
                    message: "Update User Success!",
                    status: true,
                    data: user
                }
            } else {
                return {
                    message: user.data.message,
                    status: false,
                }
            }
        } catch (error) {
            console.log(error)
            return {
                message: error.message,
                status: false,
            }
        }

    }
    async delete(user_id) {
        try {
            if (!this.verify) {
                return {
                    message: "You not register yet!",
                    status: false
                }
            }
            const role = "admin"
            const user = await axios({
                method: 'post',
                url: this.url + "/user/delete",
                data: {
                    user_id,
                    role,
                    app: this.app
                }
            });
            if (user.data.status) {
                return {
                    message: "Delete User Success!",
                    status: true,
                    data: user
                }
            }
            else {
                return {
                    message: user.data.message,
                    status: false,
                }

            }
        } catch (error) {
            return {
                message: error.message,
                status: false,
            }
        }

    }

    async getUsers() {
        const data = await axios({
            method: 'get',
            url: this.url + "/users",
        });
    }
    async verifyToken(token) {
        // 
        const verifyToken = await axios({
            method: 'post',
            url: this.url + "/auth/verifyToken",
            data: {
                token
            }
        })
        if (verifyToken.data.status) {
            return {
                message: "Verify token Success!",
                status: true,
            }
        } else {
            return {
                message: "Verify token failed",
                status: false,
            }
        }
    }
    // client 
    async createApp(app_id, key, url) {
        try {

            const init = await axios({
                method: 'post',
                url: url + "/app/init",
                data: {
                    app_id,
                    key
                }
            });

            if (init.data.status) {
                this.url = url;
                this.verify = true;
                this.app = app_id
            }
        } catch (error) {
            return error
        }
    }
    async login(email, password) {
        try {
            const user = await axios({
                method: 'post',
                url: this.url + "/auth/login",
                data: {
                    email,
                    password,
                    app: this.app
                }
            })

            if (user.data.status) {
                return {
                    message: user.data.message,
                    status: true,
                    token: user.data.token,
                    user: user.data.user
                }
            } {
                return {
                    message: user.data.message,
                    status: false,
                    token: null
                }
            }

        } catch (error) {
            console.log(error)
            return {
                message: error.message,
                status: false,
            }
        }

    }
    async logout() {
        try {

            const user = await axios({
                method: 'post',
                url: this.url + "/auth/logout",
            })

            return {
                message: "Success!",
                status: true,
            }
        } catch (error) {
            console.log(error)
            return {
                message: error.message,
                status: false,
            }
        }

    }
}

export default Goglobalauth;