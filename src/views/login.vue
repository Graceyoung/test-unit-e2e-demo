<template>
    <div id="login" ref="login" class="login-container column">
      <div class="login-form">
            <div class="login-form-item row">
				<span class="ico-wrap row">
					<!--<img class="ico" src="static/username.png" alt="">-->
				</span>
                <input class="input-item" v-model="loginForm.username" type="text" placeholder="请输入您的账号" name="username"
                       @input="checkUserName"/>
                <div class="login-dropdown-btn" @click.stop="toggleDropDOwn" v-if="users.length > 0">
                    <img class="login-arrow-down" src="static/common/arrow-down.png" alt="">
                </div>
            </div>
            <span class="error" v-show="!uesrNameLegal">请输入6到14位字母、数字组合</span>
            <div class="login-popdown" v-show="showDropDown">
                <div v-for="item in users" class="login-user-item" @click.stop="selectUser(item)">
                    <img class="login-select-user-icon" src="static/common/select_yes.png" alt=""
                         v-show="account ? account === item.name : item.name === loginForm.username">
                    <span>{{item.name}}</span>
                </div>
            </div>
            <div class="login-form-item row">
				<span class="ico-wrap row">
					<img class="ico" src="static/password.png" alt="">
				</span>
                <input class="input-item" v-model="loginForm.password" type="password" placeholder="请输入您的密码"
                       name="password" @input="checkPassword"/>
            </div>
            <span class="error" v-show="!passwordLegal">请输入6到14位字母、数字组合</span>
            <input class="login-btn public" type="button" @click="handleLogin" value="登录"/>
            <input class="regist-btn public" type="button" @click="handleRegist" value="注册"/>
        </div>

        <!--<el-dialog-->
                <!--title="注册账户"-->
                <!--:visible.sync="registInfoVisible"-->
                <!--width="39.3rem">-->
        <div class="register-wrap" v-show="registInfoVisible">
            <regist-list
                    v-on:registInfoConfirm="registInfoConfirm"
                    v-on:registInfoCancel="registInfoCancel"
                    :registInfoVisible="registInfoVisible"
            ></regist-list>
        </div>

        <!--</el-dialog>-->
    </div>
</template>

<script>
    import {isvalidUsername, isvalidPwd} from '../utils/validate'
    import registList from './components/registList.vue'
    // import {Message} from 'element-ui'

    export default {
        name: 'list',
        components: {
            registList: registList
        },
        data() {
            return {
                account: null,
                loginForm: {
                    username: '',
                    password: ''
                },
                uesrNameLegal: true,
                passwordLegal: true,
                registInfoVisible: false,
                payUrl: '',
                fee: '',
                payVisible: false,
                showDropDown: false,
                users: [],
            }
        },
        computed: {},
        mounted() {
            this.getUsers();
            this.selectUser(this.users[0]);
        },
        methods: {
            checkUserName() {
                this.uesrNameLegal = isvalidUsername(this.loginForm.username);
            },
            checkPassword() {
                this.passwordLegal = isvalidPwd(this.loginForm.password);
            },
            handleLogin() {
                if (this.uesrNameLegal && this.passwordLegal) {

                } else {

                    return false;
                }
            },
            handleRegist() {
                this.registInfoVisible = true;
            },
            registInfoCancel() {
                this.registInfoVisible = false;
            },
            registInfoConfirm(data) {

            },
            toggleDropDOwn() {
                this.showDropDown = !this.showDropDown;
            },
            selectUser(user) {
                this.loginForm.username = user.name;
                this.showDropDown = false;
            },
            getUsers() {
                this.users = this.$store.state.user.reverse();
            }
        }
    }
</script>

