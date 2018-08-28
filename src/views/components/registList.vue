<template>
    <div class="regist-container">
        <el-form :model="registForm" :rules="registRules" ref="registInfo">
            <el-form-item prop="username">
                <!--<div class="icon-wrap row">
                    &lt;!&ndash;<img class="icon" src="static/username.png" alt="">&ndash;&gt;
                </div>-->
                <el-input v-model="registForm.username" placeholder="请输入您的账号" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item prop="pass">
                <!--<div class="icon-wrap row">
                    &lt;!&ndash;<img class="icon" src="static/password.png" alt="">&ndash;&gt;
                </div>-->
                <el-input type="password" v-model="registForm.pass" placeholder="请输入您的密码" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item prop="pass2">
               <!-- <div class="icon-wrap row">
                    &lt;!&ndash;<img class="icon" src="static/password.png" alt="">&ndash;&gt;
                </div>-->
                <el-input type="password" v-model="registForm.pass2" placeholder="请再次输入您的密码" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item prop="reference">
                <!--<div class="icon-wrap row">
                    &lt;!&ndash;<img class="icon" src="static/login/reference.png" alt="">&ndash;&gt;
                </div>-->
                <el-input type="text" v-model="registForm.reference" placeholder="请输入推荐人姓名" auto-complete="off" :maxlength="20"></el-input>
            </el-form-item>
            <!-- 协议 -->
            <div class="common-wrap">
                <div class="row agreement">
                    <img class="agreement-img" @click="toggleSelectAgreement" :src="argreementActive ? 'static/select.png' : 'static/check.png'">
                    <span @click="agreementRead">软件许可<span class="info">使用协议</span></span>
                </div>
                <p class="common-warn" v-show="!argreementActive">请勾选使用协议</p>
            </div>

            <!-- 协议弹框 -->
            <agreement-info
                    :agreementVisible="agreementVisible"
                    :data="agreementInfo"
                    v-if="agreementVisible"
                    class="agreement-item"
                    @closeAgreement="closeAgreement">
            </agreement-info>

            <div class="dialog-footer row">
                <button class="cancel-btn btn" @click="registInfoCancel">取消</button>
                <button class="confirm-btn btn" @click="registInfoConfirm">注册</button>
            </div>
        </el-form>
    </div>
</template>

<script>
    // import request from '@/utils/request';
    import { isvalidUsername, isvalidPwd } from '../../utils/validate';
    import { _typeOf } from '../../utils/validate';
    import agreementInfo from '../../components/agreementInfo.vue';
    import agreementJson from './agreementJson';
    export default {
        components: { agreementInfo },
        data() {
            let validateUsername = (rule, value, callback) => {
                if (isvalidUsername(value)) {
                    callback();
                } else {
                    return callback(new Error('请输入6到14位字母、数字组合'));
                }
            };
            let validatePass = (rule, value, callback) => {
                if (isvalidPwd(value)) {
                    callback();
                } else {
                    return callback(new Error('请输入6到14位字母、数字组合'));
                }
            };
            let validateEqual = (rule, value, callback) => {
                if (value !== this.registForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                agreementVisible: false,
                registForm: {
                    username: '',
                    pass: '',
                    pass2: '',
                    reference: ''
                },
                argreementActive: true,
                registRules: {
                    username: [
                        {
                            required: true,
                            message: '请输入您的账号',
                            trigger: 'blur'
                        },
                        {
                            validator: validateUsername,
                            message: '请输入6到14位字母、数字组合',
                            trigger: 'blur'
                        }
                    ],
                    pass: [
                        {
                            required: true,
                            message: '请输入您的密码',
                            trigger: 'blur'
                        },
                        {
                            validator: validatePass,
                            message: '请输入6到14位字母、数字组合',
                            trigger: 'blur'
                        }
                    ],
                    pass2: [
                        {
                            required: true,
                            message: '请输入您的密码',
                            trigger: 'blur'
                        },
                        {
                            validator: validateEqual,
                            message: '两次输入密码不一致',
                            trigger: 'blur'
                        }
                    ]
                },
                agreementInfo: agreementJson
            };
        },
        props: ['registInfoVisible'],
        methods: {
            //协议
            agreementRead() {
                this.agreementVisible = true;
            },
            toggleSelectAgreement() {
                this.argreementActive = !this.argreementActive;
            },
            // 取消
            registInfoCancel() {
                this.$emit('registInfoCancel', false);
                this.clear();
            },
            // 注册
            registInfoConfirm() {
                // if (!this.roleWarn && !this.brandWarn && this.argreementActive) {
                if (this.argreementActive) {
                    this.$refs.registInfo.validate(valid => {
                        if (valid) {
                            this.$emit('registInfoConfirm', {
                                username: this.registForm.username,
                                pass: this.registForm.pass,
                                reference: this.registForm.reference
                                // role: this.registForm.selectedRole.role,
                                // brands: this.selectedBrandIds.join(',')
                            });
                        }
                    });
                }
            },
            //清空
            clear() {
                for (let key in this.registForm) {
                    if (this.registForm.hasOwnProperty(key)) {
                        switch (_typeOf(this.registForm[key])) {
                            case 'string':
                                this.registForm[key] = '';
                                break;
                            case 'array':
                                this.registForm[key] = [];
                                break;
                            case 'object':
                                this.registForm[key] = {};
                                break;
                            default:
                                this.registForm[key] = null;
                        }
                    }
                }
            },
            //协议弹框关闭按钮
            closeAgreement() {
                this.agreementVisible = false;
            }
        }
    };
</script>

<style lang="scss" scoped>
  .regist-container{
    padding: 30px 20px;
    background-color: #fff;
  }
  .agreement-img{
    height: 18px;
    width: 18px;
  }
</style>


