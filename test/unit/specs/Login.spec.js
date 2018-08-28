import Login from '@/views/login.vue'
import {shallowMount} from '@vue/test-utils'
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
describe('Login.vue', () => {
  let store = {
    state: {
      user: [{name: 'username002'}],
    },
    mutations: {
      setUsers(state,user) {
        state.user.push(user);
        if (state.users.length > 3){
          state.users.splice(0,state.users.length - 2);
        }
        state.users.push(user);
      }
    }
  };
  const wrapper = shallowMount(Login,{
    store
  });// 挂载组件，得到包裹器，shallowMount只挂载一个组件，不渲染其子组件

    // 用户名校验
    it('用户名的长度小于6时', function () {
        // setData和trigger，等效于setValue
        /*wrapper.setData({loginForm: {username: '12'}});
        wrapper.find('input[name="username"]').trigger('input');*/

        wrapper.find('input[name="username"]').setValue('12');
        expect(wrapper.vm.uesrNameLegal).toBeFalsy(); // wrapper.vm —— vue实例
    });
    it('用户名长度在6~14时', function () {
        wrapper.setData({loginForm: {username: '1234567'}});
        wrapper.find('input[name="username"]').trigger('input');
        expect(wrapper.vm.uesrNameLegal).toBeTruthy();
    });
    it('用户名长度大于14时 ', function () {
        wrapper.find('input[name="username"]').setValue('1234567891234567');
        expect(wrapper.vm.uesrNameLegal).toBeFalsy();
    });
    it('用户名由字母、数字和其他字符组合时', function () {
        wrapper.setData({loginForm: {username: '12_34323'}});
        wrapper.find('input[name="username"]').trigger('input');
        expect(wrapper.vm.uesrNameLegal).toBeFalsy();
    });


    // 密码校验
    it('密码的长度小于6时', function () {
        wrapper.setData({loginForm: {password: '12'}});
        wrapper.find('input[name="password"]').trigger('input');
        expect(wrapper.vm.passwordLegal).toBeFalsy();
    });
    it('密码长度在6~14时', function () {
        wrapper.setData({loginForm: {password: '1234567'}});
        wrapper.find('input[name="password"]').trigger('input');
        expect(wrapper.vm.passwordLegal).toBeTruthy();
    });
    it('密码长度大于14时 ', function () {
        wrapper.setData({loginForm: {password: 1234567891234567}});
        wrapper.find('input[name="password"]').trigger('input');
        expect(wrapper.vm.passwordLegal).toBeFalsy();
    });
    it('密码由字母、数字和其他字符组合时', function () {
        wrapper.setData({loginForm: {password: '12_34323'}});
        wrapper.find('input[name="password"]').trigger('input');
        expect(wrapper.vm.passwordLegal).toBeFalsy();
    });

    // 点击登录
    it('用户名校验不通过时，点击登录，返回false', function () {
        wrapper.setData({uesrNameLegal: false});
        expect(wrapper.vm.handleLogin()).toBeFalsy();
    });
    it('密码校验不通过时，点击登录，返回false', function () {
        wrapper.setData({passwordLegal: false});
        expect(wrapper.vm.handleLogin()).toBeFalsy();
    });

    it('用户名和密码校验通过，点击登录，没有返回值，即返回值为undefined', function () {
        wrapper.setData({uesrNameLegal: true, passwordLegal: true});
        expect(wrapper.vm.handleLogin()).toBe(undefined);

    });

    // 点击注册
    it('点击注册，弹窗 ', function () {
        wrapper.find('.regist-btn').trigger('click');
        expect(wrapper.vm.registInfoVisible).toBeTruthy();
    });
    it('注册弹窗中的注册按钮', function () {
        let obj = {username: '1234567', passwd: '123456'};
        wrapper.vm.$emit('registInfoConfirm');
        expect(wrapper.emitted().registInfoConfirm).toBeTruthy();// 事件已经被触发
    });
    it('关闭注册', function () {
        wrapper.vm.registInfoCancel();
        expect(wrapper.vm.registInfoVisible).toBeFalsy();
    });

    // 用户组
    it('用户名组有，显示第一个用户名 ', function () {
        let arr = [
            {name: 'username1'},
            {name: 'username2'}
        ];
        wrapper.setData({users: arr});
        wrapper.vm.selectUser(arr[0]);
        expect(wrapper.vm.loginForm.username).toBe('username1');
        expect(wrapper.findAll('.login-user-item').length).toBe(2);
    });
    it('用户组,点击显示，点击隐藏', function () {
        let arr = [
            {name: 'username1'},
            {name: 'username2'}
        ];
        wrapper.setData({users: arr});
        expect(wrapper.vm.showDropDown).toBeFalsy();
        wrapper.find('.login-dropdown-btn').trigger('click');
        expect(wrapper.vm.showDropDown).toBeTruthy();
        wrapper.find('.login-dropdown-btn').trigger('click');
        expect(wrapper.vm.showDropDown).toBeFalsy();
    });
});