<style  lang="scss" scoped>
    @import '../styles/variables.scss';

    $bg: #344254;
    $dark_gray: #889aa4;
    $light_gray: #eee;
    .register-wrap{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0,0,0,.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login-container {
        position: relative;
        width: 100%;
        height: 100vh;
        background-size: cover;
        background-position: 50% 50%;
        align-items: center;
        justify-content: center;

        input::placeholder {
            color: #888888;
        }

        .logo {
            width: 11.6rem;
            height: 3.8rem;
        }
        .title {
            margin-top: 1.1rem;
            font-size: 2rem;
            color: #ffffff;
        }
        .login-form {
            margin-top: 7.5rem;
            margin-bottom: 8rem;
            width: 30.8rem;

            .login-form-item {
                margin-top: 1rem;
                width: 100%;
                height: 3.9rem;
                align-items: center;
                position: relative;
                .ico-wrap {
                    width: 3.9rem;
                    height: 3.9rem;
                    background-color: rgba(255, 255, 255, 0.6);
                    font-size: 2.2rem;
                    color: #fff;
                    align-items: center;
                    justify-content: center;

                    .ico {
                        height: 2.2rem;
                    }
                }
                .input-item {
                    flex: 1;
                    padding: 0 1rem;
                    height: 3.9rem;
                    background-color: rgba(255, 255, 255, 0.5);
                    outline: none;
                    border: none;
                    border-radius: 0;
                    font-size: $fontSizeGradeD;
                    color: $fontMainColor;
                    -webkit-tap-highlight-color: transparent;
                }
            }
            .error {
                display: inline-block;
                height: 2rem;
                line-height: 2rem;
                color: $themeColor;
                font-size: $fontSizeGradeF;
            }

            .public {
                width: 100%;
                height: 3.9rem;
                line-height: 3.9rem;
                text-align: center;
                font-size: $fontSizeGradeB;
                border: none;
                border-radius: 0;
                outline: none;
                font-size: $fontSizeGradeB;
                color: #fff;
            }

            .login-btn {
                margin-top: 4.8rem;
                background-color: $themeColor;
            }

            .regist-btn {
                margin-top: 1.5rem;
                background-color: rgba(0, 0, 0, 0.38);
            }
        }
        .version {
            position: absolute;
            bottom: 2rem;
            color: $fontSubColor;
            font-size: $fontSizeGradeF;
            text-align: center;
            letter-spacing: 0.1rem;
        }
        .login-popdown {
            position: absolute;
            z-index: 10;
            width: 30.8rem;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            background-color: #fff;
        }
        .login-dropdown-btn {
            position: absolute;
            top: 0;
            right: 0;
            width: 3rem;
            height: 100%;
            background: transparent;
        }
        .login-arrow-down {
            width: 1rem;
            position: absolute;
            top: 50%;
            right: 1rem;
            transform: translateY(-50%);
        }
        .login-select-user-icon {
            width: 1.4rem;
            height: 1.4rem;
            margin-right: 1rem;
        }
        .login-user-item {
            height: 3.9rem;
            width: 30.8rem;
            font-size: 1.4rem;
            border-bottom: 1px solid rgba(238, 238, 238, 1);
            display: flex;
            justify-content: center;
            align-items: center;

        }
    }

    .dialog-footer {
        padding: 1rem 0;
        justify-content: space-between;

        .btn {
            width: 15.6rem;
            height: 4.1rem;
            line-height: 4.1rem;
            text-align: center;
            font-size: $fontSizeGradeD;
            border: 0.1rem solid $themeColor;
            border-radius: 0.2rem;
        }
        .cancel-btn {
            margin-right: 2.3rem;
            color: $fontSubColor;
            border-color: #ccc;
            background-color: #fff;
        }
        .confirm-btn {
            color: #fff;
            background-color: $themeColor;
        }
    }

    input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
        -webkit-text-fill-color: rgba(0, 0, 0, 1) !important;
        -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
        background-color: transparent;
        background-image: none;
        transition: background-color 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
    }

    input {
        background: rgba(255, 255, 255, 0.2);
    }

</style>
